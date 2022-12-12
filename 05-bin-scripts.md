# Bin Scripts 작성

Markdown 형식으로 작성된 파일을 HTML로 변환하는 Node.js 모듈 중에 markdown-it 과 marked가 있습니다. 이 두 모듈은 CLI를 제공합니다. 설치한 후 윈도우즈 커맨드 창에서 다음과 같이 실행하여 HTML을 생성할 수 있습니다. 

```shell
marked -o hello.html
```
다음과 같이 javascript 파일을 실행할 것을 우리는 예상했을 것입니다. 
```shell
node marked -o hello.html
```
그러나 우리는 마치 윈도우 명령어 또는 프로그램을 실행하는 것처럼 명령어를 실행했습니다. 

이렇게 명령어 또는 프로그램 처럼 실행할 수 있는 shell scripts를 bin script라고 부릅니다.  이 문서에서는 bin script에 대해서 설명합니다. 


## bin 디렉토리 
이러한 bin scripts 파일들은 프로젝트 루트 아래의 bin 디렉토리에 위치해야 합니다. 
```shell
📁06-module-publish
  📁bin   # 여기 bin scripts 파일들이 위치해야 합니다.
```

## bin scripts 작성 
bin scripts 파일은 Unix용만 작성합니다. 윈도우즈 용은 작성하지 않습니다. Unix 용을 작성해 놓으면 npm으로 설치할 때 자동으로 윈도우용 파일들을 생성해줍니다. 이것은 나중에 살표 보겠습니다. 


## 모듈 작성 
먼저 모듈을 작성합니다. index.js를 다음과 같이 작성합니다. 

```jsx
const moment = require("moment");
// 함수 하나를 export합니다. 
exports.now = function () {
  return moment().format("YYYY-MM-DD HH:mm:ss");
}
```
이 모듈은 jirepos-time-util이라는 패키지로 publish할 것입니다. 다음과 같이 package.json을 작성합니다. 
```json
{
  "name": "jirepos-time-util",
  "version": "1.0.0",
}
```

그럼 이 패키지에서 제공하는 now() 함수를 실행하는 bin scripts를 작성해 보겠습니다. bin 디렉토리에 timeutil.js 파일을 다음과 같이 생성합니다. 
```shell
#!/usr/bin/env node
/*eslint no-console:0*/

var timeutil = require('jirepos-time-util');
console.log(timeutil.now());
```

* 스크립트 첫 줄의 #!/usr/bin/env node은 이 스크립트가 Node.js 인터프리터로 실행되어야 함을 알려줍니다. 
* 스크립트 첫 줄을 Shebang이라고 부르는데 Unix/Linux 환경만 지원하고 Windows 환경은 지원하지 않습니다. 

package.json에 "bin" 속성에 다음과 같이 추가합니다. 
```json
{
  "name": "jirepos-time-util",
  "version": "1.0.2",
  "main": "dist/index.cjs",
  "bin": {
    "jirepostimeutil": "bin/jirepostimeutil.js"
  },
}
```



모듈을 NPM registry에 publish합니다. 


## 전역 설치

그런 다음 전역으로 설치합니다. 
```shell
npm intll -g jirepos-time-util
```
이제 bin 속성에 설정했던 스크립트를 실행합니다. 
```shell
jirepostimeutil
```
다음과 같이 출력될 것입니다. 
```shell
2022-12-12 17:43:29
```

그러면 설치된 스크립트는 어디에 설치가 될까요? npm bin -g를 통해 확인할 수 있습니다. 
```shell
$ npm bin -g
C:\Users\latte\AppData\Roaming\npm
```

위 디렉토리의 하부에 node_module에 설치됩니다.  Unix용 쉘 스크립트이지만 환경 변수에 Node.js 패스가 잡혀있어서인지 실행에는 문제가 없었습니다. 


## 로컬 설치
다음 명령어를 통해 로컬로 설치합니다. 
```shell
npm install jirepos-time-util
```

node_modules  디렉토리에 .bin 디렉토리가 있습니다. 여기에 보면 다음 세개의 파일을 볼 수 있습니다. Node.js가 알아서 생성해 줍니다. 
```shell
-a----      2022-12-12   오후 6:08            348 jirepostimeutil
-a----      2022-12-12   오후 6:08            345 jirepostimeutil.cmd
-a----      2022-12-12   오후 6:08            885 jirepostimeutil.ps1
```

다음과 같이 실행할 수 있습니다. 
```shell
PS G:\tmp>  ./node_modules/.bin/jirepostimeutil.cmd
2022-12-12 18:13:18
```

이 문서에서 설명한 내용에 대해 좀 더 자세한 내용은 [bin 디렉토리 ](./06-bin-dir.md)을 참고하세요. 

