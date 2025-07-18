# 🗓️ 2025-07-17 TIL 15일차

## ✅ 오늘의 성취 (잘한 점)

- 집중력 있게 공부하는 것~~
- 하하 that's it..

---

## 📚 오늘의 학습 (배운 점)

### 🔹 핵심 주제

- 자바스크립트 이벤트 처리 방식과 이벤트 객체 이해
- addEventListener, removeEventListener 사용법 및 차이점
- 이벤트 버블링과 캡처링 단계, 이벤트 위임(event delegation) 원리
- 브라우저 기본 동작 제어 방법 (preventDefault)
- 다양한 이벤트 타입별 특징 (마우스, 키보드, 포커스, 입력, 스크롤 등)
- 이벤트 핸들러 등록 시 함수 참조 방식과 익명 함수 차이
- for...in, for...of 반복문의 차이와 이벤트 핸들러 적용 시 주의점

### 🔹 주요 개념 정리

- **이벤트 핸들러 등록 (addEventListener)와 해제 (removeEventListener)**

  - addEventListener는 이벤트 타입과 핸들러 함수가 필요하며, removeEventListener는 등록했던 동일 함수 참조가 반드시 필요함
  - 익명 함수는 removeEventListener에 사용할 수 없고 반드시 함수 이름이나 참조를 전달해야 함
  - 이벤트 핸들러로 화살표 함수 등록 시 주의, 즉시 실행문이 아님

- **이벤트 객체 (Event Object)**

  - 이벤트 발생 시 브라우저가 생성하여 이벤트 핸들러에 전달하는 객체
  - 주요 프로퍼티: type, target, currentTarget, timeStamp, bubbles 등
  - 마우스 이벤트 프로퍼티: button, clientX/Y, pageX/Y, offsetX/Y, screenX/Y, altKey, ctrlKey, shiftKey, metaKey
  - 키보드 이벤트 프로퍼티: key, code, altKey, ctrlKey, shiftKey, metaKey

- **이벤트 버블링과 캡처링**

  - 버블링: 이벤트가 발생한 요소에서 상위 요소로 전파됨
  - 캡처링: 이벤트가 최상위(window)부터 타깃 요소까지 내려가는 전파 단계
  - e.stopPropagation()으로 버블링 중단 가능

- **이벤트 위임 (Event Delegation)**

  - 부모 요소에 이벤트 리스너를 등록해 자식 요소의 이벤트를 관리하는 효율적 방법
  - event.target을 통해 실제 이벤트 발생 요소를 식별하여 처리

- **브라우저 기본 동작 제어**

  - event.preventDefault()로 기본 동작 차단 가능
  - 링크 이동, 폼 제출, 체크박스 등 기본 동작 제한에 사용
  - 반드시 필요한 경우에만 신중히 사용 권장

- **반복문 차이**

  - for...in: 객체의 키(프로퍼티) 순회, 배열에는 비권장
  - for...of: 배열 요소 자체 순회, 배열 순회 시 권장
  - for...in 사용 시 이벤트 핸들러 등록 문제 발생 가능성 있음

- **각종 이벤트 타입 및 사용법**
  - 마우스 이벤트: click, dblclick, mouseover, mouseout, mouseenter, mouseleave 등
  - 키보드 이벤트: keydown, keypress(권장하지 않음), keyup
  - 포커스 이벤트: focus, blur, focusin, focusout (버블링 유무 차이)
  - 입력 이벤트: input, change
  - 스크롤 및 윈도우 이벤트: scroll, resize

### 🔹 예제 코드

```js
// 이벤트 핸들러 등록 예시
function clickHandler(e) {
  console.log("클릭한 요소:", e.target);
}

const btn = document.querySelector("button");

// addEventListener 등록
btn.addEventListener("click", clickHandler);

// removeEventListener 등록 해제
btn.removeEventListener("click", clickHandler);

// 이벤트 위임 예시
const list = document.querySelector("ul");

list.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("done");
  }
});
```

<details>
<summary style="font-size: 22px;">📓 메모장</summary>

# Interactive JS

