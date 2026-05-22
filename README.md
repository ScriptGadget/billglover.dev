# billglover.dev

Source for [billglover.dev](https://billglover.dev). Terminal-themed static blog. Posts are markdown, built to HTML at deploy time.

I write about code and things adjacent to code. Something posts on Mondays. The commit history is accurate.

---

## Build

```bash
npm install
npm run build
```

Posts live in `posts/`. The HTML is generated and gitignored. `rss.xml` is also generated at build time.

---

## Structure

```
posts/          markdown sources
scripts/        build pipeline and post generation
styles.css      one file
main.ts         terminal interaction layer
```

There is a `scripts/narrative.md` file. It is not published.
