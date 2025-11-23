# Deploying THE WANS Admin Panel to Netlify

Your static admin panel is built and ready to deploy! The build is located at:
`/home/project/the-wans/apps/admin/out`

## Option 1: Manual Deployment (Easiest - No Authentication Required)

1. Visit: https://app.netlify.com/drop
2. Drag and drop the entire `out` folder onto the drop zone
3. Your site will be deployed instantly and you'll get a live URL!

## Option 2: Deploy with Netlify CLI (Automated)

### Setup
1. Get a Netlify Personal Access Token:
   - Go to: https://app.netlify.com/user/applications#personal-access-tokens
   - Click "New access token"
   - Give it a name (e.g., "THE WANS Admin Deploy")
   - Copy the token

2. Set the token in your environment:
   ```bash
   export NETLIFY_AUTH_TOKEN=your_token_here
   ```

3. Run the deployment script:
   ```bash
   bun netlify-deploy.mjs
   ```

### Or use the Netlify CLI directly:
```bash
/home/same/.bun/bin/netlify deploy \
  --dir=out \
  --prod \
  --create-site=the-wans-admin \
  --no-build \
  --auth="$NETLIFY_AUTH_TOKEN"
```

## What's Being Deployed

- **Size**: 630KB (compressed)
- **Pages**: 25 static HTML pages including:
  - Dashboard with analytics
  - User management
  - Film management
  - Creator management
  - Finance tracking
  - Activity logs
  - And more...

## Configuration

The deployment is configured via `netlify.toml`:
- Build command: `bun install && cd apps/admin && bun run build`
- Publish directory: `apps/admin/out`
- Security headers included
- Static export (no server-side rendering)

## After Deployment

Once deployed, you can:
1. Configure a custom domain in Netlify
2. Set up continuous deployment from your Git repository
3. Add environment variables if needed
4. Enable Netlify Forms or Functions if required

