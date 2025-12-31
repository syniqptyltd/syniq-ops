# Security Guidelines

## API Key Management

### Environment Variables
All sensitive API keys and secrets are stored in `.env.local` and **NEVER** committed to version control.

### Protected Secrets

#### Server-Side Only (Never expose to client)
- `PAYSTACK_SECRET_KEY` - Paystack secret key (charges real money!)
- `PAYSTACK_WEBHOOK_SECRET` - Paystack webhook verification
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase admin access
- `RESEND_API_KEY` - Resend email API key

#### Client-Side Safe (Prefixed with NEXT_PUBLIC_)
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key (safe for browser)
- `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` - Paystack public key (safe for browser)
- `NEXT_PUBLIC_SITE_URL` - Site URL

### File Security

#### Protected Files (in .gitignore)
- `.env.local` - Your actual secrets (NEVER commit this)
- `.env*.local` - Any local environment files
- `.next/` - Build output
- `node_modules/` - Dependencies

#### Safe to Commit
- `.env.example` - Template with placeholder values
- `.gitignore` - Ensures secrets aren't committed

### Security Checklist

✅ **Current Status:**
- [x] `.env.local` is in `.gitignore`
- [x] All API keys moved to environment variables
- [x] `.env.example` updated with placeholders
- [x] No hardcoded secrets in source code
- [x] Server-side keys never exposed to client

### Verifying Security

Run these commands to check for exposed secrets:

```bash
# Check if .env.local is in .gitignore
grep -r "\.env" .gitignore

# Search for potential hardcoded API keys (should return no results)
git grep -E "(sk_live|pk_live|re_[A-Za-z0-9]{30})" -- "*.ts" "*.tsx" "*.js" "*.jsx"

# Check git history for accidentally committed env files
git log --all --full-history --source -- '*.env*'
```

### Production Deployment

When deploying to production (Vercel, Netlify, etc.):

1. **Add environment variables in the hosting platform dashboard**
   - Vercel: Project Settings → Environment Variables
   - Netlify: Site Settings → Build & Deploy → Environment

2. **Use different keys for different environments:**
   - Development: Use test keys (sk_test_, pk_test_)
   - Production: Use live keys (sk_live_, pk_live_)

3. **Never commit production keys to git**

### Emergency Response

If you accidentally commit a secret:

1. **Immediately rotate/regenerate the key:**
   - Paystack: https://dashboard.paystack.com/#/settings/developer
   - Supabase: https://supabase.com/dashboard/project/_/settings/api
   - Resend: https://resend.com/api-keys

2. **Remove from git history:**
   ```bash
   # Use BFG Repo-Cleaner or git filter-branch
   # This is complex - consider creating a new repo if needed
   ```

3. **Update `.env.local` with new keys**

4. **Update production environment variables**

### Code Review Guidelines

Before committing code, always verify:

1. No `console.log()` statements with sensitive data
2. No hardcoded API keys or secrets
3. All sensitive operations use environment variables
4. Server-side API routes don't expose secrets in responses
5. Error messages don't leak sensitive information

### Contact Form Security

The contact form API route (`/api/contact`) is secured:
- Runs server-side only (API route)
- Resend API key loaded from `process.env.RESEND_API_KEY`
- No secrets exposed to client
- Validates all input before processing
- Sanitizes user input in email templates

### Database Security

Supabase Row Level Security (RLS) policies should be enabled:
- Anonymous users: Read-only access to public data
- Authenticated users: Access to their own data only
- Service role: Full access (server-side only)

## Best Practices

1. **Never log secrets** - Avoid `console.log()` with API keys
2. **Use environment variables** - Always use `process.env.YOUR_KEY`
3. **Validate on server** - Never trust client-side validation alone
4. **Sanitize inputs** - Prevent XSS and injection attacks
5. **Keep dependencies updated** - Run `npm audit` regularly
6. **Review pull requests** - Check for accidentally committed secrets

## Additional Resources

- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Vercel Security Best Practices](https://vercel.com/docs/security/best-practices)
