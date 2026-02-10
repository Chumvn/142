/* ═══════════════════════════════════════════════════════
   VALENTINE LOVE LETTER — APP LOGIC (Enhanced Edition)
   8 Effects: Petals, Parallax, Live Counter, Ink Splash,
   Wax Seal, Heart Burst, Vignette Glow, 3D Tilt
   ═══════════════════════════════════════════════════════ */

// ── Config ──────────────────────────────────────────
const PASSWORD = "10032023";
const SENDER_NAME = "Ngân Giang";
const RECEIVER_NAME = "Thanh Thảo";
const DAYS_TOGETHER = 1072;
const START_DATE = new Date(2023, 2, 10); // March 10, 2023

// ── Letter Content ──────────────────────────────────
const daysSince = DAYS_TOGETHER;
const LETTER_TITLE = `Gửi ${RECEIVER_NAME} — người mà anh yêu nhất ❤️`;
const LETTER_PARAGRAPHS = [
  `Em biết không, hôm nay anh ngồi lại, đếm từng ngày mình đã đi bên nhau — ${daysSince.toLocaleString()} ngày. Nghe thì dài, nhưng sao anh cảm giác như mới hôm qua thôi, lần đầu anh nắm tay em, tim đập nhanh đến mức quên cả thở.`,
  `Anh không giỏi nói lời hoa mỹ, em biết mà. Nhưng có những điều anh giữ trong lòng rất lâu rồi, hôm nay anh muốn viết ra — bằng cả trái tim mình.`,
  `Cảm ơn em vì mỗi buổi sáng em mở mắt là anh thấy cả thế giới bình yên. Cảm ơn vì những bữa cơm em nấu, dù đơn giản nhưng với anh, đó là mùi vị của hạnh phúc. Cảm ơn vì những đêm em lặng lẽ đắp chăn cho anh khi anh ngủ quên trước tivi.`,
  `Em hay hỏi anh: "Anh có yêu em không?" — câu hỏi nghe đơn giản nhưng mỗi lần nghe, lòng anh lại nhói lên. Không phải vì anh không yêu, mà vì anh sợ — sợ rằng anh chưa đủ giỏi để em thấy được tình yêu ấy trong từng hành động hàng ngày.`,
  `Anh yêu em, Thảo. Yêu theo cách mà nước mắt sẽ rơi nếu một ngày anh không còn được nghe tiếng em gọi tên. Yêu theo cách mà dù cả thế giới quay lưng, anh vẫn sẽ đứng đó — chờ em, giữ em, bảo vệ em.`,
  `Có đôi khi mình cãi nhau, anh biết. Có đôi khi anh làm em buồn, em làm anh thất vọng. Nhưng em ơi, chính những lúc ấy anh lại càng biết rõ hơn: anh không thể thiếu em. Bởi vì người khiến mình đau nhất, cũng chính là người mình yêu nhất.`,
  `Anh nhớ ngày mình về chung một nhà — 10 tháng 3, 2023. Ngày mà anh hứa với lòng mình: "Từ giờ trở đi, mình sẽ không để em phải cô đơn." Và hôm nay, ${daysSince.toLocaleString()} ngày sau, anh vẫn giữ lời hứa đó.`,
  `Nếu cuộc đời này cho anh được chọn lại, anh vẫn chọn em — thêm một nghìn lần nữa. Không phải vì em hoàn hảo, mà vì em là "nhà" của anh. Em là nơi anh muốn trở về sau những ngày mệt mỏi, là người anh muốn nhìn thấy đầu tiên khi mở mắt, và là người cuối cùng anh muốn nói "chúc em ngủ ngon" mỗi đêm.`,
  `Thảo ơi, anh không biết tương lai sẽ ra sao. Nhưng anh biết chắc một điều — dù mai sau thế nào, dù khó khăn mấy, anh vẫn sẽ ở đây, ngay bên em. Bởi vì anh đã tìm thấy cả vũ trụ trong đôi mắt em rồi, anh không cần tìm thêm ở đâu nữa.`
];
const LETTER_CLOSING = `Yêu em nhiều lắm, mãi mãi và mãi mãi.`;
const LETTER_SIGNATURE = SENDER_NAME;
const LETTER_PS = `P/S: ${daysSince.toLocaleString()} ngày đã qua, nhưng đó chỉ là chương đầu tiên thôi. Phần đẹp nhất, mình sẽ cùng nhau viết tiếp — từng ngày, từng ngày một. 🌹`;

