# the toadskin output as hex

I ran the KALENDA program again last night. Same tarball, same interpreter, same 49 bytes. I wanted to look at it as a hex dump instead of the ASCII garbage I logged in 2012.

Here it is, `xxd` output, seven rows of seven bytes each padded to the tool's default width:

```
00000000: 07 1a 2c 07 1a 2c 07                     ..,..,.
00000007: 1a 2c 07 1a 2c 07 1a                     .,..,..
0000000e: 2c 07 1a 2c 07 1a 2c                     ,..,..,
00000015: 07 1a 2c 07 1a 2c 07                     ..,..,.
0000001c: 1a 2c 07 1a 2c 07 1a                     .,..,..
00000023: 2c 07 1a 2c 07 1a 2c                     ,..,..,
0000002a: 07 1a 2c 07 1a 2c 07                     ..,..,.
```

Three bytes cycling: `0x07`, `0x1a`, `0x2c`. BEL, SUB, comma. Sixteen instances of `0x07`, sixteen of `0x1a`, seventeen of `0x2c`. The cycle length does not divide 49 evenly. It runs 07-1a-2c sixteen times and then one extra `0x07` at the end. Except that is not what happens. Count the last byte again. It is `0x07`. Count the middle. Byte 24, zero-indexed, is `0x07`. The cycle is not 3. The cycle is 3 with a shift.

I wrote it out as a 7x7 grid, row-major:

```
07 1a 2c 07 1a 2c 07
1a 2c 07 1a 2c 07 1a
2c 07 1a 2c 07 1a 2c
07 1a 2c 07 1a 2c 07
1a 2c 07 1a 2c 07 1a
2c 07 1a 2c 07 1a 2c
07 1a 2c 07 1a 2c 07
```

The diagonals are constant. Top-left to bottom-right: all `0x07`. The anti-diagonal, top-right to bottom-left: also all `0x07`. Four corners `0x07`. Center cell (row 3, column 3, zero-indexed): `0x07`.

I read the rows left to right because that is how `xxd` prints them. There is no reason the output has to be read that way. It is a stream of bytes. It came out of a stack. The stack is LIFO. If I reverse the byte order I get the same grid rotated 180 degrees. Which is the same grid.

The garbage-file problem. Statistical tests would call this low entropy and move on. It is low entropy. That is not the same as random. It is not the same as meaningful either. It is a shape.

I checked the esolangs wiki page again. The KALENDA comment is still gone from the live page. The Wayback capture from 2009-03-15 still has it. "this produces correct output." No other edits from that account, ever.

The `0x07` byte is BEL. The terminal rings when you print it. I piped the output to `cat` and my laptop chimed seven times before I realized what was happening and killed it. There are sixteen `0x07` bytes in the output. It chimed seven times because I hit Ctrl-C. I ran it again and counted. Sixteen chimes. I had miscounted the first time.

Count them again. Sixteen.

Sixteen is also the Proto-Elamite monument count. I am writing this down because I am writing everything down. It is a multiple of eight and I do not know what to do with that.
