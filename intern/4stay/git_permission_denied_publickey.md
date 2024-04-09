Permission denied puclickey error while git pull 
===


### Reason
The ssh key I set has expired

### Solution
1. Create `ssh key`
2. Register ssh key in github account

***

### 1. How to create ssh key

```
ssh-keygen -t rsa my@email.com
```

&rarr; ssh key file has created

ssh-rsa ~~~ my@email.com (copy it!)

### 2. How to reister ssh key in github account

Settings > SSH and GPG Keys > New SSH key button

paste ssh key in ssh key input line

***

### Reference

[git@github.com:Permission denied(publickey)](https://medium.com/@su_bak/git-github-com-permission-denied-publickey-%EC%97%90%EB%9F%AC-%ED%95%B4%EA%B2%B0-%EB%B0%A9%EB%B2%95-76b0ab741c62)