// ── DOM Elements ────────────────────────────────────
const $ = (id) => document.getElementById(id);
const passwordScreen = $('password-screen');
const envelopeScene = $('envelope-scene');
const letterScene = $('letter-scene');
const passwordForm = $('password-form');
const passwordInput = $('password-input');
const errorMsg = $('error-msg');
const envelope = $('envelope');
const waxSeal = $('wax-seal');
const letterTitle = $('letter-title');
const letterBody = $('letter-body');
const letterSig = $('letter-signature');
const letterPs = $('letter-ps');
const soundToggle = $('sound-toggle');
const bgMusic = $('bg-music');
const musicNext = $('music-next');
const petalsContainer = $('petals-container');
const heartBurst = $('heart-burst');
const liveCounter = $('live-counter');
const counterNumber = $('counter-number');
const letterContainer = $('letter-container');
const touchHeartsLayer = $('touch-hearts-layer');
const scratchCardSection = $('scratch-card-section');
const postFoldNav = $('post-fold-nav');
const btnReread = $('btn-reread');
const btnScratch = $('btn-scratch');

// ── State ───────────────────────────────────────────
let isMuted = false;
let musicStarted = false;
let isAnimating = false;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── Playlist ────────────────────────────────────────
const PLAYLIST = [
  { src: 'assets/music.mp3', name: '♪ Bài 1' },
  { src: 'assets/music2.mp3', name: '♪ Bài 2' },
  { src: 'assets/music3.mp3', name: '♪ Bài 3' },
];
let currentTrack = 0;

/* ═══════════════════════════════════════════════════════
   1. PASSWORD LOGIC
   ═══════════════════════════════════════════════════════ */
(function checkSession() {
  if (sessionStorage.getItem('valentine_unlocked') === 'true') {
    passwordScreen.classList.remove('active');
    envelopeScene.classList.add('active');
  }
})();

passwordForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const value = passwordInput.value.trim();
  if (value === PASSWORD) {
    sessionStorage.setItem('valentine_unlocked', 'true');
    errorMsg.textContent = '';
    passwordScreen.classList.add('fade-out');
    setTimeout(() => {
      passwordScreen.classList.remove('active', 'fade-out');
      envelopeScene.classList.add('active');
    }, 800);
  } else {
    passwordInput.classList.add('shake');
    errorMsg.textContent = 'Sai rồi, thử lại nha ❤️';
    setTimeout(() => passwordInput.classList.remove('shake'), 500);
    passwordInput.select();
  }
});

/* ═══════════════════════════════════════════════════════
   2. ENVELOPE + WAX SEAL CRACK ANIMATION
   Click → wax seal cracks → flap opens → letter slides → transition
   ═══════════════════════════════════════════════════════ */
function openEnvelope() {
  if (isAnimating) return;
  isAnimating = true;

  // Step 1: Crack the wax seal
  waxSeal.classList.add('cracked');

  // Step 2: After seal cracks, open flap
  setTimeout(() => {
    envelope.classList.add('opened');
    startMusic(); // iOS-safe: triggered by user gesture
  }, 600);

  // Step 3: Transition to letter scene
  setTimeout(() => {
    envelopeScene.classList.add('fade-out');
    setTimeout(() => {
      envelopeScene.classList.remove('active', 'fade-out');
      letterScene.classList.add('active');
      startLetterAnimation();
      setupTouchHearts();
      if (!prefersReducedMotion) {
        startPetals();
        setup3DTilt();
        setupParallax();
      }
    }, 800);
  }, 2200);
}

envelope.addEventListener('click', openEnvelope);
envelope.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openEnvelope(); }
});

/* ═══════════════════════════════════════════════════════
   3. MUSIC PLAYER (playlist, fade-in, next, toggle)
   ═══════════════════════════════════════════════════════ */
function loadTrack(index) {
  currentTrack = index % PLAYLIST.length;
  bgMusic.src = PLAYLIST[currentTrack].src;
}

