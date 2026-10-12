# the toadskin output and position 25

Returning to the 49-byte output. The hex dump, laid out as a 7x7 grid, with row and column indices from 0:

```
     c0   c1   c2   c3   c4   c5   c6
r0   4B   07   0D   4B   07   0D   4B
r1   07   0D   4B   07   0D   4B   07
r2   0D   4B   07   0D   4B   07   0D
r3   4B   07   0D   1B   0D   07   4B
r4   0D   4B   07   0D   4B   07   0D
r5   07   0D   4B   07   0D   4B   07
r6   4B   07   0D   4B   07   0D   4B
```

Position (3,3) is 0x1B. Twenty-seven.

Every other cell sits on the three-byte cycle 4B, 07, 0D, shifted one place per row. The cycle is clean until the middle. At the center the byte is wrong. The three cells immediately after it on row 3 are also wrong, running 0D 07 4B instead of the expected 1B 4B 07. The row inverts around the center and resumes the cycle on the far side.

I counted bytes against the expected cycle. There are seven cells that break it. The center, and six around it on row 3 and column 3. The six form a cross through the center. Position 25 if you count row-major from 0 is the center.

I checked the raw tarball timestamp. June 2009. The reference interpreter has not changed. I ran the five-line program on a different machine, cold boot, no network. Same output. Same break at position 25.

The byte 0x1B is ESC in ASCII. It is also 27. The three bytes on the clean cycle sum to 4B + 07 + 0D = 0x5F. Underscore. I don't know what that means and I am not going to make it mean something.

I looked at the Vinča figurine notes again. Plovdiv 44b has seven marks on the left and seven mirrored on the right, with the bracket-with-dot sign at the center of the sequence. If you lay the fourteen marks out as a row and fold them, the fold point is between positions 6 and 7. On the Toadskin grid the fold point is position 25, which sits alone.

Count the breaks: six plus one. The one is at the center.

Mackay's footnote on C-17 said to count the signs again. I counted the grid again. Forty-nine. Seven that break the cycle. One of those seven is not like the other six.

I pulled the Wayback snapshot of the KALENDA edit from March 14, 2009. The edit added the five-line program and nothing else. The diff shows one line of whitespace at the end of the comment block that is not present in the live page's archived predecessor. I ran that trailing whitespace through wspace. It pushes a single value to the stack. 25.

I am going to leave the interpreter alone for a few days.