## Event

### Event Handler

- js 프로퍼티를 활용한 이벤트(ex. onClick)는 중요한 이벤트를 덮어쓸 수 있으며, 여러 개의 이벤트 핸들러를 다룰 수 없음.

- 이벤트별 리턴 값이 있을 때 해당 값을 모두 다뤄야 하므로 복잡함.

- 따라서 `addEventListener`와 `removeEventListener` 사용 권장.

- 사용법

  ```js
  요소.addEventListener(이벤트_타입, 이벤트_핸들러);
  요소.removeEventListener(이벤트_타입, 이벤트_핸들러);
  ```

- removeEventListener 호출 시, 등록할 때 사용했던 핸들러를 반드시 동일하게 전달해야 함.

- `function() {}` 형태의 익명 함수는 removeEventListener에 전달 불가.

- 이벤트 핸들러에 화살표 함수 `() => {}` 형태 전달 시 등록되지 않음. 이는 즉시 실행문이며, 반환값이 없으면 `undefined` 반환.

#### 퀴즈

- removeEventListener 메소드는 addEventListener로 등록된 동일한 타입과 핸들러 함수일 때만 삭제 가능함.
- addEventListener와 removeEventListener에 사용된 핸들러 함수가 모양이 같아도 각각 임시로 작성된 다른 함수이므로 동일하지 않음.
- addEventListener 안에서는 함수 선언 가능하나, removeEventListener는 대상 함수가 분명해야 함.

### Event Object

- 이벤트 발생 시 브라우저가 자동으로 이벤트 객체 생성 후 이벤트 핸들러 첫 번째 인자로 전달.

- 주요 프로퍼티:

  | 프로퍼티      | 설명                                          |
  | ------------- | --------------------------------------------- |
  | type          | 발생한 이벤트의 타입 ('click', 'keydown' 등)  |
  | target        | 이벤트가 발생한 DOM 요소                      |
  | currentTarget | 이벤트 핸들러가 등록된 요소                   |
  | timeStamp     | 이벤트 발생 시각 (페이지 로드 후 경과 밀리초) |
  | bubbles       | 버블링 단계 여부 판단 값                      |

- 마우스 이벤트 프로퍼티:

  | 프로퍼티                           | 설명                                         |
  | ---------------------------------- | -------------------------------------------- |
  | button                             | 누른 마우스 버튼 (0: 왼쪽, 1: 휠, 2: 오른쪽) |
  | clientX/Y                          | 브라우저 표시 영역 내 마우스 위치            |
  | pageX/Y                            | 문서 영역 내 마우스 위치                     |
  | offsetX/Y                          | 이벤트 발생 요소 내 마우스 위치              |
  | screenX/Y                          | 모니터 화면 내 마우스 위치                   |
  | altKey, ctrlKey, shiftKey, metaKey | 이벤트 시 누른 보조키 상태                   |

- 키보드 이벤트 프로퍼티:

  | 프로퍼티                           | 설명             |
  | ---------------------------------- | ---------------- |
  | key                                | 누른 키 값       |
  | code                               | 키의 물리적 위치 |
  | altKey, ctrlKey, shiftKey, metaKey | 보조키 상태      |

#### 실습

- `items[event.currentTarget].classList.toggle('done')`

  - `items`는 부모 요소(`todoList.children`)의 모든 자식 요소를 배열로 저장한 것.
  - `event.currentTarget`은 숫자 인덱스가 아님.
  - 단순히 `event.currentTarget.classList.toggle('done')` 사용 가능.

- for...in 반복문 문제점

  - for...in은 객체 순회용이며, length, entries, keys 등 프로퍼티까지 순회하므로 예상치 못한 값도 포함될 수 있음.
  - 따라서 배열 순회 시에는 for...of 사용 권장.

- for...in과 for...of 차이

  - for...in은 키를 반환함.
  - for...of는 값을 반환함.

- for...in 사용 시 removeEventListener가 제대로 동작하지 않는 문제 발생 가능성 있음.

  - 배열은 숫자 인덱스 기반 객체이므로 for...in으로도 작동할 수 있으나, 브라우저가 내부적으로 다르게 처리하여 참조가 달라질 수 있음.