function startMusic() {
  if (musicStarted) return;
  musicStarted = true;
  loadTrack(0);
  bgMusic.volume = 0;
  const p = bgMusic.play();
  if (p !== undefined) {
    p.then(() => fadeInMusic()).catch(() => { musicStarted = false; });
  }
}

function fadeInMusic() {
  const target = 0.25, step = 0.005, interval = 50;
  const t = setInterval(() => {
    if (bgMusic.volume < target - step) {
      bgMusic.volume = Math.min(bgMusic.volume + step, target);
    } else { bgMusic.volume = target; clearInterval(t); }
  }, interval);
}

function playNext() {
  const wasPlaying = !bgMusic.paused;
  loadTrack(currentTrack + 1);
  if (wasPlaying) {
    bgMusic.volume = 0.25;
    bgMusic.play().catch(() => { });
  }
}

// Auto-advance to next song when current ends
bgMusic.addEventListener('ended', () => playNext());

soundToggle.addEventListener('click', () => {
  isMuted = !isMuted;
  bgMusic.muted = isMuted;
  soundToggle.classList.toggle('muted', isMuted);
  soundToggle.querySelector('.sound-icon').textContent = isMuted ? '🔇' : '🔊';
  if (!musicStarted && !isMuted) startMusic();
});

musicNext.addEventListener('click', () => {
  if (!musicStarted) {
    startMusic();
    return;
  }
  playNext();
});

/* ═══════════════════════════════════════════════════════
   4. HANDWRITING ANIMATION (enhanced typewriter)
   ═══════════════════════════════════════════════════════ */
function startLetterAnimation() {
  if (prefersReducedMotion) { showLetterInstantly(); return; }
  animateTitle()
    .then(() => animateParagraphs())
    .then(() => animateClosingAndSignature())
    .then(() => animatePS())
    .then(() => {
      // After letter finishes: show counter, then heart burst
      showLiveCounter();
      // Smooth scroll to show the counter, then trigger burst
      setTimeout(() => {
        liveCounter.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => triggerHeartBurst(), 1500);
      }, 800);
    });
}

function animateTitle() {
  return new Promise(resolve => typewriteText(letterTitle, LETTER_TITLE, 50, resolve));
}

function animateParagraphs() {
  return new Promise(resolve => {
    let i = 0;
    function next() {
      if (i >= LETTER_PARAGRAPHS.length) { resolve(); return; }
      const p = document.createElement('div');
      p.className = 'paragraph';
      letterBody.appendChild(p);
      requestAnimationFrame(() => { p.style.opacity = '1'; });
      typewriteText(p, LETTER_PARAGRAPHS[i], 35, () => { i++; setTimeout(next, 400); });
    }
    next();
  });
}

function animateClosingAndSignature() {
  return new Promise(resolve => {
    const d = document.createElement('div');
    d.className = 'paragraph'; d.style.opacity = '1';
    letterBody.appendChild(d);
    typewriteText(d, LETTER_CLOSING, 80, () => {
      setTimeout(() => typewriteText(letterSig, LETTER_SIGNATURE, 60, resolve), 500);
    });
  });
}

function animatePS() {
  return new Promise(resolve => {
    letterPs.style.opacity = '0'; letterPs.style.transition = 'opacity 0.5s';
    setTimeout(() => { letterPs.style.opacity = '1'; typewriteText(letterPs, LETTER_PS, 30, resolve); }, 600);
  });
}

/**
 * Core typewriter with ink splash effect
 * - Random delay ±40% for natural feel
 * - Longer pauses after punctuation
 * - Blinking cursor follows text
 * - Ink splash on each character (subtle)
 */
