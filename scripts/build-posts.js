// Converts posts/*.md → posts/*.html, each wrapped in the terminal chrome.
const fs   = require('fs');
const path = require('path');
const { marked } = require('marked');

const POSTS_DIR = path.join(__dirname, '..', 'posts');

const mdFiles = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));

for (const file of mdFiles) {
  const slug    = file.replace('.md', '');
  const raw     = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
  const body    = marked.parse(raw);
  const titleM  = raw.match(/^#\s+(.+)$/m);
  const title   = titleM ? titleM[1] : slug;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} // bill glover</title>
  <link rel="stylesheet" href="../styles.css" />
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

console.log(`\n  ${mdFiles.length} post(s) built.`);
