# 💌 Valentine Love Letter — Gửi Thanh Thảo

A romantic digital love letter webapp, designed to be warm, sincere, and emotional.

## ✨ Features

- 🔒 Password-protected entrance
- ✉️ Envelope open animation
- ✍️ Handwriting typewriter effect with blinking cursor
- 🎵 Background music with fade-in & toggle
- 📱 Mobile-friendly & responsive
- ♿ Supports `prefers-reduced-motion`
- 🎨 Wine red, warm cream, soft gold palette

## 🚀 Deploy to GitHub Pages

1. Create a new GitHub repository
2. Upload all files:
   ```
   index.html
   style.css
   app.js
   assets/music.mp3
   README.md
   ```
3. Go to **Settings → Pages**
4. Set Source to **Deploy from a branch** → `main` → `/ (root)`
5. Save — your site will be live at `https://<username>.github.io/<repo>/`

## 🎵 Adding Music

Place your romantic piano instrumental as `assets/music.mp3`.

Recommended: soft piano, lo-fi love, or acoustic instrumental tracks.

## 🔧 Customization

Edit the config variables at the top of `app.js`:

```js
const PASSWORD = "10032023";
const SENDER_NAME = "Ngân Giang";
const RECEIVER_NAME = "Thanh Thảo";
const DAYS_TOGETHER = 1072;
```

## 📁 Project Structure

```
├── index.html      # Main HTML structure
├── style.css       # All styling & animations
├── app.js          # Password, envelope, handwriting, music logic
├── assets/
│   └── music.mp3   # Background music (you provide this)
└── README.md       # This file
```

## 💕 Made with love by Ngân Giang
