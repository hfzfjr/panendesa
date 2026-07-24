-- Google OAuth Sync Migration
-- This migration adds support for Google OAuth authentication via Supabase Auth
-- It syncs auth.users to the custom users table with default role 'pembeli'

-- ============================================
-- STEP 1: Add columns for OAuth support
-- ============================================

-- Add auth_id column to map to Supabase Auth UUID
ALTER TABLE users ADD COLUMN IF NOT EXISTS auth_id UUID UNIQUE;

-- Add profile_completed column to track if user has completed their profile
ALTER TABLE users ADD COLUMN IF NOT EXISTS profile_completed BOOLEAN DEFAULT false;

-- Make password_hash nullable for OAuth users (they don't have passwords)
ALTER TABLE users ALTER COLUMN password_hash DROP NOT NULL;

-- ============================================
-- STEP 2: Create trigger function for auth.users sync
-- ============================================

CREATE OR REPLACE FUNCTION sync_auth_user_to_custom_users()
RETURNS TRIGGER AS $$
DECLARE
    v_user_email TEXT;
    v_user_name TEXT;
    v_user_id UUID;
    v_existing_user_id INTEGER;
BEGIN
    -- Extract email and name from auth.users
    v_user_email := NEW.email;
    v_user_id := NEW.id;
    
    -- Try to get name from raw_user_meta_data (Google OAuth sends 'full_name' or 'name')
    v_user_name := COALESCE(
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'name',
        -- Fallback to part before @ in email if name is not available
        SPLIT_PART(v_user_email, '@', 1)
    );
    
    -- Check if user already exists in custom users table by auth_id
    IF EXISTS (SELECT 1 FROM users WHERE auth_id = v_user_id) THEN
        -- User already linked, skip
        RAISE LOG 'OAuth user already linked: email=%, auth_id=%', v_user_email, v_user_id;
        RETURN NEW;
    END IF;
    
    -- Check if user exists by email but not yet linked (auth_id IS NULL)
    -- This handles account linking for existing seed users
    SELECT id INTO v_existing_user_id FROM users 
    WHERE auth_id IS NULL AND email = v_user_email;
    
    IF v_existing_user_id IS NOT NULL THEN
        -- Link existing user to auth account
        UPDATE users 
        SET auth_id = v_user_id
        WHERE id = v_existing_user_id;
        
        RAISE LOG 'OAuth user linked to existing account: email=%, auth_id=%, user_id=%', 
                 v_user_email, v_user_id, v_existing_user_id;
    ELSE
        -- Insert new user with default role 'pembeli'
        INSERT INTO users (
            auth_id,
            email,
            nama,
            role,
            desa_id,
            password_hash,
            profile_completed,
            skor_konsistensi,
            created_at
        ) VALUES (
            v_user_id,
            v_user_email,
            v_user_name,
            'pembeli',  -- HARDCODED: OAuth users always start as 'pembeli'
            NULL,       -- desa_id is NULL for new OAuth users
            NULL,       -- password_hash is NULL for OAuth users
            false,      -- profile_completed starts as false
            100.00,     -- default skor_konsistensi
            NEW.created_at
        );
        
        RAISE LOG 'OAuth user synced to custom users table: email=%, auth_id=%', v_user_email, v_user_id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- STEP 3: Create trigger on auth.users
-- ============================================

-- Drop trigger if exists to avoid errors during re-run
DROP TRIGGER IF EXISTS trg_sync_auth_user ON auth.users;

-- Create trigger that fires AFTER INSERT on auth.users
CREATE TRIGGER trg_sync_auth_user
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION sync_auth_user_to_custom_users();

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check if columns were added successfully
-- SELECT column_name, data_type, is_nullable 
-- FROM information_schema.columns 
-- WHERE table_name = 'users' 
-- AND column_name IN ('auth_id', 'profile_completed', 'password_hash');

-- Check if trigger was created successfully
-- SELECT trigger_name, event_manipulation, event_object_table 
-- FROM information_schema.triggers 
-- WHERE trigger_name = 'trg_sync_auth_user';
