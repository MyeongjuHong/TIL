# Express

### 환경 세팅

1. `npm install express`
2. `npm install --save-dev nodemon` &rArr; 코드 변경 감지해 자동으로 서버 재시작
3. `package.json` 파일에서 `'type': 'module',` 필드 설정

## Route 정의

route = 요청을 특정 주소와 http 메서드(get, post 등)에 매핑 (주소별 요청 처리 규칙)

| 구분     | Express 라우트        | React 라우트               |
| -------- | --------------------- | -------------------------- |
| 위치     | 서버                  | 클라이언트                 |
| 역할     | 요청 처리 → 응답 반환 | URL에 따라 컴포넌트 렌더링 |
| 규칙성   | 요청 처리 규칙        | 화면 연결(내부 상태)       |
| 네트워크 | 필요                  | 필요 없음 (SPA 내부에서만) |

웹 서버는 사용자가 URL로 요청을 보낼 때 각 요청에 맞는 응답 반환해야 함  
=> 어떤 주소로 들어온 요청에 어떤 일을 할지 결정하기 위해 라우트 사용

```js
import express from "express"; // exress 프레임워크를 모듈로 get

const app = express();
// express 앱 객체 생성 (서버 본체 생성)
// 서버 구성, 라우팅, 미들웨어 설정에 사용

app.method(path, handler); // 라우트 정의
// method: HTTP 메소드(get, post 등) 브라우저/클라이언트 요청시 사용
// path: 클라이언트가 요청할 URL
// handler: 요청 처리 및 응답 반환 함수

// 먼저 미들웨어 정의를 함

// ex
app.get("/some/path", (req, res) => {
  // 라우트(주소+메서드)에 대한 요청 처리기 등록
  // 서버로 get/som/path 리퀘스트가 들어오면 콜백함수 실행
  // http 메서드와 동일한 app 객체 메서드 사용 가능
  // req: 요청 정보 객체 (URL, 헤더, 바디 등)
  // res: 응답 반환 객체 (상태코드, 데이터, json 등)

  res.send("Hello, Express");
  // 클라이언트에 'Hello, Express' 응답
  // Express가 텍스트 인식해 Content-type로:text/html 응답 헤더 추가
  // 브라우저가 이걸 html 문서로 이해해 노드로 렌더링
  // app.listen은 node.js 코드 안에서 서버 여는 함수, node는 node.js 엔진을 실행하는 명령어
});

app.listen(3000, handler);
// 서버 실행 시작 명령어
// app 객체(서버의 본체)를 특정 포트에서 대기상태로 생성
// 서버가 성공적으로 켜지면 handler 실행 (보통 console.log 찍음)
// 라우트/미들웨어 설정 후에 포트 열고 대기 시작!!
```

## 리퀘스트 객체

### req.query

**쿼리스트링 파라미터**를 프로퍼티로 담고 있는 객체  
(파라미터는 항상 무자열)

```js
// GET /some/path?id=1&name=title
app.get("/some/path", (req, res) => {
  console.log(req.query); // { id: '1', name: 'title' }
});
```

### req.params

**URL 파라미터**를 프로퍼티로 담고 있는 객체  
(파라미터는 항상 문자열)

```js
app.get("/some/:id/path/:name", (req, res) => {
  console.log(req.params); // { id: '1', name: 'name' }
  // ...
});
```

### req.body

리퀘스트 바디 내용을 담고 있는 객체  
접근 시 express.json() 함수 사용

