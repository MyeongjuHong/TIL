useHistory()
===

### Use
- library for routing and managing navigation
- for managing history stack, changing URL and move page

### example
```js
import { useHistory } from 'react-router-dom';

function MyComponent() {
  const history = useHistory();

  const handleClick = () => {
    // 새로운 경로로 이동
    history.push('/new-route');
  };

  return (
    <button onClick={handleClick}>Go to New Route</button>
  );
}
```

### reference
[chatGPT](https://chatgpt.com/)
