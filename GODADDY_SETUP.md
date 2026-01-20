# Setting Up sgaonkar.com with GoDaddy

You've purchased `sgaonkar.com` through GoDaddy. Here's how to connect it to your portfolio:

## Step 1: Deploy Your Site First

Before connecting the domain, deploy your site to a hosting platform. Choose one:

### Option A: GitHub Pages (Recommended)

1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/gstavya/portfolio_cool.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under **Source**, select **Deploy from a branch**
   - Choose **main** branch and **/ (root)** folder
   - Click **Save**
   - Your site will be at: `https://gstavya.github.io/portfolio_cool/`

### Option B: Netlify (Easier, no Git needed)

1. Go to [netlify.com](https://www.netlify.com) and sign up/login
2. Drag and drop your entire `portfolio_cool` folder onto the Netlify dashboard
3. Your site will be at: `https://random-name.netlify.app`

### Option C: Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in your project directory
3. Follow the prompts

---

## Step 2: Connect Your Domain (GoDaddy → Hosting Platform)

### If Using GitHub Pages:

1. **In GitHub**:
   - Go to your repo → **Settings** → **Pages**
   - Under **Custom domain**, enter: `sgaonkar.com`
   - Check **Enforce HTTPS**
   - Click **Save**

2. **In GoDaddy** (DNS Management):
   - Log into [GoDaddy.com](https://www.godaddy.com)
   - Go to **My Products** → Click **DNS** next to `sgaonkar.com`
   - You'll see DNS records. **Delete or edit existing A records** if any
   - Add these **A records** (click **Add**):
     ```
     Type: A
     Name: @
     Value: 185.199.108.153
     TTL: 600
     ```
     Repeat for these IPs (add 4 separate A records):
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   
   - Add a **CNAME record** for www:
     ```
     Type: CNAME
     Name: www
     Value: gstavya.github.io
     TTL: 600
     ```

3. **Wait 1-2 hours** for DNS to propagate

### If Using Netlify:

1. **In Netlify**:
   - Go to your site → **Site settings** → **Domain management**
   - Click **Add custom domain**
   - Enter: `sgaonkar.com`
   - Netlify will show you DNS instructions

2. **In GoDaddy**:
   - Go to **My Products** → **DNS** for `sgaonkar.com`
   - Netlify will give you either:
     - An **A record** with an IP address, OR
     - A **CNAME** pointing to your Netlify site
   - Add the record(s) as shown in Netlify's instructions

3. **Wait 1-2 hours** for DNS to propagate

### If Using Vercel:

1. **In Vercel**:
   - Go to your project → **Settings** → **Domains**
   - Add `sgaonkar.com`
   - Vercel will show DNS configuration

2. **In GoDaddy**:
   - Go to **My Products** → **DNS** for `sgaonkar.com`
   - Add the DNS records Vercel provides (usually a CNAME)

3. **Wait 1-2 hours** for DNS to propagate

---

## Step 3: Verify It's Working

After 1-2 hours, check:

1. Visit `https://sgaonkar.com` - your site should load!
2. Check DNS propagation: [whatsmydns.net](https://www.whatsmydns.net/#A/sgaonkar.com)
3. Make sure HTTPS is working (the lock icon in your browser)

---

## Troubleshooting

**Domain not working after 2 hours?**
- Double-check DNS records in GoDaddy match exactly what your hosting platform requires
- Make sure you removed any conflicting records
- Try clearing your browser cache
- Check [whatsmydns.net](https://www.whatsmydns.net) to see if DNS has propagated globally

**SSL/HTTPS not working?**
- GitHub Pages/Netlify/Vercel automatically provide SSL, but it can take a few hours after DNS propagates
- Make sure "Enforce HTTPS" is enabled in your hosting platform settings

**Need help?**
- GoDaddy support: They can help with DNS configuration
- Your hosting platform's docs usually have GoDaddy-specific instructions

---

## Quick Reference: GoDaddy DNS Settings Location

1. Log into GoDaddy
2. Click **My Products**
3. Find `sgaonkar.com` and click **DNS** button
4. Scroll to **Records** section
5. Add/edit records here

Your portfolio will be live at **https://sgaonkar.com** once DNS propagates! 🎉
