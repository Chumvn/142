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
const LETTER_TITLE = `Gửi ${RECEIVER_NAME} của anh ❤️`;
const LETTER_PARAGRAPHS = [
  `Hôm nay, khi viết những dòng này, anh mới nhận ra rằng chúng ta đã đi cùng nhau ${DAYS_TOGETHER.toLocaleString()} ngày — tròn 2 năm 11 tháng kể từ ngày mình về chung một nhà.`,
  `Thời gian không quá dài, nhưng đủ để anh hiểu rằng hạnh phúc không phải là những điều lớn lao. Chỉ là mỗi ngày được về nhà, thấy em ở đó, cùng nhau ăn cơm, cùng nhau nói những chuyện rất bình thường.`,
  `Có những buổi tối mình ngồi cạnh nhau, chẳng nói gì nhiều, chỉ lặng lẽ ở bên. Nhưng chính những khoảnh khắc bình yên đó lại là điều anh trân quý nhất. Vì anh biết, không phải ai cũng may mắn có được một người để về nhà, một người để chia sẻ cả những điều nhỏ nhặt nhất trong ngày.`,
  `Cảm ơn em vì đã luôn ở bên anh — những lúc vui, lúc mệt, và cả những ngày chẳng có gì đặc biệt. Cảm ơn em vì đã chọn ở lại, cùng anh đi tiếp chặng đường này. Cảm ơn em vì đã kiên nhẫn với anh, vì đã yêu thương anh theo cách của riêng em — nhẹ nhàng, ấm áp, và chân thành.`,
  `Anh không hứa sẽ luôn hoàn hảo, nhưng anh hứa sẽ luôn cố gắng trở thành người chồng tốt hơn mỗi ngày. Vẫn là người nắm tay em khi cần, vẫn là người trở về bên em sau một ngày dài. Vẫn là người lắng nghe em, hiểu em, và luôn đặt em ở vị trí quan trọng nhất trong cuộc đời anh.`,
  `Đôi khi anh tự hỏi, nếu cuộc đời này có kiếp sau, liệu mình có tìm thấy nhau không? Anh không biết câu trả lời, nhưng anh biết chắc một điều — kiếp này, anh đã rất may mắn vì có em.`,
  `Nếu được chọn lại, anh vẫn sẽ chọn gặp em, chọn cưới em, và chọn cuộc sống này — thêm một lần nữa.`
];
const LETTER_CLOSING = `Yêu em.`;
const LETTER_SIGNATURE = SENDER_NAME;
const LETTER_PS = `P/S: ${DAYS_TOGETHER.toLocaleString()} ngày chỉ là bắt đầu thôi, phần còn lại mình viết tiếp cùng nhau nhé.`;

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
const petalsContainer = $('petals-container');
const heartBurst = $('heart-burst');
const liveCounter = $('live-counter');
const counterNumber = $('counter-number');
const letterContainer = $('letter-container');

// ── State ───────────────────────────────────────────
let isMuted = false;
let musicStarted = false;
let isAnimating = false;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
   3. BACKGROUND MUSIC (fade-in, toggle, iOS safe)
   ═══════════════════════════════════════════════════════ */
function startMusic() {
  if (musicStarted) return;
  musicStarted = true;
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

soundToggle.addEventListener('click', () => {
  isMuted = !isMuted;
  bgMusic.muted = isMuted;
  soundToggle.classList.toggle('muted', isMuted);
  soundToggle.querySelector('.sound-icon').textContent = isMuted ? '🔇' : '🔊';
  if (!musicStarted && !isMuted) startMusic();
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
      // After letter finishes: show counter + heart burst
      showLiveCounter();
      setTimeout(() => triggerHeartBurst(), 800);
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
   8. HEART BURST (celebration when letter finishes)
   ═══════════════════════════════════════════════════════ */
function triggerHeartBurst() {
  if (prefersReducedMotion) return;
  const emojis = ['❤️', '💕', '💗', '✨', '💖', '🌸', '💫', '🥰'];
  const count = 30;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'burst-particle';
    particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
    const distance = 100 + Math.random() * 200;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    const scale = 0.5 + Math.random() * 1;
    const rot = (Math.random() - 0.5) * 720;

    particle.style.cssText = `
      --tx:${tx}px; --ty:${ty}px; --scale:${scale}; --rot:${rot}deg;
      left:50%; top:50%;
      font-size:${0.8 + Math.random() * 1.2}rem;
      animation: burstOut ${1.5 + Math.random()}s ease-out forwards;
      animation-delay: ${Math.random() * 0.3}s;
    `;

    heartBurst.appendChild(particle);
    setTimeout(() => particle.remove(), 3000);
  }
}

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
