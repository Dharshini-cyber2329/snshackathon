# 🚀 DT-SCD Hackathon 2026 - Deployment Guide

This guide will help you deploy your hackathon website to various hosting platforms.

---

## 📋 Table of Contents
1. [Quick Start - GitHub Pages (FREE)](#1-github-pages-free)
2. [Netlify (FREE)](#2-netlify-free)
3. [Vercel (FREE)](#3-vercel-free)
4. [Traditional Web Hosting](#4-traditional-web-hosting)
5. [Custom Domain Setup](#5-custom-domain-setup)

---

## 1. GitHub Pages (FREE) ⭐ Recommended

### Prerequisites
- GitHub account (free)
- Git installed on your computer

### Steps:

#### Step 1: Create a GitHub Repository
```bash
# Open terminal/command prompt in your project folder
git init
git add .
git commit -m "Initial commit - DT-SCD Hackathon 2026 website"
```

#### Step 2: Push to GitHub
1. Go to [GitHub.com](https://github.com) and create a new repository
2. Name it: `dtscd-hackathon-2026` (or any name you prefer)
3. Don't initialize with README (since you already have files)
4. Copy the repository URL

```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/dtscd-hackathon-2026.git
git branch -M main
git push -u origin main
```

#### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section (left sidebar)
4. Under **Source**, select **main** branch
5. Click **Save**
6. Wait 2-3 minutes

#### Step 4: Access Your Website
Your website will be live at:
```
https://YOUR_USERNAME.github.io/dtscd-hackathon-2026/
```

### ✅ Pros:
- Completely FREE
- Automatic HTTPS
- Easy updates (just push to GitHub)
- Good for student projects

### ❌ Cons:
- URL includes github.io (can add custom domain)
- Limited to static sites

---

## 2. Netlify (FREE) ⭐ Easiest

### Steps:

#### Method A: Drag & Drop (Easiest)
1. Go to [Netlify.com](https://www.netlify.com)
2. Sign up (free account)
3. Click **"Add new site"** → **"Deploy manually"**
4. Drag your entire project folder to the upload area
5. Wait 30 seconds - Done! ✅

#### Method B: Connect to GitHub (Better for updates)
1. Sign up on [Netlify.com](https://www.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub**
4. Select your repository
5. Click **Deploy site**

Your website will be live at:
```
https://random-name-12345.netlify.app
```

#### Change Your URL:
1. Go to **Site settings**
2. Click **Change site name**
3. Enter: `dtscd-hackathon-2026`
4. New URL: `https://dtscd-hackathon-2026.netlify.app`

### ✅ Pros:
- Super easy drag & drop
- FREE custom domain support
- Automatic HTTPS
- Instant deployments
- Great performance

### ❌ Cons:
- None for this use case!

---

## 3. Vercel (FREE)

### Steps:

1. Go to [Vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click **"Add New Project"**
4. Import your GitHub repository
5. Click **Deploy**

Your website will be live at:
```
https://dtscd-hackathon-2026.vercel.app
```

### ✅ Pros:
- Very fast
- Automatic deployments
- Great for React/Next.js (future upgrades)
- FREE custom domain

### ❌ Cons:
- Slightly more complex than Netlify

---

## 4. Traditional Web Hosting

If you have a hosting account (like Hostinger, Bluehost, GoDaddy):

### Steps:

1. **Connect via FTP/File Manager**
   - Use FileZilla or cPanel File Manager
   - Login credentials from your hosting provider

2. **Upload Files**
   - Upload all files to `public_html` or `www` folder:
     - `index.html`
     - `styles.css`
     - `script.js`
     - Any other files

3. **Access Your Website**
   ```
   https://yourdomain.com
   ```

### ✅ Pros:
- Full control
- Can use your own domain
- Can add backend later

### ❌ Cons:
- Costs money (₹100-500/month)
- Need to manage hosting

---

## 5. Custom Domain Setup

### For GitHub Pages:

1. Buy a domain (GoDaddy, Namecheap, etc.)
2. In your repository, create a file named `CNAME`
3. Add your domain: `hackathon.yourdomain.com`
4. In your domain registrar, add DNS records:
   ```
   Type: CNAME
   Name: hackathon
   Value: YOUR_USERNAME.github.io
   ```

### For Netlify/Vercel:

1. Go to **Domain settings**
2. Click **Add custom domain**
3. Enter your domain
4. Follow the DNS instructions provided
5. Wait 24-48 hours for DNS propagation

---

## 🔄 How to Update Your Website

### GitHub Pages:
```bash
# Make your changes to files
git add .
git commit -m "Updated content"
git push
# Wait 2-3 minutes for changes to appear
```

### Netlify (Drag & Drop):
1. Make changes to your files
2. Drag the folder again to Netlify
3. Instant update! ✅

### Netlify (GitHub):
```bash
# Make your changes
git add .
git commit -m "Updated content"
git push
# Automatic deployment in 30 seconds!
```

---

## 📱 Mobile Optimization

Your website is now fully mobile-responsive! It will automatically adjust for:
- 📱 Mobile phones (320px - 480px)
- 📱 Tablets (481px - 768px)
- 💻 Laptops (769px - 1024px)
- 🖥️ Desktops (1025px+)

---

## 🆘 Troubleshooting

### Website not loading?
- Wait 5-10 minutes after deployment
- Clear browser cache (Ctrl + Shift + R)
- Check if files uploaded correctly

### Styles not working?
- Make sure `styles.css` is in the same folder as `index.html`
- Check browser console for errors (F12)

### Robot not appearing?
- Robot only shows on desktop/laptop (hidden on mobile)
- Check if JavaScript is enabled

---

## 📞 Need Help?

Contact the organizing committee:
- Dr. N. Shanmuga Priya: 9894645045
- Dr. K. Sumathi: 9894938120
- Dr. M. Praveena: 9865554616

---

## 🎉 Recommended: Netlify (Easiest & Free)

For this hackathon website, we recommend **Netlify** because:
1. ✅ Completely FREE
2. ✅ Drag & drop deployment (30 seconds)
3. ✅ Automatic HTTPS
4. ✅ Custom domain support
5. ✅ Perfect for student projects

**Quick Start:**
1. Go to netlify.com
2. Drag your folder
3. Done! Share your link! 🚀

---

**Good luck with your hackathon! 🎊**
