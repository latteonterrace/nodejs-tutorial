# ES 모듈 사용하기 

CommonJS를 모듈 시스템을 채택했던 Node.js에서는 import, export와 같은 ES 모듈을 사용하려면 Babel과 같은 트랜스파일러(transpiler)를 사용했어야 했는데요. Node.js 버전 13.2부터 ES 모듈 시스템에 대한 정식 지원이 시작됨에 따라 다른 도구 없이 Node.js에서 손쉽게 ES 모듈을 사용할 수 있게 되었습니다. 


Node.js에서 ES 모듈을 사용하는 첫번째 방법은 파일의 확장자를 js 대신에 mjs를 사용하는 것입니다. 

다음과 같이 time.js를 작성합니다. 설치된 노드 모듈을 import할 때에는 확장자가 없습니다. 
```jsx
import moment from "moment";

export function now() {
  return moment().format();
}
```
이 모듈을 사용하는 코드를 다음과 같이 작성합니다. time.mjs를 import할 때에는 확장자를 표시해야 합니다. 브라우저와 호환성을 맞추기 위해서라고 합니다. 
```jsx
import { now } from "./time.mjs";

console.log("Now:", now());
```


다른 방법으로는 package.json에 type을 module로 설정하는 방법입니다. 이 경우 확장자를 .mjs로 하지 않고 .js로 합니다. 

pacakge.json에 type의 값을 module로 설정합니다. 

```json
{
  "type": "module", 
  "dependencies": {
    "moment": "^2.29.4"
  }
}
```
time.js 파일을 import할 때 다음과 같이 import 합니다. 
```jsx
import { now } from "./time.js";

console.log("Now:", now());
```




