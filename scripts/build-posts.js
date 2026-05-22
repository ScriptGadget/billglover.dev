// Converts posts/*.md → posts/*.html and generates rss.xml.
const fs   = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { marked } = require('marked');

const ROOT      = path.join(__dirname, '..');
const POSTS_DIR = path.join(ROOT, 'posts');
const BASE_URL  = 'https://billglover.dev';

function gitDate(filepath) {
  try {
    const out = execSync(`git log --follow --format="%aI" -- "${filepath}"`, { encoding: 'utf8' }).trim();
    const lines = out.split('\n').filter(Boolean);
    return lines[lines.length - 1] || new Date().toISOString();
  } catch {
    return new Date().toISOString();
  }
}

const mdFiles = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));

const posts = mdFiles.map(file => {
  const slug   = file.replace('.md', '');
  const raw    = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
  const body   = marked.parse(raw);
  const titleM = raw.match(/^#\s+(.+)$/m);
  const title  = titleM ? titleM[1] : slug;
  const date   = gitDate(path.join(POSTS_DIR, file));
  return { file, slug, raw, body, title, date };
});

// Newest first
posts.sort((a, b) => new Date(b.date) - new Date(a.date));

// ── HTML pages ────────────────────────────────────────────────────────────────

for (const { file, slug, body, title } of posts) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} // bill glover</title>
  <link rel="stylesheet" href="../styles.css" />
  <link rel="alternate" type="application/rss+xml" title="bill glover" href="${BASE_URL}/rss.xml" />
</head>
<body>
  <div id="terminal">
    <div id="titlebar" aria-hidden="true">
      <span class="dot red"></span>
      <span class="dot yellow"></span>
      <span class="dot green"></span>
      <span id="titlebar-path">bill@terminal-13: ~/blog/posts/${file}</span>
    </div>
    <div id="screen">
      <div class="prompt-line">
        <span class="ps1">bill@terminal-13<span class="dim">:</span><span class="path">~/blog</span><span class="dollar">$</span></span>
        <span class="cmd"> cat posts/${file}</span>
      </div>
      <article class="post-content">
        ${body}
      </article>
      <hr class="rule" />
      <div class="prompt-line">
        <span class="ps1">bill@terminal-13<span class="dim">:</span><span class="path">~/blog/posts</span><span class="dollar">$</span></span>
        <span class="cmd"> <a href="../index.html">cd ..</a></span>
      </div>
    </div>
  </div>
  <footer id="statusbar" aria-hidden="true">
    <span class="status-left">
      <a href="../index.html" style="color:inherit">← back</a>
    </span>
    <span class="status-right">billglover.dev v0.1.0</span>
  </footer>
</body>
</html>`;

  fs.writeFileSync(path.join(POSTS_DIR, `${slug}.html`), html);
  console.log(`  built: posts/${slug}.html`);
}

// ── RSS feed ──────────────────────────────────────────────────────────────────

function escapeXml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const items = posts.map(({ slug, title, body, date }) => `
  <item>
    <title>${escapeXml(title)}</title>
    <link>${BASE_URL}/posts/${slug}.html</link>
    <guid isPermaLink="true">${BASE_URL}/posts/${slug}.html</guid>
    <pubDate>${new Date(date).toUTCString()}</pubDate>
    <description><![CDATA[${body}]]></description>
  </item>`).join('');

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>bill glover</title>
    <link>${BASE_URL}</link>
    <description>code, words, and the spaces between</description>
    <language>en</language>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

fs.writeFileSync(path.join(ROOT, 'rss.xml'), rss);
console.log(`  built: rss.xml`);

console.log(`\n  ${posts.length} post(s) built.`);
