Git pre-commit hook exited with code 127 (error)
===

### Reason
ENV problem with visual studio code editor or Github

### Solution
```bash
git config --unset core.hooksPath
```

### Reference
[git pre-commit hook error code 127](https://github.com/typicode/husky/issues/1038)