# Security Guidelines for Flourish CV

## 🔒 Environment Variables Security

### ⚠️ IMPORTANT: Never commit sensitive data to version control!

This project uses environment variables to store sensitive configuration data like API keys and database credentials. Follow these security practices:

## 🛡️ Local Development Setup

1. **Copy the example file:**
   ```bash
   cp .env.example .env
   ```

2. **Fill in your actual values:**
   - Get your Supabase credentials from [Supabase Dashboard](https://supabase.com/dashboard)
   - Replace placeholder values in `.env` with your real credentials

3. **Never commit `.env` file:**
   - The `.env` file is already in `.gitignore`
   - Only commit `.env.example` with placeholder values

## 🚀 Production Deployment

### For Netlify:
1. Go to your Netlify site dashboard
2. Navigate to **Site Settings** → **Environment Variables**
3. Add each environment variable:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_SUPABASE_PROJECT_ID`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
   - `VITE_SUPABASE_SERVICE_ROLE_KEY`

### For Other Platforms:
- **Vercel**: Use the Environment Variables section in project settings
- **Railway**: Set environment variables in the Variables tab
- **Heroku**: Use `heroku config:set` or the dashboard

## 🔑 Key Security Practices

### ✅ Safe Practices:
- Use `.env.example` for documentation
- Set environment variables in deployment platform dashboards
- Use different credentials for development/staging/production
- Regularly rotate API keys and secrets

### ❌ Never Do This:
- Commit `.env` files to version control
- Share credentials in chat/email/documents
- Use production credentials in development
- Hardcode secrets directly in source code

## 🚨 If Credentials Are Compromised:

1. **Immediately revoke/regenerate** the compromised keys in Supabase
2. **Update environment variables** in all deployment platforms
3. **Force redeploy** your applications
4. **Review access logs** for any suspicious activity

## 📋 Environment Variables Reference

| Variable | Purpose | Safe to Expose |
|----------|---------|----------------|
| `VITE_SUPABASE_URL` | Supabase project URL | ✅ Yes (public) |
| `VITE_SUPABASE_ANON_KEY` | Public API key | ✅ Yes (public) |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Alternative public key | ✅ Yes (public) |
| `VITE_SUPABASE_PROJECT_ID` | Project identifier | ✅ Yes (public) |
| `VITE_SUPABASE_SERVICE_ROLE_KEY` | Admin privileges | ❌ **NEVER** expose |

## 🔍 Security Checklist

- [ ] `.env` is in `.gitignore`
- [ ] `.env.example` exists with placeholder values
- [ ] Production environment variables are set in deployment platform
- [ ] No hardcoded secrets in source code
- [ ] Different credentials for different environments
- [ ] Regular security audits of dependencies (`npm audit`)

---

**Remember: Security is everyone's responsibility! 🛡️**