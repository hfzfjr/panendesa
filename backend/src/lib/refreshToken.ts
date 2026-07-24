import crypto from 'crypto';
import { createHash } from 'crypto';
import { supabase } from './supabase';

// Configuration
export const ACCESS_TOKEN_EXPIRY = '2h'; // 2 hours for access token
export const REFRESH_TOKEN_EXPIRY_DAYS = 30; // 30 days for refresh token
export const REFRESH_TOKEN_LENGTH = 40; // 40 bytes = 80 hex characters

/**
 * Generate a random refresh token
 * @returns Random hex string
 */
export function generateRefreshToken(): string {
  return crypto.randomBytes(REFRESH_TOKEN_LENGTH).toString('hex');
}

/**
 * Hash a refresh token for storage
 * @param token Plain text refresh token
 * @returns SHA-256 hash
 */
export function hashRefreshToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

/**
 * Calculate expiration date for refresh token
 * @returns Date object for 30 days from now
 */
export function calculateRefreshTokenExpiry(): Date {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + REFRESH_TOKEN_EXPIRY_DAYS);
  return expiry;
}

/**
 * Store refresh token in database
 * @param userId User ID
 * @param plainToken Plain text refresh token (will be hashed)
 * @returns Success status
 */
export async function storeRefreshToken(userId: number, plainToken: string): Promise<boolean> {
  const tokenHash = hashRefreshToken(plainToken);
  const expiresAt = calculateRefreshTokenExpiry();

  const { error } = await supabase.from('refresh_tokens').insert({
    user_id: userId,
    token_hash: tokenHash,
    expires_at: expiresAt.toISOString()
  });

  return !error;
}

/**
 * Validate refresh token and return user ID if valid
 * @param plainToken Plain text refresh token
 * @returns User ID if valid, null otherwise
 */
export async function validateRefreshToken(plainToken: string): Promise<number | null> {
  const tokenHash = hashRefreshToken(plainToken);
  const now = new Date();

  const { data, error } = await supabase
    .from('refresh_tokens')
    .select('user_id, expires_at, revoked_at')
    .eq('token_hash', tokenHash)
    .single();

  if (error) {
    return null;
  }

  if (!data) {
    return null;
  }

  // Check if revoked
  if (data.revoked_at) {
    return null;
  }

  // Check expiration manually
  const expiresAt = new Date(data.expires_at);
  if (expiresAt < now) {
    return null;
  }

  return data.user_id;
}

/**
 * Revoke a refresh token
 * @param plainToken Plain text refresh token to revoke
 * @returns Success status
 */
export async function revokeRefreshToken(plainToken: string): Promise<boolean> {
  const tokenHash = hashRefreshToken(plainToken);

  const { error } = await supabase
    .from('refresh_tokens')
    .update({ revoked_at: new Date().toISOString() })
    .eq('token_hash', tokenHash);

  return !error;
}

/**
 * Revoke all refresh tokens for a user (e.g., on password change)
 * @param userId User ID
 * @returns Success status
 */
export async function revokeAllUserTokens(userId: number): Promise<boolean> {
  const { error } = await supabase
    .from('refresh_tokens')
    .update({ revoked_at: new Date().toISOString() })
    .eq('user_id', userId)
    .is('revoked_at', null);

  return !error;
}
