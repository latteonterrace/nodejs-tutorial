# 모듈 사용하기 


모듈을 설치하고 사용하는 방법을 알아봅니다. 모듈이란 "독립된 기능을 갖는 것(함수, 파일)들의 모임"이라고 이해하시면 좋을 것 같습니다.  모듈은 Node.js에서 제공하는 것이 있고, 또는 누군가가 만들어 놓은 모듈이 있으며, 직접 만들 수도 있습니다.


* 외장 모듈
  * 일반 Node.js 개발자들이 만들어 놓은 모듈(라이브러리)입니다.
  * 외장 모듈을 사용하기 위해서는 npm( Node Package Manager )을 사용합니다.
* 내장 모듈
  * Node.js를 설치하고 나면 그 안에 이미 제공되어지는 모듈을 의미합니다.
  * 내장 모듈은 이미 Node.js를 설치할 때 존재하기 때문에 npm을 사용하지 않습니다.



## 외장 모듈 사용하기 
moment라는 외장 모듈을 사용하는 방법을 알아 보겠습니다.  02-module-use  디렉토리로 이동합니다. 프로젝트 루트는 02-module-use  디렉토리입니다.

```shell
cd 02-module-use
```
다음을 입력하여 초기화 합니다. 
```shell
npm init
```
모듈 사용에 대한 이해가 목적이므로, 모든 질문에는 기본값을 사용합니다. 

package.json 파일이 생성될 것입니다. 

moment 모듈을 사용할 것입니다. 다음을 입력하여 설치합니다. 
```shell
npm install moment 
```

moment 모듈을 사용하여 현재 시간을 출력하는 time.js 파일을 만듭니다. 



```jsx
const moment = require("moment");
exports.now = function () {
  return moment().format();
};
```
이제 이 모듈을 사용하는 app.js를 다음과 같이 만듭니다. 
```jsx
const { now } = require("./time");

console.log("Now:", now());
```

다음을 실행합니다. 
```shell
node ./app.js
```
다음과 같이 출력됩니다.

```shell
Now: 2022-12-12T09:22:06+09:00
```









