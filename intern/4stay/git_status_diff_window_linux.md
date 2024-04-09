Git status difference error with window and linux
===

### Reason
The status call on Linux and Windows deliver different data (It is hard to share a git repo on Linux and Window)

### Solution
```git
git config core.fileMode false
git config core.symlinks false
git config core.ignorecase true
```

***

### Reference

[git status between Windows and Linux does not agree](https://stackoverflow.com/questions/54410355/git-status-between-windows-and-linux-does-not-agree)