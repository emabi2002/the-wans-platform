#!/bin/bash

# Check if NETLIFY_AUTH_TOKEN is set
if [ -z "$NETLIFY_AUTH_TOKEN" ]; then
  echo "Error: NETLIFY_AUTH_TOKEN environment variable is not set"
  echo "Please set it by running: export NETLIFY_AUTH_TOKEN=your_token_here"
  echo "You can get a token from: https://app.netlify.com/user/applications#personal-access-tokens"
  exit 1
fi

cd /home/project/the-wans/apps/admin

# Deploy using netlify CLI with auth token
/home/same/.bun/bin/netlify deploy \
  --dir=out \
  --prod \
  --create-site=the-wans-admin \
  --no-build \
  --auth="$NETLIFY_AUTH_TOKEN"
