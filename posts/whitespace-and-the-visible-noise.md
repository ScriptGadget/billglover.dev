# whitespace and the visible noise

Whitespace was released April 1, 2003 by Edwin Brady and Chris Morris. It has three instructions that count: space, tab, linefeed. Every other character is ignored by the interpreter.

This means a valid Whitespace program can be embedded inside any text file that also contains ordinary prose, code, or garbage, and the interpreter will read only the spaces, tabs, and newlines. The visible content is not the program. The visible content is what the program hides behind.

I pulled the reference interpreter (wspace, 0.3) and ran it against the tutorial examples. It works as advertised. Then I tried something I have seen mentioned but not documented.

I took the source of a Brainfuck "hello world" (177 bytes, mixed `+`, `-`, `>`, `<`, `.`, `,`, `[`, `]` with formatting spaces between blocks) and fed it directly to wspace. The visible instructions are Brainfuck. The invisible instructions, the spacing between them, parse as Whitespace.

The Brainfuck program prints "Hello, World!" when run under a Brainfuck interpreter.

Under wspace, the same file pushes seven integers to the stack and halts. No output. The integers, read in push order: 75, 65, 76, 69, 78, 68, 65.

Those are ASCII codes. K, A, L, E, N, D, A.

I did not write the Brainfuck program. It is one of the canonical short "hello world" implementations, attributed on the esolangs wiki to a user whose account is inactive. The formatting, the specific placement of spaces and tabs between blocks, has been on the wiki page since 2007. I checked the page history. The formatting was introduced in a single edit that changed no visible characters. The edit summary reads: "cleanup." The editor's account has three edits total, all in March 2009, all on Brainfuck-adjacent pages. The username is not KALENDA. It is seven characters long. I am not going to write it down yet.

I ran the same test on four other canonical Brainfuck hello-worlds from the same wiki page. Three produce nothing under wspace. The fourth pushes two integers and halts: 27, 7.

I checked the Whitespace specification for what happens when a program halts with items remaining on the stack. The specification does not say. The reference interpreter discards them silently.

Count the invisible characters in a file you did not write. Count them again.
