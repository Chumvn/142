# 💌 Valentine Love Letter

A romantic digital love letter webapp with beautiful animations and effects.

## ✨ Features

- 🔒 Password-protected entrance
- ✉️ Wax seal envelope animation
- ✍️ Handwriting typewriter effect with blinking cursor
- 🌸 Falling petals & parallax scroll
- 💖 Heart burst finale animation
- 🎵 Background music playlist (auto-advance)
- 🎯 Hidden gestures: 2-tap next song, 3-tap toggle mute
- ✨ Highlighted keywords with color shimmer
- 📱 Mobile-friendly & responsive
- ♿ Supports `prefers-reduced-motion`

## 🚀 Deploy to GitHub Pages

1. Create a new GitHub repository
2. Upload all files:
   ```
   index.html
   style.css
   app.js
   assets/music.mp3
   assets/music2.mp3
   assets/music3.mp3
   README.md
   ```
3. Go to **Settings → Pages**
4. Set Source to **Deploy from a branch** → `main` → `/ (root)`
5. Save — your site will be live at `https://<username>.github.io/<repo>/`

## 🔧 Customization

Edit the config variables at the top of `app.js`:

```js
const PASSWORD = "********";
const SENDER_NAME = "Your Name";
const RECEIVER_NAME = "Their Name";
const DAYS_TOGETHER = 0;
const START_DATE = new Date(2023, 0, 1);
```

## 🎵 Music

Place your music files in `assets/` folder and update the playlist in `app.js`.

## 📁 Project Structure

```
├── index.html      # Main HTML structure
├── style.css       # All styling & animations
├── app.js          # App logic & animations
├── assets/
│   ├── music.mp3
│   ├── music2.mp3
│   └── music3.mp3
└── README.md
```

## 💕 Made with love
