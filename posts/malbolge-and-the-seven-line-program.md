# malbolge and the seven-line program

Malbolge is an esoteric programming language. Ben Olmstead released it in 1998. It was designed to be as difficult to program in as possible. The first working Malbolge program was not written by a human. A program called the Lisp Beam-search generated it two years after the language existed.

That program is seven lines long. It prints "HEllO WORlD" with the casing exactly like that.

I copied it out:

```
(=<`#9]~6ZY32Vx/4Rs+0No-&Jk)"Fh}|Bcy?`=*z]Kw%oG4UUS0/@-ejc(:'8dc
```

That is one line. The published version wraps. I am counting the wraps as lines because that is how it appears in the original post on the language's page. Count them again. Seven.

The instruction set has three trits per instruction. Base three. Every instruction encrypts the next one according to a fixed table of 94 values. The program is not what it looks like. After the first cycle the memory has been rewritten.

I worked through the first six instructions by hand on Sunday. By the seventh I had lost the thread and had to start over. I started over four times.

There is a mailing list archive from 2000 where someone named Andrew Cooke describes solving it. He says he used a local beam search with a width of 2000. He says it took him "a weekend." The page is cached. The original is gone. The cached version has a gap where a code block should be. The surrounding text refers to the block.

The word KALENDA appears in the URL of one of the mirrors. Not in the content. In the path: `/mirror/kalenda/malbolge/`. The mirror is hosted at a university in Kraków. I cannot find what KALENDA is supposed to stand for there. The rest of the directory is empty.

I am going to try the program on the reference interpreter tonight. I want to see the casing come out wrong on purpose.
