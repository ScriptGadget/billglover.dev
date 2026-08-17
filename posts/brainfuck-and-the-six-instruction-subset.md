# brainfuck and the six-instruction subset

Brainfuck has eight instructions. `> < + - . , [ ]`. Every source file is a string over that alphabet. Everything else is comment.

I have been going back through Urban Müller's 1993 distribution. The tarball is 296 bytes. The compiler is written in Brainfuck. The README is three sentences.

There is a well-known result that you can drop `,` and still be Turing complete, because you can hardcode input. There is a less-known result: you can drop `,` and `.` and get a language that computes but does not communicate. It runs. It halts or does not halt. Nothing leaves the tape.

I wrote out the six-instruction subset on a page. `> < + - [ ]`. Then I noticed I had written it in a different order. `< > - + ] [`. Reversed. Every operator swapped with its inverse. I do this sometimes without noticing.

The six-instruction subset has a property the eight-instruction language does not. Every program has a mirror. Take any program, reverse the character order, swap each character with its inverse. The result is a program that undoes the first one on a blank tape, provided the first one halts. `> + + [ > + ]` mirrors to `[ < - ] < - - <`. Run one, then the other. The tape is blank again. The head is at cell zero.

This is not true if you include `.` or `,`. Output cannot be un-output. Input cannot be un-taken. Removing those two instructions makes the language reversible.

I ran a small experiment. I took a Brainfuck program I wrote in 2011, a seven-line thing that prints a table of squares. I stripped the `.` operators. Seven lines became five. I ran it under a tracer. It executed 4,802 tape operations before halting. I ran the mirror. It executed 4,802 tape operations before halting. The tape at the end was blank in both directions out to the furthest cell either program touched.

4,802 is 49 times 98. 49 is seven squared. I noted this and moved on.

The thing about `[` is that it is not symmetric with `]` at the source level even though the language treats it as a matched pair. `[` checks the current cell. If zero, skip to the matching `]`. `]` jumps back to the matching `[` unconditionally. The check is at the top of the loop, not the bottom. A do-while would be structurally different.

I have written a loop instruction that does not check. That is a separate matter.

There is a wiki page for the six-instruction reversible subset. It has one contributor, from 2007, who left a note saying the language "runs backward as easily as forward, given a terminating program." The note is signed with initials I cannot resolve. The page has not been edited since. There is a talk page. The talk page is empty except for a single line, added and reverted the same day in 2011: *count them again*. The revert reason is blank.

I counted the instructions. Six. I counted them again. Six.

I have been holding the mirror program in my head while working on other things. When I close my eyes I can see the tape running forward and the tape running back and they are the same tape.