function typewriteText(element, text, baseDelay, onComplete) {
  let index = 0;
  element.textContent = '';
  const cursor = document.createElement('span');
  cursor.className = 'letter-cursor';
  element.appendChild(cursor);

  function typeNext() {
    if (index >= text.length) {
      setTimeout(() => { if (cursor.parentNode) cursor.remove(); if (onComplete) onComplete(); }, 300);
      return;
    }
    const char = text[index];
    const span = document.createElement('span');
    span.className = 'char'; span.textContent = char;
    element.insertBefore(span, cursor);
    requestAnimationFrame(() => span.classList.add('visible'));


    index++;
    let delay = baseDelay + (Math.random() * baseDelay * 0.8 - baseDelay * 0.4);
    if ('.!?'.includes(char)) delay += baseDelay * 4;
    else if (char === ',') delay += baseDelay * 2;
    else if ('—–'.includes(char)) delay += baseDelay * 3;
    else if (char === '\n') delay += baseDelay * 2;

    // Auto-scroll
    const sceneEl = letterScene;
    if (sceneEl) {
      const cr = cursor.getBoundingClientRect();
      const sr = sceneEl.getBoundingClientRect();
      if (cr.bottom > sr.bottom - 40) sceneEl.scrollBy({ top: 60, behavior: 'smooth' });
    }
    setTimeout(typeNext, delay);
  }
  typeNext();
}

function showLetterInstantly() {
  letterTitle.textContent = LETTER_TITLE;
  LETTER_PARAGRAPHS.forEach(t => {
    const p = document.createElement('div');
    p.className = 'paragraph'; p.style.opacity = '1'; p.textContent = t;
    letterBody.appendChild(p);
  });
  const c = document.createElement('div');
  c.className = 'paragraph'; c.style.opacity = '1'; c.textContent = LETTER_CLOSING;
  letterBody.appendChild(c);
  letterSig.textContent = LETTER_SIGNATURE;
  letterPs.textContent = LETTER_PS; letterPs.style.opacity = '1';
  showLiveCounter();
}

/* ═══════════════════════════════════════════════════════
   5. PETAL FALLING EFFECT
   Creates rose petals that drift down continuously
   ═══════════════════════════════════════════════════════ */
function startPetals() {
  function createPetal() {
    const petal = document.createElement('div');
    petal.className = 'petal';
    const left = Math.random() * 100;
    const size = 0.6 + Math.random() * 0.8;
    const duration = 6 + Math.random() * 8;
    const hueShift = Math.random() * 30 - 15;
    petal.style.cssText = `
      left:${left}%;
      transform:scale(${size});
      animation-duration:${duration}s;
      filter:blur(${Math.random() < 0.3 ? 1 : 0.3}px) hue-rotate(${hueShift}deg);
    `;
    petalsContainer.appendChild(petal);
    setTimeout(() => petal.remove(), duration * 1000);
  }
  // Create petals periodically
  setInterval(createPetal, 800);
  // Initial burst
  for (let i = 0; i < 5; i++) setTimeout(createPetal, i * 200);
}

/* Ink splash effect removed — was causing visible black dots */

/* ═══════════════════════════════════════════════════════
   7. LIVE COUNTER (real-time day count with flip digits)
   ═══════════════════════════════════════════════════════ */
function showLiveCounter() {
  liveCounter.classList.add('visible');
  updateCounter();
  // Update every second for the "live" feeling
  setInterval(updateCounter, 1000);
}

function updateCounter() {
  // Use the fixed DAYS_TOGETHER constant (1072)
  const days = DAYS_TOGETHER;
  const formatted = days.toLocaleString();
  const currentText = counterNumber.textContent.replace(/[^\d]/g, '');

  if (currentText === String(days)) return; // No change

  counterNumber.innerHTML = '';
  for (const ch of formatted) {
    if (ch === ',' || ch === '.') {
      const dot = document.createElement('span');
      dot.className = 'counter-dot'; dot.textContent = '.';
      counterNumber.appendChild(dot);
    } else {
      const digit = document.createElement('span');
      digit.className = 'counter-digit'; digit.textContent = ch;
      counterNumber.appendChild(digit);
      // Trigger flip animation
      requestAnimationFrame(() => {
        digit.classList.add('flip');
        setTimeout(() => digit.classList.remove('flip'), 600);
      });
    }
  }
}

/* ═══════════════════════════════════════════════════════
   8. FINALE — Heart Pulse → Burst → Scroll Up → Fold & Stamp
   ═══════════════════════════════════════════════════════ */
