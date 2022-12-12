# 모듈 배포하기
모듈은 Node.js require() 함수에 의해 로드할 수 있는 node_modules 디렉터리의 파일 또는 디렉터리입니다. 모듈은 package.json 파일을 가질 필요가 없기 때문에 모든 모듈이 패키지는 아닙니다. package.json 파일을 가진 모듈들만 패키지입니다.

module은 Node.js에서 작성한 코드를 재사용하기 위해 정의하는 코드 블록이고, package는 npm을 통해 설치할 수 있는 공개 또는 사설의 코드 모음을 말합니다. 즉, module은 개발자가 직접 작성하는 코드 블록이고, package는 npm이라는 저장소에 등록된 다른 개발자가 작성한 코드 모음을 의미합니다.


노드 패키지는 파일 또는 디렉토리이며 package.json 파일로 설명됩니다. 패키지는 npm 레지스트리에 게시되기 위해 package.json 파일을 포함해야 합니다.


노드 모듈은 node_modules 디렉토리에 있는 파일 또는 디렉토리입니다. 모듈은 Node.js의 require() 함수에 의해 로드됩니다.


## 배포용 모듈 만들기
moment 모듈을 이용한 간단한 배포용 모듈을 만들어 보겠습니다.  '04-module-dep' 
디렉터리를 만들고, 그 안에 'index.js' 파일을 만듭니다. 

먼저 momemt를 설치합니다. 
```shell
npm install moment
```
index.js 파일에 다음 코드를 작성합니다.
```jsx
const moment = require("moment");
// 함수 하나를 export합니다. 
exports.now = function () {
  return moment().format("YYYY-MM-DD HH:mm:ss");
}
```

package.json을 다음과 같이 수정합니다. name과 버전은 필수 필입니다. name은 패키지의 이름을 의미합니다. 

```json
{
  "name": "mylib",
  "version": "1.0.0",
  "description": "My Test Module",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "moment": "^2.29.4"
  }
}
```
.npmignore 파일을 만들고 다음과 같이 작성합니다. 
```shell
/node_modules/
```

지금까지 잘 따라했다면 다음과 같이 보일 것입니다. 
```shell
📁04-module-dep
  📁node_modules
  📄.npmignore
  📄package.json
  📄index.js
```

## 배포테스트
프로젝트의 상위 디렉토리로 이동합니다. test-module 디렉토리를 만듭니다. 만든 디렉터리에 들어가서 위에서 만든 패키지를 설치합니다.

```shell
cd ..
mkdir 05-module-dep-test
cd 05-module-dep-test
npm init
npm install ../04-module-dep
```
다음과 같이 설치가 되어 있을 것입니다. 
```shell
📁04-module-dep
  📁node_modules
     📁mylib 
       📁node_modules
         📁moment
         📄index.js
         📄package.json      
  📄package.json
```
'05-module-dep-test' 디렉토리에 'index.js' 파일을 만들고 다음과 같이 작성합니다. 
```jsx
let now = require('mylib');
console.log(now.now());
```
다음과 같이 실행합니다. 
```shell
node ./index.js
```
정상적으로 현재시간이 출력될 것입니다. 

