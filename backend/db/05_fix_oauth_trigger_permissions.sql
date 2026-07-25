-- Fix OAuth Trigger Permissions and Search Path
-- 
-- Root Cause: The trigger function sync_auth_user_to_custom_users() runs under the
-- supabase_auth_admin role when triggered by auth.users INSERT. This role cannot resolve
-- the "users" table reference to public.users without explicit schema qualifier, and lacks
-- direct permissions to the public.users table without SECURITY DEFINER.
--
-- Fix: Add SECURITY DEFINER to run with elevated permissions and SET search_path to explicitly
-- include the public schema. Also set function owner to postgres for proper permission handling.
--
-- This migration should be applied after 03_google_oauth_sync.sql to fix permission issues
-- that prevent OAuth users from being synced to the custom users table.

CREATE OR REPLACE FUNCTION sync_auth_user_to_custom_users()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
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
    IF EXISTS (SELECT 1 FROM public.users WHERE auth_id = v_user_id) THEN
        -- User already linked, skip
        RAISE LOG 'OAuth user already linked: email=%, auth_id=%', v_user_email, v_user_id;
        RETURN NEW;
    END IF;
    
    -- Check if user exists by email but not yet linked (auth_id IS NULL)
    -- This handles account linking for existing seed users
    SELECT id INTO v_existing_user_id FROM public.users 
    WHERE auth_id IS NULL AND email = v_user_email;
    
    IF v_existing_user_id IS NOT NULL THEN
        -- Link existing user to auth account
        UPDATE public.users 
        SET auth_id = v_user_id
        WHERE id = v_existing_user_id;
        
        RAISE LOG 'OAuth user linked to existing account: email=%, auth_id=%, user_id=%', 
                 v_user_email, v_user_id, v_existing_user_id;
    ELSE
        -- Insert new user with default role 'pembeli'
        INSERT INTO public.users (
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

-- Set function owner to postgres for proper permission handling
ALTER FUNCTION sync_auth_user_to_custom_users() OWNER TO postgres;
