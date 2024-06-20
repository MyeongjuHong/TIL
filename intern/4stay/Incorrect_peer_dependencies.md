Changing webpacker to shakapacker is not applying
===

### Reason
Explicit files changed with git pull, but other config files or env var in local must be updated with package manager.

### Solution
`yarn install`

***

### Reference

[Incorrect peer dependencies](https://github.com/shakacode/shakapacker/blob/main/docs/troubleshooting.md#incorrect-peer-dependencies)
<details>
<summary>ChatGPT</summary>
일반적으로 `yarn install`을 실행하면 프로젝트의 종속성을 설치하고 설정을 초기화하는 과정이 포함됩니다. 이 과정에서 다양한 설정 파일이나 환경 변수가 업데이트되거나 초기화될 수 있습니다. 예를 들어, 새로운 패키지가 설치될 때 설정 파일이 갱신되거나, 패키지 매니저가 프로젝트의 환경 변수를 정리하거나 수정할 수 있습니다.

따라서 `yarn install`을 실행하면 프로젝트의 환경 설정에 필요한 변경 사항이 반영될 수 있습니다. 이 경우, `shakapacker` 경로 설정이 초기화되어 적용되었을 가능성이 있습니다. yarn이나 npm 패키지 매니저를 통해 종속성을 관리할 때는 이러한 초기화나 업데이트 과정이 자주 발생할 수 있으므로, 문제 해결에 도움이 될 수 있습니다.
</details>