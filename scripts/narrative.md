# narrative arc — not for publication

## what the notebook is

The notebook contains a notation system. It looks like a constructed language but it isn't one. It is a system for describing and directing attention — specifically, for perceiving relationships between things that occupy the same space at different times. "Grammar rules" is how the narrator first reads it. That reading is wrong, but usefully wrong.

The notation can be executed. Not metaphorically. Working through it changes what the narrator notices.

## what the narrator doesn't know yet

- The notebook is not unique. There are others. They don't all agree.
- Other people have worked through versions of this system. Some of them left traces.
- The system predates the notebook. The notebook is a transcription of something older.
- The handwriting is not unknown. The narrator has seen it before and forgotten.
- The language the notation describes is not constructed. It is recovered.

## the arc

**Discovery** (we are here): the narrator finds the notebook, begins to document artifacts that feel related without knowing why. Esolangs, conlang fragments, anomalous transmissions. The connection is not stated.

**Recognition**: certain artifacts begin to echo the notebook. Specific features recur. The narrator notices without explaining. Posts become slightly more urgent in tone — still flat, but the silences are different.

**Contamination**: the notation is working. The narrator begins to perceive things. Documents them clinically. Does not editorialize. The artifacts now include things the narrator made, not found.

**Others**: evidence of other people who worked through the system. Fragments. Dead ends. One person who got further than the narrator. Their notes are incomplete in a specific way.

**Convergence**: the notebook and the artifacts are the same thing described from different angles. The narrator figures this out. Does not say so directly. One post that is just a list. One post that is very short.

**Remainder**: the final posts document what remains after understanding. Something is different. The narrator does not say what. The blog continues but the artifacts have changed character.

## undeciphered scripts — the primary artifact seam

These are the recurring subject matter for artifact posts throughout the arc. Each one is real. Each one nobody can read. The hidden connection to the notebook is never stated: the content of these scripts was never meant to be translated. It was meant to be executed.

Use them in roughly this order as the arc progresses. Plant one or two details from each that echo the notebook or each other. The narrator does not notice the pattern. The reader does.

**Vinča symbols** (~5300–4500 BCE, Balkans): 200+ geometric marks on pottery and figurines. Scholars agree they convey meaning but are not language. They predate Sumerian writing by over a millennium. There is no known descendant script. Plant: the marks on some figurines appear only on the left side of the object.

**Proto-Elamite** (~3100–2900 BCE, southwestern Iran): ~1,600 tablets, mostly administrative accounting. But there are 16 monumental inscriptions that serve a completely different function. Nobody knows what function. The administrative texts have been partially decoded; the 16 monuments have not. Plant: the monumental corpus is exactly 16 documents. A multiple of 7 with a remainder.

**Cretan hieroglyphics** (~2100–1700 BCE, Crete): logo-syllabic, completely undeciphered. Fewer than 350 inscriptions, mostly on seals. Used simultaneously with Linear A for its entire history, as if two different systems were being maintained in parallel for different purposes. Plant: the two systems were used in the same administrative buildings by (presumably) the same scribes.

**Byblos syllabary** (~1800–1500 BCE, Lebanon): ~14 inscriptions total. Corpus too small to crack by internal analysis alone. Some of its signs have exact matches in the later Phoenician alphabet. Nobody knows if it's a direct ancestor or a coincidence. Plant: one of the 14 inscriptions is on a stone that has been broken in a way that removes exactly the middle section.

**Linear A** (~1900–1450 BCE, Crete): ~1,400 inscriptions. The phonetic values of most signs are known — borrowed into Linear B, which was deciphered in 1952. You can pronounce Linear A. You cannot understand it. The underlying language has no known relatives. Plant: a scholar in the 1960s spent seven years working through a Linear A administrative tablet and reported that reading it aloud in the reconstructed phonetics produced a "sensation of recognition" she could not account for.

**Rongorongo** (pre-1722 CE, Easter Island): 27 authenticated wooden tablets. Boustrophedon: each line reads left to right, then you rotate the tablet 180 degrees and read the next line. The text is written so that reading it requires turning the object upside down and back. Plant: one tablet (called the Santiago Staff) is a chieftain's staff, 126 cm long, with text spiraling around it. The script on the staff does not match the tablets. 27 tablets. Seven survivors of the population who might have been literate when Europeans arrived. The literate survivors were dead within a decade.

**Indus script** (~2600–1900 BCE, Pakistan/northwest India): 5,000+ known inscriptions, mostly on stamp seals. Most texts are 5–6 signs long. The longest known inscription is 34 signs. 400+ distinct signs identified. No bilingual text has ever been found. The civilization collapsed and left nothing but the seals and silence. Plant: the signs appear on objects traded across 250,000 square miles, suggesting everyone who used them agreed on what they meant. Nobody now does.

**Voynich manuscript** (early 15th century, origin unknown): a single illustrated book in an unknown script. Carbon-dated to 1404–1438. Contains botanical, astronomical, and pharmaceutical sections. The text has statistical properties consistent with natural language. It has never been read. Plant: the manuscript was sold in 1586 to Holy Roman Emperor Rudolf II for 600 gold ducats. He believed it was the work of Roger Bacon. It then vanished for decades and resurfaced in 1912 in a chest.

