# Deployment Guide

This guide covers various deployment options for the Flourish CV application.

## 🚀 Quick Deploy with Lovable

The easiest way to deploy this application:

1. Open [Lovable Project](https://lovable.dev/projects/0a0ec6f7-9608-4cf2-acec-83d6f54f6ead)
2. Click on **Share** → **Publish**
3. Your application will be live instantly

### Custom Domain with Lovable

1. Navigate to **Project** → **Settings** → **Domains**
2. Click **Connect Domain**
3. Follow the DNS configuration instructions
4. [Read more about custom domains](https://docs.lovable.dev/features/custom-domain#custom-domain)

## 🏗️ Manual Deployment Options

### Vercel (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Configure Environment Variables** (if using Supabase):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

### Netlify

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy via Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=dist
   ```

3. **Or drag and drop** the `dist` folder to [Netlify Drop](https://app.netlify.com/drop)

### GitHub Pages

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json**:
   ```json
   {
     "scripts": {
       "deploy": "gh-pages -d dist"
     },
     "homepage": "https://yourusername.github.io/repository-name"
   }
   ```

3. **Deploy**:
   ```bash
   npm run build
   npm run deploy
   ```

### Docker Deployment

1. **Create Dockerfile**:
   ```dockerfile
   FROM node:18-alpine as build
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   RUN npm run build

   FROM nginx:alpine
   COPY --from=build /app/dist /usr/share/nginx/html
   COPY nginx.conf /etc/nginx/nginx.conf
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. **Create nginx.conf**:
   ```nginx
   events {
     worker_connections 1024;
   }
   
   http {
     include /etc/nginx/mime.types;
     default_type application/octet-stream;
     
     server {
       listen 80;
       server_name localhost;
       root /usr/share/nginx/html;
       index index.html;
       
       location / {
         try_files $uri $uri/ /index.html;
       }
     }
   }
   ```

3. **Build and run**:
   ```bash
   docker build -t flourish-cv .
   docker run -p 80:80 flourish-cv
   ```

## 🔧 Environment Configuration

### Required Environment Variables

For production deployments with authentication:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Build Optimization

The application is pre-configured with:

- **Code Splitting**: Automatic chunking for optimal loading
- **Tree Shaking**: Unused code elimination
- **Asset Optimization**: Image and CSS optimization
- **Browser Compatibility**: ES2015+ with polyfills for older browsers

### Performance Considerations

- **Bundle Size**: ~500KB gzipped (excluding PDF libraries)
- **First Load**: ~2-3 seconds on 3G
- **Lighthouse Score**: 95+ for Performance, Accessibility, Best Practices, SEO

## 🔍 Pre-deployment Checklist

- [ ] Run `npm run build` successfully
- [ ] Test in multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Verify accessibility with screen readers
- [ ] Check color contrast validation
- [ ] Test PDF export functionality
- [ ] Validate responsive design on mobile devices
- [ ] Configure environment variables
- [ ] Set up error monitoring (optional)
- [ ] Configure analytics (optional)

## 🐛 Troubleshooting

### Common Issues

**Build Fails**:
- Check Node.js version (16+ required)
- Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`

**PDF Export Not Working**:
- Ensure html2canvas and jsPDF are properly loaded
- Check for CORS issues with fonts/images

**Accessibility Issues**:
- Run the built-in browser compatibility test
- Use axe-core browser extension for validation

**Performance Issues**:
- Enable gzip compression on your server
- Configure proper caching headers
- Use a CDN for static assets

## 📊 Monitoring

### Recommended Tools

- **Error Tracking**: Sentry, Bugsnag
- **Analytics**: Google Analytics, Plausible
- **Performance**: Web Vitals, Lighthouse CI
- **Uptime**: Pingdom, UptimeRobot

### Health Check Endpoint

The application serves a health check at `/health` (when configured) that returns:

```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00Z",
  "version": "1.0.0"
}
```

## 🔒 Security Considerations

- All user data is processed client-side
- No sensitive information is logged
- HTTPS is enforced in production
- Content Security Policy headers recommended
- Regular dependency updates via Dependabot

## 📞 Support

For deployment issues:
1. Check the [troubleshooting section](#troubleshooting)
2. Review browser console for errors
3. Test with the browser compatibility script
4. Contact support with detailed error logs