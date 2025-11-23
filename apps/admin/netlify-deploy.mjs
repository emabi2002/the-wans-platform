import { readFileSync } from 'fs';
import https from 'https';

const NETLIFY_API = 'api.netlify.com';
const zipPath = '/home/project/the-wans/apps/admin/deploy.zip';

// Try to get auth token from environment
const authToken = process.env.NETLIFY_AUTH_TOKEN;

async function createSiteAndDeploy() {
  if (!authToken) {
    console.error('\n❌ NETLIFY_AUTH_TOKEN not found in environment');
    console.error('\nTo deploy to Netlify, you need a personal access token.');
    console.error('\nSteps to deploy:');
    console.error('1. Go to: https://app.netlify.com/user/applications#personal-access-tokens');
    console.error('2. Create a new personal access token');
    console.error('3. Set it in your environment:');
    console.error('   export NETLIFY_AUTH_TOKEN=your_token_here');
    console.error('4. Run this script again\n');
    console.error('OR deploy manually:');
    console.error('1. Go to: https://app.netlify.com/drop');
    console.error('2. Drag and drop the folder: /home/project/the-wans/apps/admin/out');
    console.error('3. Your site will be deployed!\n');
    process.exit(1);
  }

  console.log('🚀 Deploying to Netlify...\n');

  try {
    // First, create a new site
    const siteData = JSON.stringify({
      name: `the-wans-admin-${Date.now()}`
    });

    const siteOptions = {
      hostname: NETLIFY_API,
      path: '/api/v1/sites',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
        'Content-Length': siteData.length
      }
    };

    const siteId = await new Promise((resolve, reject) => {
      const req = https.request(siteOptions, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
          if (res.statusCode === 201) {
            const site = JSON.parse(data);
            console.log('✅ Site created:', site.name);
            console.log('📝 Site ID:', site.id);
            resolve(site.id);
          } else {
            reject(new Error(`Failed to create site: ${res.statusCode} - ${data}`));
          }
        });
      });
      req.on('error', reject);
      req.write(siteData);
      req.end();
    });

    // Now deploy the zip file
    const zipFile = readFileSync(zipPath);

    const deployOptions = {
      hostname: NETLIFY_API,
      path: `/api/v1/sites/${siteId}/deploys`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/zip',
        'Content-Length': zipFile.length
      }
    };

    const deployData = await new Promise((resolve, reject) => {
      const req = https.request(deployOptions, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
          if (res.statusCode === 200 || res.statusCode === 201) {
            const deploy = JSON.parse(data);
            resolve(deploy);
          } else {
            reject(new Error(`Failed to deploy: ${res.statusCode} - ${data}`));
          }
        });
      });
      req.on('error', reject);
      req.write(zipFile);
      req.end();
    });

    console.log('\n✅ Deployment successful!');
    console.log('\n📦 Deploy ID:', deployData.id);
    console.log('🌐 URL:', deployData.url || deployData.deploy_ssl_url || deployData.ssl_url);
    console.log('🔗 Admin URL:', deployData.admin_url);
    
    if (deployData.deploy_ssl_url) {
      console.log('\n🎉 Your admin panel is live at:', deployData.deploy_ssl_url);
    }

  } catch (error) {
    console.error('\n❌ Deployment failed:', error.message);
    process.exit(1);
  }
}

createSiteAndDeploy();