function triggerHeartBurst() {
  if (prefersReducedMotion) return;

  // Phase 1: Big heart appears and pulses
  const bigHeart = document.createElement('div');
  bigHeart.className = 'big-heart-center';
  bigHeart.textContent = '❤️';
  heartBurst.appendChild(bigHeart);

  // Phase 2: After pulsing, explode into small hearts
  setTimeout(() => {
    bigHeart.classList.add('explode');

    const heartEmojis = ['❤️', '💕', '💗', '💖', '🌸', '💫'];
    for (let i = 0; i < 50; i++) {
      const p = document.createElement('div');
      p.className = 'burst-particle';
      p.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
      const angle = (Math.PI * 2 * i) / 50 + (Math.random() - 0.5) * 0.5;
      const dist = 60 + Math.random() * 300;
      const dur = 1.5 + Math.random() * 1.5;
      p.style.cssText = `
        --tx:${Math.cos(angle) * dist}px;
        --ty:${Math.sin(angle) * dist}px;
        --scale:${0.3 + Math.random() * 1};
        --rot:${(Math.random() - 0.5) * 720}deg;
        left:50%; top:50%;
        font-size:${0.5 + Math.random() * 1.2}rem;
        animation: burstOut ${dur}s ease-out forwards;
        animation-delay: ${Math.random() * 0.3}s;
      `;
      heartBurst.appendChild(p);
      setTimeout(() => p.remove(), (dur + 0.3) * 1000);
    }

    // Remove big heart
    setTimeout(() => bigHeart.remove(), 600);

    // Phase 3: After hearts fade (wait ~3s), scroll letter to top & fold
    setTimeout(() => {
      heartBurst.innerHTML = ''; // Clean up
      scrollAndFoldLetter();
    }, 3500);

  }, 2000); // 2s of pulsing before exploding
}

/**
 * Smoothly scrolls the letter scene back to the top,
 * then folds the letter and applies a keepsake stamp.
 */
function scrollAndFoldLetter() {
  // Step 1: Smooth scroll back to top
  const scrollDuration = 3000; // 3 seconds
  const startScroll = letterScene.scrollTop;
  const startTime = performance.now();

  function scrollStep(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / scrollDuration, 1);
    // Ease-in-out curve
    const eased = progress < 0.5
      ? 2 * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    letterScene.scrollTop = startScroll * (1 - eased);

    if (progress < 1) {
      requestAnimationFrame(scrollStep);
    } else {
      // Step 2: After scroll completes, fold the letter
      setTimeout(() => foldLetter(), 800);
    }
  }

  requestAnimationFrame(scrollStep);
}

/**
 * Folds the letter paper with a closing animation
 * and stamps it with a keepsake seal.
 */
