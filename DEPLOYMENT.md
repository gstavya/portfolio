# Deployment Guide

This is a static website that can be deployed to various hosting platforms. Here are the easiest options:

## Option 1: GitHub Pages (Recommended - Free)

### Steps:
1. **Push your code to GitHub** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/portfolio_cool.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under **Source**, select **Deploy from a branch**
   - Choose **main** branch and **/ (root)** folder
   - Click **Save**

3. **Your site will be live at**: `https://YOUR_USERNAME.github.io/portfolio_cool/`

## Option 2: Netlify (Free - Very Easy)

### Method A: Drag & Drop
1. Go to [netlify.com](https://www.netlify.com)
2. Sign up/login (free)
3. Drag and drop your entire `portfolio_cool` folder onto the Netlify dashboard
4. Your site is live instantly!

### Method B: Git Integration
1. Push your code to GitHub (see Option 1, Step 1)
2. Go to [netlify.com](https://www.netlify.com) and sign in
3. Click **Add new site** → **Import an existing project**
4. Connect your GitHub account and select the repository
5. Deploy settings:
   - Build command: (leave empty)
   - Publish directory: `.` (root)
6. Click **Deploy site**

Your site will be live at: `https://random-name.netlify.app` (or set a custom domain)

## Option 3: Vercel (Free)

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. In your project directory, run:
   ```bash
   vercel
   ```

3. Follow the prompts (press Enter to accept defaults)

4. Your site will be live at: `https://portfolio-cool.vercel.app`

## Option 4: Cloudflare Pages (Free)

1. Push your code to GitHub (see Option 1, Step 1)
2. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
3. Sign in and click **Create a project**
4. Connect your GitHub account and select your repository
5. Build settings:
   - Framework preset: None
   - Build command: (leave empty)
   - Build output directory: `.` (root)
6. Click **Save and Deploy**

## Using a Custom Domain (e.g., stavya.com)

### ⚠️ Important: You MUST Own the Domain

**You cannot use a domain without purchasing it first.** Here's why:

- **Domain ownership = DNS control**: Only the domain owner can point it to your website
- **You need access to DNS settings**: Without owning the domain, you can't add the required DNS records
- **Someone else might own it**: If `stavya.com` is already registered, you'd need to buy it from them (often expensive) or choose a different name

**To check if stavya.com is available:**
- Visit [whois.net](https://www.whois.net) and search for `stavya.com`
- Or check domain registrars like Namecheap, GoDaddy - they'll tell you if it's available

**If it's already taken:**
- Option 1: Use a variation like `stavya-gaonkar.com`, `stavya.dev`, or `stavya.io`
- Option 2: Contact the owner to purchase it (can be very expensive)
- Option 3: Wait for it to expire and try to register it (risky, someone else might grab it)

All platforms support custom domains with free SSL certificates. Here's how:

### Step 1: Purchase/Register Your Domain (REQUIRED)

If you don't own `stavya.com` yet, register it at:
- **Namecheap** (recommended, ~$10-15/year)
- **Google Domains** (~$12/year)
- **Cloudflare Registrar** (~$8-10/year, cheapest option)
- **GoDaddy** (~$12-15/year)

### Step 2: Configure Your Domain

#### Option A: GitHub Pages
1. Go to your repository → **Settings** → **Pages**
2. Under **Custom domain**, enter: `stavya.com`
3. Check **Enforce HTTPS** (GitHub will automatically set up SSL)
4. GitHub will show you DNS records to add:
   - **A records** pointing to GitHub Pages IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - **OR** use a **CNAME record**:
     - Name: `@` or `www`
     - Value: `YOUR_USERNAME.github.io`

#### Option B: Netlify
1. After deploying, go to **Site settings** → **Domain management**
2. Click **Add custom domain** → Enter `stavya.com`
3. Netlify will show you DNS records:
   - **A record**: Point to Netlify's IP (shown in dashboard)
   - **OR** use **CNAME**: Point to your Netlify site URL
4. Netlify automatically provisions SSL certificate (takes a few minutes)

#### Option C: Vercel
1. In your project dashboard, go to **Settings** → **Domains**
2. Add `stavya.com`
3. Follow the DNS configuration instructions:
   - Usually an **A record** or **CNAME** to Vercel's servers
4. SSL is automatically configured

### Step 3: Update DNS Records

Go to your domain registrar's DNS settings and add the records provided by your hosting platform:

**For stavya.com (root domain):**
- Type: `A` record
- Name: `@` (or blank/root)
- Value: (IP addresses from your hosting platform)
- TTL: `3600` (or default)

**For www.stavya.com:**
- Type: `CNAME` record
- Name: `www`
- Value: (your hosting platform's URL)
- TTL: `3600`

### Step 4: Wait for Propagation

DNS changes can take anywhere from a few minutes to 48 hours, though usually it's within 1-2 hours.

### Verify It's Working

Check if your domain is pointing correctly:
```bash
# Check DNS records
nslookup stavya.com
```

Or use online tools:
- [whatsmydns.net](https://www.whatsmydns.net)
- [dnschecker.org](https://dnschecker.org)

### Recommended Setup

For `stavya.com`:
- **Hosting**: GitHub Pages, Netlify, or Vercel (all free)
- **Domain**: Purchase from Cloudflare Registrar (~$8-10/year) or Namecheap
- **SSL**: Automatically provided by hosting platform (free)

Your site will be live at: `https://stavya.com` ✨

## Important Notes:

- **Large video files**: Some platforms may have file size limits:
  - GitHub Pages: 100MB per file limit
  - Netlify: 100MB per file limit
  - Vercel: 100MB per file limit
  
  If your videos are too large, consider:
  - Compressing them
  - Hosting videos on YouTube/Vimeo and embedding them
  - Using a CDN service

- **Custom Domain**: All platforms allow you to add a custom domain for free with automatic SSL

- **HTTPS**: All platforms provide free SSL certificates automatically

## Testing Locally Before Deployment:

You can test your site locally using Python's built-in server:
```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then visit: `http://localhost:8000`

## Recommended: GitHub Pages

Since you already have a GitHub account, GitHub Pages is the simplest option. Your portfolio will be available at a URL like:
`https://gstavya.github.io/portfolio_cool/`