```js
// POST /some/path

/*{ // body 형식
  "field1": "value1",
  "field2": "value2"
}*/

app.use(express.json());
// use: 미들웨어(express.json(): 요청 body를 JSON으로 자동 파싱해주는 미들웨어)를 앱 레벨에서 등록하는 메서드
// 미들웨어: 서버에 도착한 요청과 클라이언트로 가는 응답 사이에서 처리, 변형, 검사 등을 수행하는 함수
// ㄴ 요청이 들어왔을 때 경로 상관없이 무조건 거치는 함수
// 등록 이유? 매 요청(라우트)마다 로그 기록, JSON 파싱, 인증 확인 해야하는데, app.use로 한번 등록하면 모든 요청을 자동으로 파싱->로그->인증 실행 (미들웨어 체인)
// 이 코드가 있어 앞으로 모든 요청은 자동으로 올 때 JSON 파싱이 될 것 => 각 라우트에서 req.body 바로 사용 가능

app.post("/some/path", (req, res) => {
  console.log(req.body); // 로그 찍기 { field1: 'value1', field2: 'value2' }
});
```

## 리스폰스 객체

### res.send()

리스폰스 전송 메서드  
인자값에 따라 Content-Type 헤더 설정 및 적절한 바디 내용으로 변환  
(문자열이면 `text/html`, 객체/배열이면 `application/json`)

```js
app.get('/some/path', (req, res) => {
  res.send({ field1: 'value1', field2: 'value2' });
}); //{ field1: 'value1', field2: 'value2' }를 JSON 형태로 응답

// 실제 HTTP 응답 모습
GET /some/path HTTP/1.1
Host: example.com

HTTP/1.1 200 OK // 상태 코드가 200, 요청 성공 (상태코드 지정 가능 + 400 등등의 에러코드 핸들링 안하면 다 200 OK로 간대ㄷㄷ)
Content-Type: application/json // 서버가 보낸 데이터 형식

{
  "field1": "value1",
  "field2": "value2"
} // 클라이언트가 실제로 받는 데이터


```

### res.status()

리스폰스의 상태 코드 설정

```js
app.get('/some/path', (req, res) => {
  res.status(404).send(...);
});
```

<details><summary>상태코드 예시</summary>

### 1️⃣ 400 Bad Request – 잘못된 요청

```js
app.post("/signup", (req, res) => {
  if (!req.body.username || !req.body.password) {
    // 필수 필드 없으면 400
    return res.status(400).send({ error: "username과 password가 필요합니다." });
  }
  res.send({ message: "회원가입 성공" });
});
```

---

### 2️⃣ 401 Unauthorized – 인증 실패

```js
app.get("/profile", (req, res) => {
  if (!req.headers.authorization) {
    // 로그인 안 한 상태
    return res.status(401).send({ error: "로그인이 필요합니다." });
  }
  res.send({ username: "Alice", email: "alice@example.com" });
});
```

---

### 3️⃣ 403 Forbidden – 권한 없음

```js
app.delete("/admin/user/:id", (req, res) => {
  if (!req.user.isAdmin) {
    // 관리자가 아닌 경우
    return res.status(403).send({ error: "권한이 없습니다." });
  }
  res.send({ message: "사용자 삭제 완료" });
});
```

---

### 4️⃣ 404 Not Found – 리소스 없음

```js
app.get("/posts/:id", (req, res) => {
  const post = database.find((p) => p.id === req.params.id);
  if (!post) {
    return res.status(404).send({ error: "게시글을 찾을 수 없습니다." });
  }
  res.send(post);
});
```

---

### 5️⃣ 405 Method Not Allowed – 허용되지 않은 HTTP 메서드

```js
app.post("/posts/:id", (req, res) => {
  // GET만 허용한다고 가정
  res
    .status(405)
    .send({ error: "POST는 허용되지 않습니다. GET만 사용하세요." });
});
```

---

### 6️⃣ 500 Internal Server Error – 서버 오류

```js
app.get("/data", (req, res) => {
  try {
    const data = someDatabase.getData(); // DB 호출
    res.send(data);
  } catch (err) {
    res.status(500).send({ error: "서버 오류가 발생했습니다." });
  }
});
```

### 7️⃣ 502 Bad Gateway – 다른 서버와 통신 실패

