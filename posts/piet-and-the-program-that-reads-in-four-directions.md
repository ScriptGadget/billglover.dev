# piet and the program that reads in four directions

Piet is a stack-based esolang written as bitmap images. The program is a grid of colored blocks. There are 20 colors: 18 chromatic (six hues x three brightnesses), plus white and black. The interpreter moves across the blocks in a direction, reads the color transition as an instruction, and executes. When it hits a black block or the edge, it rotates the direction pointer and the codel chooser and tries again. If it has tried all four directions and all two choosers (eight tries total), it halts.

So: the program flows in a direction, but the direction is not fixed. The grid is read according to the interpreter's state. Rotate the pointer, rotate the read.

I spent an evening on a Piet program called `rotate.png`, uploaded to the esolangs wiki image archive in 2010 by a user with three edits, all to Piet-adjacent pages. The user is seven characters. The account is empty now, no edits visible in the public log, but the image file is still hosted.

The program is 7 by 7 codels.

I ran it. It prints nothing. It halts cleanly on the eighth rotation attempt. No output.

Then I noticed the file is listed in the archive index twice, with two different sha1 hashes. The thumbnails render identically. The pixel grids are identical under direct comparison. The hashes differ.

I downloaded both. The second copy has one pixel in the bottom-right 7x7 region that is light red where the first copy has light magenta. In Piet, light red to light magenta is a `push` with value 1, read in one direction. Read in the opposite direction it is a `pop`. Which instruction executes depends on which way the pointer was moving when it crossed that transition.

I ran the second copy. It prints 49 bytes.

I did not expect that. I checked the output against what I already have. It is not the same 49 bytes. It is a different 49 bytes. The byte at position 25 is 0x1B.

I arranged it as a 7x7 grid and looked at the diagonal. The main diagonal of this second grid is identical to the anti-diagonal of the first grid I have been carrying around since July. One flipped against the other.

I tried running the second copy with the direction pointer initialized to each of the four cardinal directions in turn. Four runs. Four outputs. Each 49 bytes. Each with 0x1B at position 25. The four outputs read, when stacked, as a 4x49 block whose columns have the following property: every column contains the four bytes in a fixed cyclic order. The cycle differs by column. There are seven distinct cycles across the 49 columns. Count them again and there are still seven.

The wiki page for Piet has a section on nonstandard interpreters. The "rotate" interpreter is listed there, linked to a dead sourceforge page. The Wayback Machine has one capture, March 2009. The capture shows a README that begins:

> rotate.c reads a Piet program in four directions and emits the union of outputs. use when you want to see what the image says from every side.

Author line: K., Kraków.

The README has a footnote marker in the text, a superscript 7, with no corresponding footnote at the bottom. The footnote is not there. The space where the footnote would be is blank.

The sourceforge tarball is gone. The Wayback capture does not preserve binaries. There is no archive of the interpreter itself. I wrote my own version this week, following the README's two paragraphs of specification. Mine produces the four outputs I described. I cannot verify it matches the original.

On the Piet examples page, under "programs by the community," rotate.png is listed with the description:

> prints nothing until you turn it.

No author. The edit that added the line is from March 14, 2009.

I watched Peter Dickinson's book slide off the shelf when I pulled down my copy of the Piet specification. The Dickinson was on top. It is back on the shelf now, next to the spec, not where it was before.
