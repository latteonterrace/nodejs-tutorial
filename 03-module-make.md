# 모듈 만들기
간단히 모듈을 만들고 사용해 봅시다. '03-module-make' 디렉토리를 만듭니다. 

그 안에 mylib.js 파일을 만들고 작성합니다. 
```jsx
function hello() {
  console.log('hello');
}
function add(a, b) {
  return a + b;
}

module.exports.hello = hello;
module.exports.add = add; 
```


app.js 파일을 만들고 require()를 사용하여 모듈을 임포트합니다. 
```jsx
let mylib = require('./mylib.js');

mylib.hello();
console.log(mylib.add(1, 2));
```
app.js를 실행합니다. 
```shell
node ./app.js
```
다음과 같이 출력됩니다. 
```shell
hello
3
```

## 모듈 만들기 
모듈은 파일이라고 생각하면 쉽습니다.  위에서 mylib.js 파일을 만들었습니다. 이 mylib.js을 모듈이라고 부르고 사용하기 위해서 우리는 require()를 다음과 같이 사용했습니다. 
```jsx
let mylib = require('./mylib.js');
```

위에서 mylib.js 파일을 만들었는데 hello()라는 함수와, add()라는 함수를 만들었습니다. 이 함수들을 모듈 외부에서 사용하기 위해서는 module.exports에 함수를 추가해야 합니다. 
```jsx
module.exports.hello = hello;
module.exports.add = add; 
```


## 모듈 내보내기
file에 있는 함수, 변수 , 객체 등은 모듈 외부에서 사용할 수 없습니다. 모듈 외부에서 사용하려면 module.exports에 추가해야 합니다. CommonJS에서 모듈 생성하는 방법을 살펴보겠습니다.

* 여러 개의 객체를 내보낼 경우, module.exports 변수의 속성으로 할당한다.
* 딱 하나의 객체를 내보낼 경우, module.exports 변수 자체에 할당한다.


### 단일 객체 내보내기
module.exports 를 이용하여 내보내기 합니다.
```jsx
function append(a, b) {
  return a + b;
}

module.exports = append;
```
require()를 통해 불러옵니다
```jsx
const append = require('./testlib');
console.log(append('Hello ', 'World!'));
```


### 여러 개의 객체 내보내기
module.exports.hello와 같이 module.exports의 변수로 할당하여 여러 객체를 export 합니다.

```jsx
function hello() {
    console.log('hello');
}
function add(a, b) {
    return a + b;
}

module.exports.hello = hello;
module.exports.add = add; 
```
불러올 때는 require()로 불러오고 할당된 상수명.[내보낼때의 변수명]과 같이 사용합니다.
```jsx
const mylib = require('./mylib.js');

mylib.hello();
console.log(mylib.add(1, 2));
```

아래와 같이 분해해서 사용할 수 있습니다.


```jsx
let { hello, add }= require('./mylib.js');

hello();
console.log(add(1, 2));
```

이 방식은 node 명령어를 통해서만 가능합니다. 즉 node *.js 와 같이 사용할 때 유효합니다.



