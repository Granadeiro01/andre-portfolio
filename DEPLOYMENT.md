# Deployment Guide

## Vercel Deployment

### Prerequisites
1. GitHub account (already set up)
2. Vercel account (free at vercel.com)
3. Groq API key (free at console.groq.com)

### Steps to Deploy

1. **Connect to Vercel**
   - Go to https://vercel.com
   - Sign in with GitHub
   - Click "New Project"
   - Select `andre-portfolio` repository
   - Click "Import"

2. **Configure Environment Variables**
   - In the "Environment Variables" section, add:
     - Name: `GROQ_API_KEY`
     - Value: Your API key from https://console.groq.com
   - Click "Add"

3. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy automatically
   - Your site will be live at `andre-portfolio-[username].vercel.app`

4. **Optional: Custom Domain**
   - Go to Vercel dashboard
   - Select "andre-portfolio"
   - Go to "Settings" → "Domains"
   - Add your custom domain

### Environment Variables

The following environment variable is required:
- `GROQ_API_KEY` - Your Groq API key for the AI chat agent

Without this variable, the chat agent will be disabled but the portfolio will still work.

### Troubleshooting

**Build fails on Vercel:**
- Make sure `GROQ_API_KEY` is set in Environment Variables
- Check that you're using Node.js 18+ (Vercel default is fine)
- Look at the build logs in Vercel dashboard

**Chat agent not working:**
- Verify `GROQ_API_KEY` is correctly set
- Check browser console for errors
- Ensure your Groq API key is valid and has quota remaining