### Event Bubbling

- 이벤트 발생 시, 동일 타입 이벤트는 부모 요소까지 전파됨.

- `e.target`은 최초 이벤트 발생 요소로 버블링하지 않음.

- `e.currentTarget`은 이벤트 핸들러가 등록된 요소.

- `e.stopPropagation()`으로 버블링 중단 가능.

- 버블링 회피 권장, 이벤트 발생 범위를 제한하는 것이 바람직함.

### Event Capturing

- 이벤트 전파 과정

  1. 캡처링 단계: 최상위 요소부터 하위 요소로 이벤트 전파
  2. 타깃 단계: 실제 이벤트 대상 요소에 전달
  3. 버블링 단계: 하위 요소부터 상위 요소로 이벤트 전파

- `요소.addEventListener('click', 함수, true)`로 캡처링 단계 이벤트 핸들러 등록 가능.

#### 실습

- `<div id="main">`에도 이벤트 핸들러 등록 시 해당 핸들러도 동작함.

### Event 위임 (Event Delegation)

- 다수 자식 요소 각각에 이벤트 핸들러를 등록하는 대신, 부모 요소에 하나의 이벤트 핸들러 등록으로 관리 가능.

- 예시 코드

  ```js
  // 각 자식에 이벤트 핸들러 등록한 코드
  for (let item of list.children) {
    item.addEventListener("click", function (e) {
      e.target.classList.toggle("done");
    });
  }

  // 이벤트 위임으로 부모에 이벤트 핸들러 등록한 코드
  list.addEventListener("click", function (e) {
    e.target.classList.toggle("done");
  });
  ```

- 단, 클릭한 요소가 li가 아닐 경우 의도치 않은 동작 가능하므로 태그명이나 클래스명 검사 필요.

  ```js
  list.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("done");
    }
  });

  // 또는

  list.addEventListener("click", function (e) {
    if (e.target.classList.contains("item")) {
      e.target.classList.toggle("done");
    }
  });
  ```

#### 실습 정리

- 부모에 이벤트 핸들러를 붙이고 자식 이벤트를 처리하는 이유는 브라우저 버블링 구조 때문임.
- 클릭된 실제 요소는 `event.target`으로 구분하여 처리.

### 브라우저 기본 동작

- `event.preventDefault()`로 브라우저의 기본 동작을 제한 가능함.
- 예) 링크 요소 클릭 시 이동 방지, 체크박스의 텍스트 입력 제한 등.
- 꼭 필요한 경우에만 신중히 사용 권장.

#### 퀴즈

- `preventDefault()`는 이벤트 객체(event)의 메서드이며, 이벤트 발생 대상 요소의 메서드는 아님.

## 다양한 Event

### Mouse Button Event

- 하나의 동작에 여러 이벤트 발생 가능 (예: 더블클릭)
- 이벤트 종류: mousedown, mouseup, click, dblclick 등
- 마우스 클릭 버튼 정보는 `e.button`으로 확인 가능.
- 이벤트 발생 순서는 운영체제별 차이 존재 가능.

#### 실습

- `e.target`은 이벤트 발생한 해당 요소임.
- 마우스 클릭 위치에 따른 속성은 `button`임.
- 클래스 속성 추가 시 `classList.add()` 사용.

### Mouse Movement Event

| 이벤트 타입 | 설명                                                 |
| ----------- | ---------------------------------------------------- |
| mousedown   | 마우스 버튼 누르는 순간                              |
| mouseup     | 마우스 버튼 누른 후 뗀 순간                          |
| click       | 왼쪽 버튼 클릭 순간                                  |
| dblclick    | 왼쪽 버튼 빠르게 두 번 클릭 순간                     |
| contextmenu | 오른쪽 버튼 클릭 순간                                |
| mousemove   | 마우스 움직이는 순간                                 |
| mouseover   | 마우스 포인터가 요소 위로 올라온 순간                |
| mouseout    | 마우스 포인터가 요소에서 벗어나는 순간               |
| mouseenter  | 마우스 포인터가 요소 위로 올라온 순간 (버블링 없음)  |
| mouseleave  | 마우스 포인터가 요소에서 벗어나는 순간 (버블링 없음) |