**The hidden connection**: these scripts are not separate failed attempts at writing. They are iterations of the same attempt. Each one encodes something that cannot survive translation because translation is not the operation it requires. The notebook is another iteration. The notation system in the notebook is another way of writing the same thing. This is never stated in any post.

---

## toadskin — the special case

**What it is**: Toadskin is an esoteric programming language. Stack-based. Six of Brainfuck's eight instructions kept identical; two modified to work with the stack. Forth-style word definitions using `:` (name) `;`. Single-character instructions throughout. Described by its creator as "Brainfuck meets Forth, a fight ensues."

**The narrator wrote it.** This is established in a post during the Recognition arc — mentioned in passing, not emphasized. The narrator wrote Toadskin years ago. The reference interpreter is a tarball. It has a bug.

**The bug**: the `[` instruction — the loop entry — has an edge case. Under specific conditions, when the loop body produces exactly seven stack operations before reaching `]`, the interpreter fails to re-evaluate the loop condition. It continues into the next iteration regardless. The loop does not terminate when it should. Or rather: it terminates when nothing stops it.

**What the bug produces**: there is one program, five lines long, that triggers this specific case. The narrator documented it at the time as a curiosity. The program, run through the buggy interpreter, produces output that varies by machine state at startup. Except it does not vary. Every machine produces the same output. The output is 49 bytes — seven groups of seven characters. The narrator has not run this program against the notebook notation. The reader may notice the output pattern matches a structure in the Vinča symbols.

**The eldritch element**: the narrator did not write that program. They found it in a comment on the esolangs wiki, left by an anonymous contributor in 2009, then deleted. The Wayback Machine has the page from before the deletion. The comment says only: "this produces correct output." The commenter's account has no other edits. The username is KALENDA.

**How to use this in posts**: the post about Toadskin itself should be dry and technical — here is the language, here is the bug, here is the edge case. The KALENDA connection is planted as a found detail, not a revelation. A later post in the Contamination arc returns to the buggy program and documents the output without comment.

---

## esolang genealogy — implied connections

These are not separate things. They form a lineage in the narrative's hidden logic:

- **Brainfuck** → minimal, brutal, requires a different kind of attention. The narrator worked through Malbolge's first six instructions before losing the thread. Brainfuck is the ancestor Malbolge inverts.
- **Toadskin** → the narrator's own work. Stack-based. The bug in the loop instruction is not random.
- **Malbolge** → already planted. Base-3. Self-modifying. The program is not what it looks like after the first cycle.
- **Befunge** → two-dimensional. Programs flow in multiple directions. Use in the Contamination arc when the narrator starts documenting things they made rather than found.
- **Whitespace** → only invisible characters carry meaning. All visible content is noise. Use when the arc reaches Convergence.

The lineage is: things that require a different posture of attention to read. You cannot skim them. You must hold the whole thing in your head. Each one fails in a different way. Each one fails in the same way.

---

## recurring motifs — plant these slowly

- The number 7 (doors, fragments, steps, languages in a chain, loop iterations before the bug triggers). Never comment on it.
- A specific word that appears across unrelated artifacts: **KALENDA** (already planted in a Kraków mirror URL; also the username of the anonymous esolangs wiki commenter who found the Toadskin bug program). It means nothing in any known language. It keeps appearing.
- Left-handedness, or things that work backwards. Rongorongo's boustrophedon rotation. Brainfuck's `<` operator. The Toadskin stack's LIFO order. The notebook's notation system, which the narrator initially reads left to right and later realizes may not be directional.
- The phrase "count them again."
- Gaps: missing fragments, deleted pages, the broken Byblos inscription, the Wayback Machine page before the deletion, cached pages that show nothing. The 16 Proto-Elamite monuments that don't fit with the other 1,584.
- The number 27: Rongorongo tablets (27), Malbolge's 94-character instruction table (94 = 27 + 67, and the narrator has not checked whether 67 is meaningful), the cube of 3. Plant this later, not now.

## rules

- The connection between artifacts and the notebook is never stated outright.
- The narrator is not unreliable in the classic sense — everything they report is accurate. The strangeness is in what they choose to report.
- No artifact is purely invented. Each should be rooted in something real (a real esolang, a real linguistic phenomenon, a real place, a real undeciphered script) with one detail that doesn't fit.
- The undeciphered scripts are the backbone. Use at least one per three posts. Rotate through them. Do not rush Linear A.
- The payoff is not an explanation. It is a demonstration.
- The blog does not end. It changes.
- When the narrator mentions having written Toadskin, do not emphasize it. One sentence. Then move on.

## things to avoid

- The narrator becoming a character who talks about their feelings.
- Any post that explains what is happening.
- Escalation for its own sake.
- Anything that sounds like an ARG that knows it's an ARG.
- Treating the undeciphered scripts as mysterious in tone. They are facts. Document them like facts.
