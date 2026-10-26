# ouroboros and the diagonal read

Ouroboros is an esolang by Daniel Temkin, 2015. The program is a single string that must contain its own encoded form. Running it rewrites the string. The new string is the next program. There is no file. The source is the state.

I had not read the spec carefully. I did last week.

The instruction set is small. Eight operators. The ones that matter here:

- `>` move the read head right
- `<` move the read head left
- `+` increment the cell under the head
- `-` decrement
- `.` output the cell
- `,` input to the cell
- `[` `]` loop on the cell under the head

Standard Brainfuck-adjacent. The twist is the self-reference. The program is required to produce, as output, a string that is also a valid Ouroboros program. The simplest working programs are quines. The interesting ones are quines that drift. Each generation differs from the last by one or two cells. After seven generations the drift is large enough to see without diffing.

Temkin's example on the wiki runs clean for six generations and halts on the seventh. He notes this in a parenthetical. He does not explain why seven.

I ran it. It halts on the seventh.

I tried a variant. Fourteen cells instead of twelve. It halts on the seventh.

I tried another. Forty-nine cells. It halts on the seventh.

The halt is not a bug in Temkin's implementation. It is in the language definition. The read head wraps. On the seventh generation the wrap position lands on a cell that was zero at initialization and has never been written. The program checks that cell and halts.

The read order inside a generation is left to right. I had assumed this. The spec does not say so. The spec says the head begins at position 0 and moves according to the operators. It does not say which direction position 0 counts from.

I re-ran the fourteen-cell variant reading right to left. It did not halt on the seventh. It halted on the fourth and the output was the input reversed.

I ran it again on the diagonal. I mean: I laid the fourteen cells out as a 7x2 grid, read the main diagonal first, then the anti-diagonal, then wrapped. It produced seven generations and on the seventh the output was the input with the first and last cells swapped. The swap is a symmetry across the diagonal of a one-row grid, which is to say no symmetry at all, which is to say the output equals the input, which is to say it is a quine. I checked this twice.

Temkin's example, read on the diagonal, is a quine. Read left to right, it halts.

I wrote to Temkin through the contact link on his site. The link 404s. The page was last edited in March 2015.

The wiki page for Ouroboros has a talk section with one entry, from 2016, asking why Temkin picked seven generations as the demonstration length. The reply says: "count them again." No signature. The IP geolocates to a university netblock in Kraków.

I counted them again. Seven generations in the left-to-right read. Four in the right-to-left. Seven in the diagonal read where the seventh is identical to the first.

I have the fourteen-cell variant open in a buffer. The cells are:

```
+ > + + > + + + > + + + + > + + +
```

That is seventeen operators, not fourteen cells. I keep writing it wrong. I count the pluses: 1, 2, 2, 3, 4, 3. Six groups. The sixth group has three. The fourth has three. The second and the fifth both have two. The first has one. I do not know what the correct version is. I copied it from the wiki three days ago and the wiki page now shows a different sequence. The diff log shows no edit.

I am going to leave the buffer open and not touch it.
