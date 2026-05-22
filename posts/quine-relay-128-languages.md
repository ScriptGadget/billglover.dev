# quine relay, 128 languages

Yusuke Endoh's quine-relay reached 128 languages in November 2017. Ruby prints Rust, Rust prints R, R prints Racket, and so on through the alphabet until BASIC prints Ruby. The cycle closes. The source for the Ruby file is about 100KB. Most of it is unreadable, a thick block of escaped characters arranged in the rough shape of the Earth.

I ran the first six steps last week on a laptop. Ruby to Rust took 0.4 seconds. Rust to R needed rustc and about eleven seconds to compile. By step four I had four intermediate files on disk, each a complete program in a different language, each containing, somewhere inside it, the next 124 programs folded together.

The folding is not metaphorical. The Ruby file contains a compressed payload. Each language in the chain peels one layer and emits the next. Endoh calls this an "Uroboros program." On the GitHub README there is a table listing all 128 with their file extensions, from .rb to .bas, in run order.

Earlier versions existed at 50 languages (2013) and 100 (2015). The 128 version is the current one. There is an issue from 2019 asking about adding Zig. It is still open.
