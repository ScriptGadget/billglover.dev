# toadskin and the loop that does not check

I wrote an esolang in 2011. It is called Toadskin. Stack-based. Six of Brainfuck's eight instructions kept as they were. Two modified to operate on the stack instead of a tape. Word definitions in the Forth style, `:name ... ;`. Single characters otherwise. I described it at the time as Brainfuck meets Forth, a fight ensues. That description is still on the wiki.

The reference interpreter is a tarball. 14 KB. I have not touched it since 2012.

It has a bug.

The bug is in `[`. The loop entry. In the normal case, `[` checks the top of the stack. If zero, jump past the matching `]`. If nonzero, enter the body. At `]`, return to `[` and check again.

The edge case: if the body produces exactly seven stack operations before reaching `]`, the interpreter does not re-check. It continues into the next iteration without consulting the stack. The loop does not terminate when the condition would have said to stop. It terminates when something else stops it. End of input. Stack underflow. Whatever comes first.

Six operations: fine. Eight: fine. Seven: the check is skipped.

I do not remember writing this. I have read the source. The conditional is structured so that the counter increments before the comparison rather than after, and the comparison uses `>` where it should use `>=`. Off by one, in a way that only matters at one value.

There is one program in the wiki's example section that triggers the case. Five lines. I did not put it there.

```
:f 0 1 + 1 + 1 + 1 + 1 + 1 + ;
:g [ f . ] ;
0 g
1 g
g
```

The comment under it reads: this produces correct output.

The contributor's username is KALENDA. The account has one edit, this one, made on 2009-03-14 and reverted by an admin the same day for lacking context. The Wayback Machine has the page from before the revert. I have the page from after. The revert removed the program. It did not remove the comment.

I ran it. The output is 49 bytes. Seven groups of seven. I expected the output to vary by machine, because the bug consults whatever happens to be on the stack when the check is skipped, and the stack at that point contains uninitialized values on some implementations. It does not vary. I ran it on my laptop, on a Raspberry Pi, on a VM with the locale set to Icelandic. Same 49 bytes.

I have the hex dump in a text file. I have not done anything with it.

The other thing I noticed, reading the source again: the loop counter variable is named `kal`. I do not remember naming it. I would not have named a counter that. I name counters `i` and `j` and occasionally `n`.

The tarball's mtime is 2012-07-02. I have a backup from 2011-11 on an external drive. The 2011 version has the same bug. The counter is named `i` in that one.

I have not opened the 2010 version. It is on a drive in a box I have not unpacked.
