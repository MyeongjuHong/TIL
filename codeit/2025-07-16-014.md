# 🗓️ 2025-07-16 TIL 14일차

## ✅ 오늘의 성취 (잘한 점)

- PR 완..! 하하하하
- 잔디밟기 push 해놓은거!!

---

## 📚 오늘의 학습 (배운 점)

### 🔹 핵심 주제

- JavaScript에서 HTML 요소를 선택하는 다양한 방식
- 이벤트 핸들러 및 이벤트 프로퍼티의 개념
- DOM(Document Object Model)의 구조와 조작 방법
- window 및 document 객체의 이해와 활용
- 비표준 속성 처리 및 스타일링 방식

### 🔹 주요 개념 정리

- `document.getElementById`, `getElementsByClassName`, `querySelector` 등 DOM 요소 선택 방식의 차이점과 반환 타입
- 유사 배열 객체(HTMLCollection, NodeList)의 개념과 특징
- 이벤트 핸들러와 프로퍼티의 차이 및 등록 방식 (`onclick`, `addEventListener`)
- `console.log()`와 `console.dir()`의 차이
- DOM 트리에서 노드 탐색 및 요소 조작 프로퍼티
- HTML 속성과 DOM 프로퍼티의 관계 및 구분 (`value`, `getAttribute`, `setAttribute`)
- 클래스 조작 방법: `className`, `classList.add/remove/toggle`
- 비표준 속성과 `data-*` 속성, `dataset` 프로퍼티 사용법

### 🔹 예제 코드

```javascript
// 요소 생성 및 추가
let li = document.createElement("li");
li.textContent = text;
document.querySelector("#to-do-list").append(li);

// 클래스 스타일링 적용 예시
const item = document.querySelector("#to-do-list").children[1];
item.classList.add("done");

// data-* 속성을 활용한 바인딩
const fields = document.querySelectorAll("[field]");
const task = {
  title: "코드 에디터 개발",
  manager: "CastleRing, Raccoon Lee",
  status: "",
};
for (let tag of fields) {
  const field = tag.getAttribute("field");
  tag.textContent = task[field];
}

// 버튼 클릭 시 상태 변경
const btns = document.querySelectorAll(".btn");
for (let btn of btns) {
  const status = btn.getAttribute("status");
  btn.onclick = function () {
    fields[2].textContent = status;
    fields[2].setAttribute("status", status);
  };
}
```

<details>
<summary style="font-size: 22px;">📓 메모장</summary>

- `getElementById('id')`: 존재하지 않는 태그를 선택하면 `undefined`가 아닌 `null`을 반환함

- `getElementsByClassName('class')`: 유사배열(HTMLCollection)을 반환하며, 배열처럼 보이지만 실제 배열은 아님

  - `length` 프로퍼티는 존재하지만 배열 메서드(`forEach`, `map`, `push`)는 사용할 수 없음
  - `Array.isArray()` → `false`
  - 메모리/성능 최적화 및 구조 단순화를 위해 사용됨
  - 일부 유사배열은 `for-of`도 불가

- 유사 배열 등장 사례:

  - `arguments`, `NodeList`, `HTMLCollection`, `String`
  - 깊이 상관없이 위에서부터 차례대로 저장됨

- `querySelector()`: CSS 선택자로 태그를 선택, 가장 첫 번째 요소만 반환함

- `querySelectorAll()`: `NodeList`라는 유사배열을 반환함

- `NodeList vs HTMLCollection`:

  - `NodeList`는 정적(querySelectorAll), 동적(childNodes) 모두 가능
  - `HTMLCollection`은 항상 동적
  - 배열 변환: `Array.from()` 또는 spread (`[...list]`)
  - `NodeList`는 `forEach` 사용 가능
  - 텍스트/주석 포함 필요 시 `childNodes` 사용

- `getElementsByTagName()`: 유사배열 반환

#### 이벤트

- 이벤트 핸들링: 이벤트 발생 시 특정 동작을 실행

- 이벤트 핸들러 = 이벤트 리스너: 동작을 코드로 표현한 함수

- JS에서는 `element.onclick = function() {}` 방식으로 등록 가능

- 속성 vs 프로퍼티:

  - HTML 속성은 문자열만 가능, DOM 프로퍼티는 다양한 타입 가능
  - 초기에는 동기화되지만 이후에는 독립적으로 변경될 수 있음

- 코딩테스트 예시:

  ```html
  <button onclick="document.querySelector('button').onclick()">...</button>
  ```

  ```js
  document.querySelector("button").onclick = function () {
    alert("hi");
  };
  ```

- `onclick`은 함수 실행문이 아닌 함수 자체를 할당해야 함

| 메서드                 | 반환 자료형           | 배열 여부 | 상세 설명          |
| ---------------------- | --------------------- | --------- | ------------------ |
| getElementById         | HTMLElement 또는 null | ❌        | 단일 DOM 요소 반환 |
| getElementsByClassName | HTMLCollection        | ❌        | 실시간 유사배열    |
| querySelector          | Element 또는 null     | ❌        | 첫 번째 DOM 요소   |
| querySelectorAll       | NodeList              | ❌        | 정적 유사배열      |

#### 브라우저 객체 모델 (BOM)

- `window`는 전역 객체이며 생략 가능
- 주요 속성:

  - `document`, `location`, `alert`, `setTimeout`, `innerWidth`, `addEventListener`, `localStorage` 등

#### DOM

- `console.log()` vs `console.dir()`

  - log: HTML 요소 → 태그 형태 출력
  - dir: HTML 요소 → 객체 구조로 출력

- DOM 트리:

  ```text
  document
    └── html
        ├── head
        └── body
            └── h1, h2, script ...
  ```

- 노드 탐색:

  - `children`, `firstElementChild`, `lastElementChild`, `parentElement`, `previousElementSibling`, `nextElementSibling`

#### 요소 노드 속성

- `innerHTML`: 요소 내부 HTML 문자열
- `outerHTML`: 요소 전체 HTML 문자열
- `textContent`: 텍스트만 반환 (보안상 안전)

#### 요소 조작 메서드

- `createElement()`, `textContent = '...'`
- `append()`, `prepend()`, `before()`, `after()`
- `remove()`

#### HTML 속성 vs DOM 프로퍼티

- DOM 프로퍼티: `input.value`
- HTML 속성: `input.getAttribute('value')`
- 사용자 정의 속성은 DOM 프로퍼티로 자동 등록되지 않음 → `getAttribute()` 필수

#### 스타일 속성 조작

- 직접 조작 시:

  ```js
  item.style.opacity = "0.5";
  item.style.textDecoration = "line-through";
  ```

- className 전체 변경 vs classList 메서드 활용 권장:

  ```js
  item.classList.add("done");
  ```

#### 비표준 속성

- `querySelector('[속성명]')` 으로 선택

- `getAttribute`, `setAttribute`로 데이터 바인딩

- `data-*` 속성 사용 시:

  - 접근: `element.dataset.속성이름`
  - 추천 방식으로, 향후 표준 충돌 방지

</details>

---

## 🧠 오늘의 개선 (어렵거나 아쉬웠던 점)

- PR에서 실수가 있었던 부분? 그냥 대충 closed하고 다시 PR 날렸는데 더 좋은 방법이 있지 않았을까 하는 아쉬움이 남는다
- 하루차씩 밀리는 것 같은데 도저히 하루를 뺄 날이 없다.. 어쩌지ㅠ

---

## 🚀 내일의 계획

- Interactive JS 완강
- Modern JS 수강

---