배포할 모듈을 설치하면 my 모듈이 의존하는 모듈도 같이 설치됩니다. 번들링을 할 때는 이것도 포함해서 번들링 된다고 하는데 엄청난 코드의 중복이 발생합니다. 이 문제에 대해서는 [npm에 모듈을 등록하면서 일어날 수 있는 일들](https://ui.toast.com/posts/ko_20170818)을 참고하기 바랍니다.

## 배포

npm 모듈 혹은 npm 패키지를 생성하여 실제로 NPM Registry에 업로드까지 하여 오픈소스로서 NPM 생태계에 기여하는 방법을 배워보겠습니다. 우리는 앞에서 moment 패키지를 npm을 이용하여 설치하였습니다. 이제 우리가 만든 패키지를 npm registry에 등록하여 배포해보겠습니다.



### 패키지 구조 
Node.js 배포용 패키지 프로젝트의 디렉토리를 구성할 때 특별히 권장되는 구조는 없는 것 같습니다. 다만 다음과 같은 구조를 많이 사용하는 것 같습니다. 

```shell
📁my_module 
  📁bin       # 실행 파일들 
  📁dist      # 배포용 디렉토리
  📁examples  # 예제 제공 
  📁lib       # 패키지 제작을 위한 원본 파일들
  📁src       # 소스 
  📄.npmignore # 배포시 제외할 파일들
  📄LICENSE
  📄README.md
  📄package.json
```

**bin**
실행 파일을 의미합니다.  Shell Script 또는 cmd 파일 들이 위치합니다.


**src** 
soure를 의미합니다. 컴파일 전의 원시 코드를 의미합니다. 축소(minification), 연결(concatenation), 압축(compression) 등의 작업을 거치기 전의 컴파일 전의 원시 코드를 의미합니다.


**dist**
distriution을 의미합니다. 배포용 파일을 의미합니다.  축소(minification), 연결(concatenation), 압축(compression) 등의 작업을 거친 컴파일 후의 코드를 의미합니다.

Vite 번들러를 사용하여 라이브러리 빌드를 할 때 예제를 보면 lib 디렉토리에 소스를 두는 것으로 설명하고 있습니다. 다른 번들러에서는 src에 소스를 두는 것 같습니다. 




배포용 패키지 만들기를 시작하기 위해서 디렉토리를 만듭니다 
```shell
mkdir 06-module-publish
```
디렉토리로 이동합니다. 
```shell
cd 06-module-publish
```
다음을 실행하여 package.json 파일을 만듭니다. 모두 디폴트로 선택합니다. 
```shell
npm init
```

lib 디렉토리와 dist 디렉토리를 만듭니다. 
```shell
mkdir lib
mkdir dist
```

moment 패키지를 설치합니다. 
```shell
npm install moment
```


lib 디렉토리 아래에 index.js 파일을 만들고 다음과 같이 작성합니다. 
```jsx
const moment = require("moment");
// 함수 하나를 export합니다. 
exports.now = function () {
  return moment().format("YYYY-MM-DD HH:mm:ss");
}
```

dist 디렉토리 index.js 파일을 복사합니다. CommonJS 파일이니까 이름을 index.cjs로 변경합니다.  
```shell
cp lib/index.js dist/index.js
rename dist/index.js dist/index.cjs
```

### package.json 수정
이제 배포를 위해 package.json을 수정할 것입니다. 우선 다음과 같이 수정합니다.

```json
{
  "name": "jirepos-time-util",
  "version": "1.0.0",
  "description": "For testing to publish to the registry",
  "main": "dist/index.cjs",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "jirepos@gmail.com",
  "license": "ISC",
  "dependencies": {
    "moment": "^2.29.4"
  }
}

```
주요 필드들을 살펴보겠습니다. 
**name** 
URL이나 Command Line의 일부로 사용될 소문자로 표기된 214자 이내의 패키지(모듈) 이름으로, 간결하고 직관적인 이름으로 설정하되 다른 모듈과 중복되지 않도록 고유한 이름을 설정합니다.

**version**
SemVer(The semantic versioner for npm)로 분석 가능한 형태의 버전을 지정합니다.


**description**     
프로젝트(패키지)의 설명을 지정합니다.

**license**    
패키지 사용을 허용하는 방법과 제한 사항을 알 수 있도록 라이센스를 지정합니다.

**author**     
제작자의 이름을 지정합니다.

**main**     
프로그램의 기본 진입 점(entry point)를 지정합니다. 패키지의 이름이 axios이고, 사용자가 require('axios') or import 'axios'를 사용하면 진입 점의 메인 모듈에서 exports object가 반환(return)됩니다.


### .npmigore 파일 작성
.npmignore 파일을 작성합니다. 배포할 때 제외할 파일을 지정합니다. .gitignore 파일과 같은 형식입니다. 
```shell
node_modules/
```


### npm 가입하기 
[npm](https://www.npmjs.com/signup)에 가입합니다. 가입을 완료하면 이메일로 인증 메일이 발송됩니다. 인증코드를 인증하면 가입이 완료됩니다.


### npm 로그인 
다음을 입력하여 로그인합니다. 
```shell
npm login 
```
정보를 입력하면 입력한 메일로 onetime password가 발송됩니다. 메일에서 확인 후 입력해야 로그인이 가능합니다. 


로그아웃은 다음을 입력합니다. 
```shell
npm logout
```
다음을 입력하면 로그인된 아이디를 표시합니다.
```shell
npm whoami
```

### 배포
다음을 입력하여 배포합니다. 
```shell
npm publish
```
배포가 완료되면 메일로 published 메일이 발송됩니다. 

'https://www.npmjs.com/settings/[사용자이름]/packages'에서 배포된 패키지를 확인할 수 있습니다.  실제 NPM 검색 결과에 반영되는 것은 시간이 조금 필요할 수 있습니다.


### 패키지 정보 확인

사용하는 패키지명이 이미 사용 중인지 확인하려면 다음을 사용합니다.
```shell
npm info [패키지명]
```

다음과 같이 정보를 확인할 수 있습니다. 

```shell

PS G:\github\mylib> npm info jirepos-time-util

jirepos-time-util@1.0.0 | ISC | deps: 1 | versions: 1
For testing to publish to the registry

dist
.tarball: https://registry.npmjs.org/jirepos-time-util/-/jirepos-time-util-1.0.0.tgz
.shasum: 4f5ffa516c8381057bc686a436bf96d537c6eec7
.integrity: sha512-lduJQemfuyLpT+NcQRDcX5MRb3RV43zU2FLXm6wzLEbWVXctBRfK8seH27AWFs9qyE1270VlsuipSpW8ul2fYg==
.unpackedSize: 631 B

dependencies:
moment: ^2.29.4

maintainers:
- jirepos <jirepos@gmail.com>

dist-tags:
latest: 1.0.0

published 4 minutes ago by jirepos <jirepos@gmail.com>
```

### 패키지 재배포
 버전을 올려줘야 합니다. 버전을 올릴 때는 package.json 파일을 직접 수정하거나, 터미널에서 npm version patch 커맨드를 사용합니다.
```shell
  npm version patch
```

패키지를 재배포할 때는 처음에 패키지를 배포했을 때와 마찬가지로 터미널에서 npm publish 커맨드를 날리면 됩니다.



## 배포된 패키지 사용 
이제 배포된 패키지를 사용해 보겠습니다.  '07-use-published' 디렉토리를 만듭니다. 
```shell
cd ../
mkdir 07-use-published
```
프로젝트를 다음과 같이 초기화 합니다. 
```shell
cd 07-use-published
npm init -y
```
배포된 패키지를 설치합니다. 
```shell
npm install jirepos-time-util
```
index.js 파일을 생성하고 다음과 같이 입력합니다. 
```javascript
const timeUtil = require('jirepos-time-util');
console.log(timeUtil.now());
```
다음을 입력하여 실행합니다. 
```shell
node index.js
```
다음과 같이 실행 결과가 나오면 성공입니다. 
```shell
2021-03-01T14:00:00+09:00
```

설치된 jirepos-time-util 패키지를 확인해 보겠습니다. 다음과 같을 것입니다. 
```shell
📁07-use-published
  📁node_modules
    📁jirepos-time-util
       📁dist
       📁lib
         📄package.json
```
예상은 dist 폴더의 파일만 배포될 것으로 06-module-publish 디렉토리의 모든 것이 배포되었습니다. 

**따라서, 프로젝트 전체 구조를 배포한다는 것을 알게 되었습니다.** 


## package.json 
package.json의 필드들을 알아보고 좀 더 정교하게 배포파일을 만들어 보겠습니다. 자세한 사항은 [package.json](https://outofbedlam.gitbooks.io/npm-handbook/content/config/package-json.html)을 참고합니다.

