```js
app.get("/external-api", async (req, res) => {
  try {
    const response = await fetch("https://api.example.com/data");
    if (!response.ok) {
      // 다른 서버가 정상 응답 안 줌
      return res.status(502).send({ error: "잘못된 게이트웨이 응답" });
    }
    const data = await response.json();
    res.send(data);
  } catch (err) {
    res.status(502).send({ error: "외부 서버 연결 실패" });
  }
});
```

---

### 8️⃣ 503 Service Unavailable – 서버 점검 / 과부하

```js
let isMaintenance = true; // 서버 점검 모드

app.get("/posts", (req, res) => {
  if (isMaintenance) {
    return res
      .status(503)
      .send({ error: "서버 점검 중입니다. 잠시 후 다시 시도해주세요." });
  }
  res.send([{ id: 1, title: "게시글" }]);
});
```

---

### 9️⃣ 504 Gateway Timeout – 서버가 다른 서버 응답 기다리다 시간 초과

```js
app.get("/slow-api", async (req, res) => {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000); // 2초 제한

    const response = await fetch("https://api.slow-service.com/data", {
      signal: controller.signal,
    });
    clearTimeout(timeout);

    const data = await response.json();
    res.send(data);
  } catch (err) {
    // 요청 제한 시간 초과 시
    res.status(504).send({ error: "게이트웨이 응답 시간 초과" });
  }
});
```

</details>

### res.sendStatus()

바디 없이 상태 코드만 응답

```js
app.get("/some/path", (req, res) => {
  // ...
  res.sendStatus(204);
});

// 예시
app.delete("/posts/:id", (req, res) => {
  // 게시글 삭제 로직
  res.sendStatus(204); // 본문 없이 204 상태 코드만 보내기
});
```

### 왜 req는 객체 위주, res는 함수 위주?

#### req (요청 객체):

- 클라이언트가 보낸 데이터를 서버가 **읽는 역할**
- 읽기 전용이므로 속성(property) 으로 접근
- `req.query`, `req.params`, `req.body`
- like 손님이 가져온 가방

#### res (응답 객체):

- 서버가 클라이언트로 데이터를 **보내는 역할**
- "행위"가 필요하므로 메서드(method) 형태로 제공
- `res.send()`, `res.status()`
- like 서빙하는 직원

## Request Header

### [목표] 리퀘스트 헤더 값 get

```js
// console.log(req.headers);
{
  host: 'localhost:3000',
  connection: 'keep-alive',
  // ...
  'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
  accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
  // ...
  'accept-encoding': 'gzip, deflate, br, zstd',
  'accept-language': 'ko,en-AU;q=0.9,en;q=0.8'
}
// req.get('host'); http 요청 헤더에서 특정 필드 조회 메서드
// => localhost:3000
```

## Response Header

### [목표] 리스폰스 헤더 값 set

```js

```

## 실습: todo api 만들기

1. 테스크 목록 돌려주는 get /tasks 라우트 생성

```js
import express from "express";
import tasks from "./data/mock.js"; // 목데이터 import

const app = express();

app.get("/tasks", (req, res) => {
  // 라우트 경로 설정
  res.send(tasks); // 목데이터 응답 객체에 담아 반환
});

/* Send Request시 목데이터의 json 문자열 확인 가능)
  브라우저 주소창에서 url 입력은 get만 가능하고, 응답 body만 화면에 찍힘 */
/* res.send()는 인자로 객체를 받아 json으로 변환해 반환
  response body 보낼 때 Content-type header 설정 권장
      근데 인자에 따라 자동으로 설정 */
// json은 프로퍼티에도 큰따옴표 필요, 마지막 요소에 쉼표 금지, Date 객체도 문자열로 변환

app.listen(3000, () => console.log("Server Started"));
```

2. 쿼리 스트링 핸들링
   쿼리 스트링 = url에서 물음포 뒤에 오는 부분  
   (Rest client에서 리퀘스트 구분시 `###` 사용)

