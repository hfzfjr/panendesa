-- Migration: Refresh Tokens
-- Purpose: Store refresh tokens for persistent login sessions
-- This allows users to stay logged in without re-entering credentials

-- ============================================
-- STEP 1: Create refresh_tokens table
-- ============================================

CREATE TABLE IF NOT EXISTS refresh_tokens (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  revoked_at TIMESTAMP WITH TIME ZONE
);

-- ============================================
-- STEP 2: Create indexes for performance
-- ============================================

-- Index on user_id for fast lookup of all tokens for a user
CREATE INDEX IF NOT EXISTS idx_refresh_tokens_user_id ON refresh_tokens(user_id);

-- Index on token_hash for fast token validation
CREATE INDEX IF NOT EXISTS idx_refresh_tokens_token_hash ON refresh_tokens(token_hash);

-- Index on expires_at for cleanup queries
CREATE INDEX IF NOT EXISTS idx_refresh_tokens_expires_at ON refresh_tokens(expires_at);

-- ============================================
-- STEP 3: Add comments for documentation
-- ============================================

COMMENT ON TABLE refresh_tokens IS 'Stores refresh tokens for persistent login sessions. Tokens are hashed before storage for security.';
COMMENT ON COLUMN refresh_tokens.token_hash IS 'SHA-256 hash of the refresh token. Never store plain text tokens.';
COMMENT ON COLUMN refresh_tokens.expires_at IS 'Token expiration time (typically 30 days from creation).';
COMMENT ON COLUMN refresh_tokens.revoked_at IS 'Set when user logs out or token is revoked. Revoked tokens cannot be used even if not expired.';

-- ============================================
-- STEP 4: Housekeeping queries
-- ============================================

-- Delete expired refresh tokens (run periodically to keep table size manageable)
-- This query deletes tokens that expired more than 7 days ago
-- Run this query weekly or monthly via cron job or manual execution

-- DELETE FROM refresh_tokens 
-- WHERE expires_at < NOW() - INTERVAL '7 days';

-- Alternative: Delete all expired tokens regardless of age
-- DELETE FROM refresh_tokens 
-- WHERE expires_at < NOW();

-- Count expired tokens (for monitoring)
-- SELECT COUNT(*) as expired_count 
-- FROM refresh_tokens 
-- WHERE expires_at < NOW();

-- Count revoked tokens (for monitoring)
-- SELECT COUNT(*) as revoked_count 
-- FROM refresh_tokens 
-- WHERE revoked_at IS NOT NULL;

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check if table was created successfully
-- SELECT table_name, column_name, data_type, is_nullable 
-- FROM information_schema.columns 
-- WHERE table_name = 'refresh_tokens' 
-- ORDER BY ordinal_position;

-- Check if indexes were created successfully
-- SELECT indexname, indexdef 
-- FROM pg_indexes 
-- WHERE tablename = 'refresh_tokens';
