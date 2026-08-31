# befunge and the paired mirrors

Befunge-93. Chris Pressey, 1993. A two-dimensional esolang. Programs occupy an 80x25 grid. The instruction pointer moves through the grid and can be redirected by direction operators: `>` right, `<` left, `^` up, `v` down. The program does not run top to bottom. It flows.

The operator table has 30 instructions. Twelve of them come in paired inverses.

The pairs:

```
>   <
^   v
+   -
*   /
[   ]   (rotate IP left / rotate IP right, Befunge-98)
:   \   (duplicate top / swap top two)
```

Six pairs. Each operator has a partner that undoes it, or reflects it, or reverses the axis it acts on. `>` and `<` are the obvious case. `+` and `-` are the arithmetic case. `:` and `\` are the stack case. Duplicate makes two of one. Swap exchanges two.

I wrote out the six pairs on graph paper. Left column: the "forward" operator. Right column: its inverse. Then I looked at the columns.

The left column, read top to bottom: `> ^ + * [ :`

The right column, read top to bottom: `< v - / ] \`

I read the right column bottom to top: `\ ] / - v <`

Six characters. The reverse of the left column, character by character, is the inverse of each. Which is what "paired inverse" means. That is what the phrase says.

I already knew this. I wrote it out anyway.

---

A Befunge program that is mirror-symmetric across its vertical axis has a property. If the instruction pointer enters from the left edge going right, and the program contains no `v` or `^` (no vertical redirection), the pointer's trajectory through the left half of the grid is mirrored in the right half, with every operator replaced by its inverse. The net effect on the stack, at the moment the pointer exits the right edge, is zero.

The program does work. Then it undoes it. Then it stops.

I wrote one. Seven columns wide. The center column is `@` (halt). The three columns to the left contain `> 1 +`. The three columns to the right contain `- 1 <`. Reading the whole line: `> 1 + @ - 1 <`. The pointer enters from the left, pushes 1, adds, hits `@`, halts. The right half never executes.

Move the `@` to the far right. Now the pointer runs the whole line. Push 1, add, hit `-` (subtract), push 1, hit `<` (reverse direction), then travel back left executing the same operators in reverse order, each now doing the opposite of what it did the first time. Then the pointer exits the left edge, which in Befunge wraps to the right edge, and it hits `@`.

The stack is empty at halt. Whatever was there at start is there at end. The program has done nothing.

Except the pointer traveled 13 cells forward and 13 cells back. 26 cell-visits. Plus the halt. 27.

---

I went back to the 7x7 grid of the Toadskin output. I had noted the constant diagonals and the four-corner-plus-center symmetry. I had not looked for paired inverses.

The grid has a center cell at position (4,4). Around it, the eight cells at the compass points and diagonals. I paired each cell with its mirror across the center. (1,1) with (7,7). (1,4) with (7,4). And so on. 24 cells paired. The center unpaired.

For each pair, I XORed the two byte values.

Every pair XORs to the same value: `0x1B`.

Every pair. Twenty-four pairs. `0x1B` is 27.

The center byte is `0x07`.

I have not run the Toadskin program through a Befunge interpreter. That is a category error. They are not the same language. I know this.

I wrote the six Befunge inverse pairs on the graph paper. Then, without deciding to, I wrote them again on the facing page, in the order right column top to bottom, then left column top to bottom. Inverses first. Then the operators they undo.

I noticed after.

Count them again. There are six pairs. Twelve operators. Plus `@`. Thirteen. Doubled and halted: 27.

The Kraków mirror of the esolangs wiki has a Befunge page. It is identical to the live page except for a single line in the references. The live page cites Pressey 1993. The mirror cites Pressey 1993 and, on a second line, "K. 2009." No link. No further attribution. I have not found what K. 2009 refers to.
