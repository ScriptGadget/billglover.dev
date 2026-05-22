// Generates a new artifact post and inserts it into index.html.
// Run manually: npm run generate
// Run in CI: see .github/workflows/generate-post.yml

const fs   = require('fs');
const path = require('path');
const Anthropic = require('@anthropic-ai/sdk');

const client    = new Anthropic();
const POSTS_DIR = path.join(__dirname, '..', 'posts');
const INDEX     = path.join(__dirname, '..', 'index.html');

const ARTIFACT_TYPES = [
  'a minimal esolang: give it a name, a one-paragraph spec, and a short sample program with its output',
  'a conlang fragment: partial phonology and grammar rules, a small lexicon, and one or two example sentences',
  'an anomalous object entry written in a clinical catalogue style, original, SCP-adjacent',
  'a piece of ARG-style found material: a log excerpt, a partial cipher, or a transmission fragment with no explanation',
  'a short entry about a real but obscure recursive or self-referential structure in mathematics or language',
  'a fragment from a fictional system: a partial rule set from a game, ritual, or protocol that does not explain itself',
];

const SYSTEM = `You write posts for a personal blog. The blog belongs to someone who collects strange things: esolangs, conlang fragments, anomalous documents, found objects, recursive structures.

Strict voice rules:
- Short sentences. Fragments are fine.
- Specific. Use exact names, numbers, dates where plausible.
- No em dashes. Use a period or comma instead.
- Forbidden words and phrases: fascinating, delve, notable, it's worth noting, testament, remarkable, intricate, in conclusion, furthermore, one might say, one might argue, it is important to note, showcasing, underscores.
- No rhetorical questions.
- No meta-commentary on the artifact. Never say why it is interesting.
- The strangeness lives in the subject. The prose stays flat and plain.
- First person. Recent past or present tense.
- Write like someone who found a thing and is writing it down. Not explaining. Not performing enthusiasm.
- The narrator is obsessed but never says so.
- End without resolution. Things are ongoing or simply stop.`;

async function run() {
  const type = ARTIFACT_TYPES[Math.floor(Math.random() * ARTIFACT_TYPES.length)];
  console.log(`  artifact type: ${type}\n`);

  const msg = await client.messages.create({
    model: 'claude-opus-4-7',
    max_tokens: 1024,
    system: SYSTEM,
    messages: [{
      role: 'user',
      content: `Write a blog post presenting this artifact: ${type}.

Start with a level-1 markdown heading. The title should be lowercase and specific, like "on beginning" or "dialect notes, pages 4-7" or "oisc variant, unnamed". No colons in the title.

Then write the post: 2-5 short paragraphs. Include the artifact itself inline. Do not explain why it matters. Do not conclude. Return only the markdown, no preamble.`,
    }],
  });

  const body  = msg.content[0].text.trim();
  const match = body.match(/^#\s+(.+)$/m);
  const title = match ? match[1].trim() : 'untitled';
  const slug  = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const file  = `${slug}.md`;

  fs.writeFileSync(path.join(POSTS_DIR, file), body + '\n');
  console.log(`  wrote: posts/${file}`);

  insertIntoIndex(file, slug);
  console.log(`\n  done: "${title}"`);
}

function insertIntoIndex(filename, slug) {
  const now    = new Date();
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const date   = `${months[now.getMonth()]} ${now.getDate()}`;

  let html = fs.readFileSync(INDEX, 'utf8');

  // Bump total count
  html = html.replace(/total (\d+)/, (_, n) => `total ${parseInt(n) + 1}`);

  // Insert new entry at the top of the list, after the meta row
  const entry = `
          <div class="ls-entry" role="listitem">
            <span class="ls-perm dim" aria-hidden="true">-rw-r--r--</span>
            <span class="ls-owner dim" aria-hidden="true">bill  staff</span>
            <span class="ls-size dim" aria-hidden="true">1337</span>
            <span class="ls-date yellow">${date}</span>
            <a href="posts/${slug}.html" class="ls-name">${filename}</a>
          </div>`;

  html = html.replace(
    /(<div class="ls-meta-row dim"[^>]*>[^<]*<\/div>)/,
    `$1\n${entry}`,
  );

  fs.writeFileSync(INDEX, html);
  console.log(`  updated: index.html`);
}

run().catch(err => { console.error(err); process.exit(1); });