```js
// const app = express();

app.get("/tasks", (req, res) => {
  const sort = req.query.sort;
  const count = +req.query.count;

  const sortFn =
    sort === "oldest"
      ? (a, b) => a.createAt - b.createAt // 오름차순
      : (a, b) => b.createAt - a.createAt; // 내림차순

  let newTasks = task.sort(sortFn);

  if (count) {
    newTasks = newTasks.slice(0, count);
  }

  res.send(newTasks);
});

// app.listen(3000, () => console.log('Server Started'));
```

3. 다이나믹 URL 핸들링

```js
app.get("tasks/:id", (req, res) => {
  const id = +req.params.id;
  const task = task.find((task) => task.id === id);
  if (task) {
    res.send(task);
  } else {
    res.status(404).send({ message: "Cannot find given id." });
  }
});
```

4. POST request

```http
POST http://localhost:3000/tasks
Content-Type: application/json
// 엔드포인트 바로 아래 Content type header 설정

{ // 바디는 한줄 비우고 입력
  "title": "title",
  "description": "description"
} // json body 설정

// id, isComplete, createdAt, updatedAt은 자동 생성
// 리퀘스트 보낼 때 포함 XX
```

```js
const app = express();
app.use(express.json());
// express는 request body로 전달되는 json데이터를 자동으로 js 객체로 변환XX => 따로 '파싱'해야함
// 앱 전체에서 사용하겠다는 뜻 (request의 Conteent-type이 application/json이면 body를 파싱해 js 객체로 만들어 request의 body 프로퍼티에 담음)

app.post("/tasks", (req, res) => {
  const newTask = req.body; // handler 안에서 접근 가능
  const ids = tasks.map((task) => task.id);
  // tasks 배열의 각 task 객체에서 id만 뽑아 새 배열 생성
  newTask.id = Math.max(...ids) + 1;
  // 기존 id 중 가장 큰 값에 1 더해 새로운 task의 id로 할당
  newTask.isComplete = false;
  newTask.createdAt = new Date();
  newTask.updatedAt = new Date();

  tasks.push(newTask);
  res.status(201).send(newTask);
});

app.listen(3000, () => console.log("Server started"));
```

<details><summary>에러 핸들링</summary>

```js
// 1. 유효성 검사

app.post("/tasks", (req, res) => {
  try {
    const { title, description } = req.body;

    // 요청 바디 검증
    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "title과 description은 필수입니다." });
    }

    const ids = tasks.map((task) => task.id);
    const newTask = {
      id: (ids.length > 0 ? Math.max(...ids) : 0) + 1,
      title,
      description,
      isComplete: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "서버 내부 오류" });
  }
});
```

```js
// 2. 전역 에러 핸들링 미들웨어 추가
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "서버 내부 오류" });
});
```

</details>

4. PATCH request

```js
// ...
app.get("tasks/:id", (req, res) => {
  const id = +req.params.id;
  const task = task.find((task) => task.id === id);
  if (task) {
    Object.keys(req.body).forEach((key) => {
    // 요청온 body의 키만 뽑아 새 배열로 반환
    // 객체 내부 값 반복 변경을 위해 forEach 사용
      task[key] = req.body[key],
      // 해당 키 값을 요청온 body 키 값으로 업데이트
    });
    task.updatedAt = new Date();
    res.send(task);
  } else {
    res.status(404).send({ message: "Cannot find given id." });
  }
});
// ...
```

5. DELETE request

```js
// ...
app.delete("/tasks/:id", (req, res) => {
  const id = +req.params.id;
  const idx = tasks.findIndex((task) => task.id === id);
  if (idx >= 0) {
    tasks.splice(idx, 1);
    res.sendStatus(204);
  } else {
    res.status(404).send({ message: "Cannot find given id. " });
  }
});
// ...
```