- 위치 관련 프로퍼티: clientX/Y, pageX/Y, offsetX/Y

- `mouseenter`/`mouseleave`는 자식 요소 영역 계산에서 제외됨.

  - 자식 요소까지 감지하려면 `mouseover`/`mouseout` 사용

#### 실습

- `data-*` 속성은 `e.target.dataset.속성명`으로 접근 가능
- `classList.add()`는 반환값 없음
- `target.removeChild()`는 인자 필요함
- `e.target.dataset.title`은 속성값 반환
- `classList.contains()`로 클래스 존재 여부 확인 가능

### Keyboard Event

| 이벤트 타입 | 설명                                                       |
| ----------- | ---------------------------------------------------------- |
| keydown     | 키보드 버튼 누르는 순간                                    |
| keypress    | 출력 가능한 키에서만 발생 (Shift, Esc 등 제외) - 권장 안함 |
| keyup       | 키보드 버튼 떼는 순간                                      |

- `keydown`은 키를 계속 누르면 연속 발생, `keypress`는 최초 한번만 발생
- 한글 및 특수문자 조합에는 `keypress` 반응하지 않음
- 권장 이벤트: `keydown`

#### Keyboard Event Property

- `event.key` : 누른 키 값
- `event.code` : 키 물리적 위치
- `event.shiftKey` : Shift 키 눌림 여부(boolean)

#### 실습

- 엔터키 눌렀을 때 기본 줄바꿈과 전송 모두 발생하므로 `event.preventDefault()` 필요
- Shift + 엔터는 줄바꿈 처리
- 한글 조합 완료 여부에 따라 문자가 중복 출력될 수도 있음

### Focus Event

- `focus`와 `blur`는 버블링이 일어나지 않아 이벤트 위임 불가

### Input Tag Event

| 이벤트 타입 | 설명                              |
| ----------- | --------------------------------- |
| focusin     | 요소에 포커스 될 때               |
| focusout    | 포커스 빠져나갈 때                |
| focus       | 요소에 포커스 될 때 (버블링 없음) |
| blur        | 포커스 빠져나갈 때 (버블링 없음)  |
| input       | 사용자가 입력하는 순간            |
| change      | 요소 값이 변하는 순간             |

- `input`은 Enter, Shift에는 반응하지 않음
- `change`는 focusout 직전에 발생하며, 값이 변했을 때만 발생
- Enter 입력 시에도 `change` 이벤트 발생하지만 포커스는 유지됨

#### 실습

- 배열을 유사 배열에서 진짜 배열로 변환 시 `Array.from` 사용
- 배열 순회 후 조건에 따라 요소 삭제 가능
- 사용자 정의 `data-*` 속성 활용해 요소 선택 및 삭제 가능

### Scroll Event

- `scroll` 이벤트는 스크롤 바 움직임에 반응하며, 주로 `window` 객체에 이벤트 리스너 등록
- `scrollY` 프로퍼티로 수직 스크롤 위치 확인 가능

### Window Event

| 이벤트 타입 | 설명                     |
| ----------- | ------------------------ |
| resize      | 윈도우 크기 변경 시 발생 |

### 이벤트 객체 추가 프로퍼티

- `e.isComposing`: 한글 입력 중(IMR 조합 상태) 여부

<강의>  
map, filter, reduce (데이터 바인딩 관련)
AWS 학습 후 국가 데이터 전환 관련 업무 희망

</details>

---

## 🧠 오늘의 개선 (어렵거나 아쉬웠던 점)

- 진짜 JS를 처음 공부해본 것 같다.. 너무 어렵다!!!
- 이번 강의정리는 꾸준히 키면서 자주 봐야겠다 정말 어렵다.

---

## 🚀 내일의 계획

- Modern JS 완강!
- 위클리페이퍼 준비
- GIT 시험공부~~

---
