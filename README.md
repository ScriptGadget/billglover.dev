# billglover.dev

Source for [billglover.dev](https://billglover.dev). Terminal-themed static blog. Posts are markdown, built to HTML at deploy time.

This is just an example site for some ideas I had about themes and automation. The posts are generated nonsense.

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
