# proto-elamite M-388 and the wrong sign in the middle

M-388 is one of the sixteen. I have been working through the published photographs on CDLI, which has eleven of the monuments at usable resolution. M-388 is one of the eleven.

The inscription runs in four columns. Dahl's 2012 reading gives 71 signs. I counted 72. I counted again and got 71. I counted a third time and got 72. The sign I keep adding and dropping is at position 36. Position 36 is the midpoint of the inscription if the count is 71. It is one short of the midpoint if the count is 72.

The sign at position 36 is not in Dahl's sign list. It is not in Meriggi's. It is a short vertical stroke with a dot to its upper left. The dot is small. On a bad scan it reads as a chip in the clay.

It is not a chip. The dot appears on the three published photographs taken under different lighting between 1994 and 2017. A chip would cast a shadow that moved. The dot does not move.

Dahl's transliteration skips from position 35 to position 37 without comment. The sign numbering is continuous. The sign count is 71. The missing sign is not marked as damaged, unclear, or omitted. It is not marked.

I checked the three other monuments in the sixteen that have published high-resolution imaging of their central zones. M-217 and M-104 I have written about. The third is M-388. On M-217 and M-104 the mark runs down the center column. On M-388 it sits once, at the exact middle, if the count is odd.

If the count is even, it sits one step to the left of the middle.

---

The CDLI entry for M-388 gives the find location as Susa, Acropole, trench 7, 1909 season. The field notebook for trench 7 is held at the Louvre. Scheil's 1905 preliminary report mentions the trench. The 1909 notebook is listed in the Louvre's internal catalogue as inventoried but not currently available for consultation. The reason given is "en cours de traitement." The date of the status change is March 2009.

I wrote to ask when consultation might resume. The reply gave no date.

---

I pulled the Toadskin output grid again and checked position 25, which I know, and position 24, which I had not looked at closely. Position 25 is 0x1B. Position 24 is 0x4B. 0x4B is the letter K.

Count from position 1, left to right, top to bottom. 24 is one short of center if you count the grid as 49. 25 is center.

I ran the count a different way. Column by column instead of row by row. Position 25 becomes 0x07. Position 24 becomes 0x4B still, because 24 is the fourth row of column four under either ordering only by coincidence of the grid being square.

I wrote that sentence out and then checked it. It is wrong. Column-major and row-major give the same cell only on the diagonal. Position 24 is not on the diagonal. I recounted. Row-major position 24 is row 4, column 3. Column-major position 24 is row 3, column 4. Both cells happen to hold 0x4B.

The grid has a reflection I had not noticed. Row 4 column 3 and row 3 column 4 are mirror images across the main diagonal. They hold the same byte. I checked the other off-diagonal pairs. They all do.

The grid is symmetric across the main diagonal. I had checked the mirror symmetries across the vertical and horizontal axes and the four-corner-plus-center pattern. I had not checked the diagonal.

Count them again.
