// ── Logo color cycle ──────────────────────────────────────────────────────────

const LOGO_COLORS = [
  '#4ade80', // green  (default)
  '#22d3ee', // cyan
  '#fbbf24', // yellow
  '#e879f9', // magenta
  '#60a5fa', // blue
  '#f87171', // red
  '#ffffff', // white
];

let logoColorIdx = 0;

function initLogoClick(): void {
  const logo = document.getElementById('logo');
  if (!logo) return;

  logo.addEventListener('click', () => {
    logoColorIdx = (logoColorIdx + 1) % LOGO_COLORS.length;
    logo.style.color = LOGO_COLORS[logoColorIdx];
  });
}

// ── Konami code → matrix rain easter egg ─────────────────────────────────────

const KONAMI_SEQ = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
];
let konamiIdx = 0;

function initKonamiCode(): void {
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === KONAMI_SEQ[konamiIdx]) {
      konamiIdx++;
      if (konamiIdx === KONAMI_SEQ.length) {
        konamiIdx = 0;
        startMatrixRain();
      }
    } else {
      // Allow partial restarts (e.g. ↑↑↑ should still register the last ↑↑)
      konamiIdx = e.key === KONAMI_SEQ[0] ? 1 : 0;
    }
  });
}

function startMatrixRain(): void {
  // Remove any existing rain
  document.getElementById('matrix')?.remove();

  const canvas = document.createElement('canvas');
  canvas.id = 'matrix';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d')!;
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const CHAR_W = 16;
  const cols   = Math.floor(canvas.width / CHAR_W);
  const drops  = Array.from({ length: cols }, () => Math.random() * -50);
  const glyphs = 'アイウエオカキクケコサシスセソタチツテト01アBILLGLOVER';

  let frame = 0;
  const MAX_FRAMES = 260;

  const tick = setInterval(() => {
    // Fade trail
    ctx.fillStyle = 'rgba(0,0,0,0.06)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = `${CHAR_W}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      // Head of column is bright; trail is dim
      const y = drops[i] * CHAR_W;
      ctx.fillStyle = y > 0 && Math.random() > 0.9 ? '#ffffff' : '#4ade80';
      const ch = glyphs[Math.floor(Math.random() * glyphs.length)];
      ctx.fillText(ch, i * CHAR_W, y);

      if (y > canvas.height && Math.random() > 0.97) drops[i] = 0;
      drops[i] += 0.7;
    }

    if (++frame >= MAX_FRAMES) {
      clearInterval(tick);
      // Fade out canvas
      canvas.style.transition = 'opacity 0.8s';
      canvas.style.opacity = '0';
      setTimeout(() => canvas.remove(), 900);
    }
  }, 30);
}

// ── Fake interactive terminal prompt ─────────────────────────────────────────

const COMMANDS: Record<string, string> = {
  help:   '  available: help  whoami  ls  clear  exit  ?',
  '?':    '  available: help  whoami  ls  clear  exit  ?',
  whoami: '  bill glover — writer, tinkerer, maker of things',
  ls:     '  posts/on-beginning.md   about.txt   rss.xml',
  exit:   '  nice try.',
  clear:  '', // handled specially
};

let inputBuf = '';
const inputEl  = document.getElementById('user-input') as HTMLElement;
const outputEl = document.getElementById('cmd-output') as HTMLElement;

function initFakePrompt(): void {
  document.addEventListener('keydown', handleKey);
}

function handleKey(e: KeyboardEvent): void {
  // Don't steal browser/OS shortcuts
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  // Don't steal from focused form elements
  const tag = (document.activeElement as HTMLElement).tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA') return;

  if (e.key === 'Enter') {
    runCommand(inputBuf.trim().toLowerCase());
    inputBuf = '';
    inputEl.textContent = '';
    return;
  }

  if (e.key === 'Backspace') {
    inputBuf = inputBuf.slice(0, -1);
    inputEl.textContent = inputBuf;
    return;
  }

  // Single printable character
  if (e.key.length === 1) {
    inputBuf += e.key;
    inputEl.textContent = inputBuf;
  }
}

function runCommand(cmd: string): void {
  if (cmd === 'clear') {
    outputEl.textContent = '';
    return;
  }

  if (cmd in COMMANDS) {
    outputEl.textContent = COMMANDS[cmd];
    return;
  }

  if (cmd === '') {
    outputEl.textContent = '';
    return;
  }

  outputEl.textContent = `  bash: ${cmd}: command not found`;
}

// ── Boot ─────────────────────────────────────────────────────────────────────

initLogoClick();
initKonamiCode();
initFakePrompt();
