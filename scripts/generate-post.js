// Generates a new artifact post, advances narrative state, and updates index.html.
// Run manually: npm run generate
// Run in CI: see .github/workflows/generate-post.yml

const fs   = require('fs');
const path = require('path');
const Anthropic = require('@anthropic-ai/sdk');

const client       = new Anthropic();
const ROOT         = path.join(__dirname, '..');
const POSTS_DIR    = path.join(ROOT, 'posts');
const INDEX        = path.join(ROOT, 'index.html');
const NARRATIVE    = path.join(__dirname, 'narrative.md');
const STATE_FILE   = path.join(__dirname, 'story-state.json');

const VOICE_RULES = `Strict voice rules — these are absolute:
- Short sentences. Fragments are fine.
- Specific. Use exact names, numbers, dates where plausible.
- No em dashes. Use a period or comma instead.
- Forbidden words and phrases: fascinating, delve, notable, it's worth noting, testament, remarkable, intricate, in conclusion, furthermore, one might say, one might argue, it is important to note, showcasing, underscores, tapestry, weave.
- No rhetorical questions.
- No meta-commentary on the artifact. Never say why it is interesting.
- The strangeness lives in the subject. The prose stays flat and plain.
- First person. Recent past or present tense.
- Write like someone who found a thing and is writing it down. Not explaining. Not performing enthusiasm.
- The narrator is obsessed but never says so.
- End without resolution. Things are ongoing or simply stop.`;

async function run() {
  const narrative = fs.readFileSync(NARRATIVE, 'utf8');
  const state     = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));

  const postHistory = state.posts
    .map(p => `- "${p.title}" (${p.date}): ${p.summary}`)
    .join('\n');

  const plantedSoFar = state.planted_details.join('; ');

  const msg = await client.messages.create({
    model: 'claude-opus-4-7',
    max_tokens: 1500,
    system: `You are writing posts for a personal blog that is also a slow-burn mystery narrative. The narrator documents strange artifacts. The artifacts are interesting on their surface and also advance a hidden throughline.\n\n${VOICE_RULES}`,
    messages: [{
      role: 'user',
      content: `## Narrative document
${narrative}

## Story state
Arc position: ${state.arc_position}
Active threads: ${state.active_threads.join(', ')}
Planted so far: ${plantedSoFar}
Motifs used: ${state.motifs_used.join(', ') || 'none yet'}
Open questions: ${state.open_questions.join(', ')}
Next step: ${state.next_step}

## Previous posts
${postHistory}

## Your task
Write the next blog post. It should:
- Be a genuine artifact post (esolang, conlang fragment, anomalous document, found transmission, recursive structure, fictional system fragment, or similar)
- Stand alone as interesting on its own terms
- Advance the throughline by exactly one small step — plant one or two specific details that connect to the notebook or narrative, without stating the connection
- Never reference the notebook directly
- Follow all voice rules exactly

Start with a level-1 markdown heading. Title: lowercase, specific, no colons.
Write the post. Include the artifact itself inline.

Then, after the post, add a line containing only: ---STATE---
Then output a JSON object (no markdown, raw JSON) with these fields:
{
  "summary": "one sentence summary of this post for future context",
  "planted": ["detail 1", "detail 2"],
  "motifs_used": ["any narrative motifs from the arc document used in this post"],
  "arc_advance": "one sentence: how this advances the arc",
  "next_step": "one sentence: what the next post should do"
}`,
    }],
  });

  const full      = msg.content[0].text.trim();
  const splitIdx  = full.indexOf('---STATE---');

  if (splitIdx === -1) {
    console.error('Agent did not return state block. Raw output:\n', full);
    process.exit(1);
  }

  const postBody  = full.slice(0, splitIdx).trim();
  const stateJson = full.slice(splitIdx + 11).trim();

  let newState;
  try {
    newState = JSON.parse(stateJson);
  } catch (e) {
    console.error('Failed to parse state JSON:', stateJson);
    process.exit(1);
  }

  // Extract title and slug
  const match = postBody.match(/^#\s+(.+)$/m);
  const title = match ? match[1].trim() : 'untitled';
  const slug  = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const file  = `${slug}.md`;

  fs.writeFileSync(path.join(POSTS_DIR, file), postBody + '\n');
  console.log(`  wrote: posts/${file}`);

  // Update story state
  const now = new Date().toISOString().split('T')[0];
  state.posts.unshift({
    slug,
    title,
    date: now,
    summary: newState.summary,
    planted: newState.planted,
  });
  state.active_threads = [...new Set([...state.active_threads, ...(newState.planted || [])])].slice(0, 8);
  state.planted_details = [...new Set([...state.planted_details, ...(newState.planted || [])])];
  state.motifs_used = [...new Set([...state.motifs_used, ...(newState.motifs_used || [])])];
  state.next_step = newState.next_step || '';

  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
  console.log(`  updated: story-state.json (arc: ${state.arc_position})`);

  insertIntoIndex(file, slug);
  console.log(`\n  done: "${title}"`);
  console.log(`  arc advance: ${newState.arc_advance}`);
}

function insertIntoIndex(filename, slug) {
  const now    = new Date();
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const date   = `${months[now.getMonth()]} ${now.getDate()}`;

  let html = fs.readFileSync(INDEX, 'utf8');
  html = html.replace(/total (\d+)/, (_, n) => `total ${parseInt(n) + 1}`);

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