function foldLetter() {
  const paper = $('letter-paper');
  const container = $('letter-container');
  if (!paper || !container) return;

  // Add folding class
  container.classList.add('folding');

  // After fold animation completes, add the keepsake stamp
  setTimeout(() => {
    // Create keepsake stamp overlay
    const stamp = document.createElement('div');
    stamp.className = 'keepsake-stamp';
    stamp.innerHTML = `
      <div class="stamp-border">
        <div class="stamp-inner">
          <div class="stamp-heart">❤️</div>
          <div class="stamp-text-main">KỶ NIỆM</div>
          <div class="stamp-text-sub">Chúng Mình</div>
          <div class="stamp-date">10 • 03 • 2023</div>
          <div class="stamp-text-bottom">mãi bên nhau ∞</div>
        </div>
      </div>
    `;
    container.appendChild(stamp);

    // Animate stamp in
    requestAnimationFrame(() => {
      stamp.classList.add('stamped');
    });

    // Add a gentle sparkle around the stamp
    setTimeout(() => {
      for (let i = 0; i < 12; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'stamp-sparkle';
        sparkle.textContent = '✨';
        const angle = (Math.PI * 2 * i) / 12;
        const r = 80 + Math.random() * 40;
        sparkle.style.cssText = `
          --sx: ${Math.cos(angle) * r}px;
          --sy: ${Math.sin(angle) * r}px;
          animation-delay: ${i * 0.1}s;
        `;
        stamp.appendChild(sparkle);
      }
    }, 600);

    // Show navigation buttons after sparkles
    setTimeout(() => {
      postFoldNav.classList.add('visible');
      postFoldNav.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 1800);

    // Pre-initialize scratch card (hidden - shown when button clicked)
    setTimeout(() => {
      try { initScratchCard(); } catch (e) { /* canvas may not be ready */ }
    }, 2500);

  }, 1500); // wait for fold animation
}

/**
 * Unfolds the letter so user can re-read it.
 * Removes the stamp and folding class with smooth animation.
 */
function unfoldLetter() {
  const container = $('letter-container');
  const stamp = container.querySelector('.keepsake-stamp');

  // Hide nav buttons
  postFoldNav.classList.remove('visible');
  // Hide scratch card section
  scratchCardSection.classList.remove('visible');

  if (stamp) {
    stamp.style.transition = 'opacity .5s ease, transform .5s ease';
    stamp.style.opacity = '0';
    stamp.style.transform = 'translate(-50%, -50%) scale(0.5) rotate(-20deg)';
    setTimeout(() => stamp.remove(), 500);
  }

  setTimeout(() => {
    // Remove folding class to unfold
    container.classList.remove('folding');
    container.style.animation = 'letterUnfold .8s var(--transition-smooth) forwards';

    // Scroll to top of letter
    letterScene.scrollTo({ top: 0, behavior: 'smooth' });

    // Clean up animation after it completes
    setTimeout(() => {
      container.style.animation = '';

      // After user has time to re-read, show nav again at bottom
      // We listen for scroll to bottom to show the buttons
      showNavOnScrollEnd();
    }, 900);
  }, stamp ? 500 : 0);
}

/**
 * Shows post-fold-nav when user scrolls near the bottom of the letter.
 * Auto-removes itself once triggered.
 */
function showNavOnScrollEnd() {
  function onScroll() {
    const scrollBottom = letterScene.scrollTop + letterScene.clientHeight;
    const totalHeight = letterScene.scrollHeight;
    if (scrollBottom >= totalHeight - 100) {
      postFoldNav.classList.add('visible');
      postFoldNav.scrollIntoView({ behavior: 'smooth', block: 'center' });
      letterScene.removeEventListener('scroll', onScroll);
    }
  }
  letterScene.addEventListener('scroll', onScroll);
}

// Button: Re-read the letter
btnReread.addEventListener('click', () => unfoldLetter());

// Button: Go to scratch card
btnScratch.addEventListener('click', () => {
  scratchCardSection.classList.add('visible');
  setTimeout(() => {
    scratchCardSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 100);
});

/* ═══════════════════════════════════════════════════════
   9. 3D TILT EFFECT (desktop only — mouse follows paper)
   ═══════════════════════════════════════════════════════ */
function setup3DTilt() {
  if ('ontouchstart' in window) return; // Skip on touch devices

  const paper = letterContainer;
  if (!paper) return;

  letterScene.addEventListener('mousemove', (e) => {
    const rect = letterScene.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;  // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    const rotateY = x * 4;   // Max 2deg tilt
    const rotateX = -y * 3;

    paper.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  letterScene.addEventListener('mouseleave', () => {
    paper.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  });
}

/* ═══════════════════════════════════════════════════════
   10. PARALLAX SCROLL on letter scene
   Paper moves at slightly different rate than background
   ═══════════════════════════════════════════════════════ */
function setupParallax() {
  letterScene.addEventListener('scroll', () => {
    const scrollY = letterScene.scrollTop;
    // Subtle parallax: paper moves slightly slower than scroll
    if (letterContainer) {
      letterContainer.style.marginTop = `${scrollY * 0.03}px`;
    }
    // Petals container parallax
    if (petalsContainer) {
      petalsContainer.style.transform = `translateY(${scrollY * 0.1}px)`;
    }
  });
}

/* ═══════════════════════════════════════════════════════
   11. TOUCH HEARTS EFFECT
   Clicking anywhere on letter scene spawns floating hearts
   ═══════════════════════════════════════════════════════ */
function setupTouchHearts() {
  letterScene.addEventListener('click', (e) => {
    // Don't trigger on buttons or interactive elements
    if (e.target.closest('button, canvas, a, .scratch-card-wrapper, .fold-nav-btn')) return;
    spawnTouchHearts(e.clientX, e.clientY);
  });
}

function spawnTouchHearts(x, y) {
  const hearts = ['❤️', '💕', '💗', '💖', '🩷', '💘'];
  const count = 5 + Math.floor(Math.random() * 4); // 5-8 hearts
  for (let i = 0; i < count; i++) {
    const heart = document.createElement('div');
    heart.className = 'touch-heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.8;
    const dist = 30 + Math.random() * 60;
    const size = 0.6 + Math.random() * 0.8;
    heart.style.cssText = `
      left: ${x}px;
      top: ${y}px;
      --tx: ${Math.cos(angle) * dist}px;
      --ty: ${-40 - Math.random() * 80}px;
      font-size: ${size}rem;
      animation-delay: ${i * 0.05}s;
    `;
    touchHeartsLayer.appendChild(heart);
    setTimeout(() => heart.remove(), 1800);
  }
}

/* ═══════════════════════════════════════════════════════
   12. SCRATCH CARD (Canvas scratch to reveal message)
   ═══════════════════════════════════════════════════════ */
function initScratchCard() {
  scratchCardSection.classList.add('visible');

  const canvas = $('scratch-canvas');
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;

  // Draw the scratch overlay
  // Gold gradient background
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, '#C9A96E');
  grad.addColorStop(0.5, '#E8D5A8');
  grad.addColorStop(1, '#C9A96E');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Decorative pattern
  ctx.globalAlpha = 0.15;
  for (let i = 0; i < 40; i++) {
    ctx.fillStyle = i % 2 === 0 ? '#fff' : '#B8963E';
    ctx.beginPath();
    ctx.arc(Math.random() * w, Math.random() * h, 2 + Math.random() * 8, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // Text on scratch layer
  ctx.fillStyle = '#722F37';
  ctx.font = 'bold 22px "Dancing Script", cursive';
  ctx.textAlign = 'center';
  ctx.fillText('✨ Cào nhẹ để mở ✨', w / 2, h / 2 - 10);
  ctx.font = '16px "Montserrat", sans-serif';
  ctx.fillText('Bí mật bên dưới...', w / 2, h / 2 + 20);

  // Small hearts decoration on scratch layer
  ctx.font = '18px serif';
  const deco = ['❤️', '💗', '✨', '💕'];
  for (let i = 0; i < 8; i++) {
    ctx.fillText(deco[i % deco.length], 30 + Math.random() * (w - 60), 30 + Math.random() * (h - 60));
  }

  // Scratch logic
  let isScratching = false;
  let scratchRevealed = false;

  function scratch(px, py) {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(px, py, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
    checkScratchProgress();
  }

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = w / rect.width;
    const scaleY = h / rect.height;
    if (e.touches) {
      return { x: (e.touches[0].clientX - rect.left) * scaleX, y: (e.touches[0].clientY - rect.top) * scaleY };
    }
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
  }

  function checkScratchProgress() {
    if (scratchRevealed) return;
    const imageData = ctx.getImageData(0, 0, w, h);
    let clear = 0;
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) clear++;
    }
    const progress = clear / (w * h);
    if (progress > 0.4) {
      scratchRevealed = true;
      revealScratchCard(canvas);
    }
  }

  // Mouse events
  canvas.addEventListener('mousedown', (e) => { isScratching = true; const p = getPos(e); scratch(p.x, p.y); });
  canvas.addEventListener('mousemove', (e) => { if (!isScratching) return; const p = getPos(e); scratch(p.x, p.y); });
  canvas.addEventListener('mouseup', () => isScratching = false);
  canvas.addEventListener('mouseleave', () => isScratching = false);

  // Touch events
  canvas.addEventListener('touchstart', (e) => { e.preventDefault(); isScratching = true; const p = getPos(e); scratch(p.x, p.y); }, { passive: false });
  canvas.addEventListener('touchmove', (e) => { e.preventDefault(); if (!isScratching) return; const p = getPos(e); scratch(p.x, p.y); }, { passive: false });
  canvas.addEventListener('touchend', () => isScratching = false);
}

function revealScratchCard(canvas) {
  // Fade out the canvas
  canvas.style.transition = 'opacity 0.8s ease';
  canvas.style.opacity = '0';
  setTimeout(() => {
    canvas.style.display = 'none';
    // Add reveal animation
    const reveal = $('scratch-reveal');
    reveal.classList.add('revealed');
  }, 800);
}
