# bin 디렉토리 

이 내용은 [Installing and running Node.js bin scripts](https://2ality.com/2022/08/installing-nodejs-bin-scripts.html)을 참고하여 번역 및 추가한 내용입니다. 


package.json에서 "bin" 속성을 사용하면 npm 패키지가 제공하는 셸 스크립트를 지정할 수 있습니다.  이러한 패키지를 설치하면 Node.js는 명령줄에서 이러한 셸 스크립트(소위 bin 스크립트 )에 액세스할 수 있도록 합니다. 

bin scripts를 가진 패키지를 설치하는 두 가지 방법을 살펴 보겠습니다.



package cowsay는 package.json 프러퍼티로 다음을 가지고 있습니다. 


## globally하게 패키지 설치
```json
"bin": {
  "cowsay": "./cli.js",
  "cowthink": "./cli.js"
},
```
globally 하게 설치합니다.
```shell
npm install -g cowsay
```
이제 cowsay and cowthink 명령어를 사용할 수 있습니다. 
```shell
cowsay
```
**bin scripts가 전역적으로만 유효하다는 것을 알아 두세요.**    Node.js가 node_modules 디렉토리에서 bare module specifiers를 찾을 때 무시됩니다. 


## globally하게 설치되어 있는 패키지는? 
npm ls -g를 사용하여 전역적으로 설치되어 있는 패키지를 확인할  수 있습니다. 
```shell
npm ls -g

C:\Users\latte\AppData\Roaming\npm
├── cowsay@1.5.0
├── gatsby-cli@4.16.0
├── generator-office@1.8.1
├── npm@8.9.0
├── saas@1.0.0
├── typescript@4.5.4
├── yarn@1.22.17
```

### 전역으로 설치된 패키지는 어디에 있는가?
npm root -g는 전역적으로 설치된 패키지의 root 디렉토리를 알려줍니다. 
```shell
PS G:06-module-publish> npm root -g
C:\Users\latte\AppData\Roaming\npm\node_modules
```

### shell scripts 는 전역적으로 어디에 설치되어 있는가?
npm bin -g는 전역적으로 설치된 패키지의 bin 디렉토리를 알려줍니다. 
```shell
PS G:\06-module-publish> npm bin -g
C:\Users\latte\AppData\Roaming\npm
```


### 패키지는 전역적으로 어디에 설치되는가? 설치 prefix 
npm의 installation prefix는 패키지와 bin scripts가 전역적으로 설치되는 디렉토리를 결정합니다. 
```shell
$ npm config get prefix
C:\Users\latte\AppData\Roaming\npm
```


##  locally하게 패키지 설치하기 
지역적으로 설치하기 위해서는 다음과 같이 합니다. 
```shell
cd 08-cowsay
npm install cowsay
```

다음이 package.json에 추가될 것입니다. 
```json
"dependencies": {
  "cowsay": "^1.5.0",
  ···
}
```

다음 경로에 설치됩니다.  

```shell
08-cowsay/node_modules/cowsay/
```

Unix에서는 npm은 bin scripts를 위해서 다음의 symbolic links를 생성합니다. 
```shell
08-cowsay/node_modules/.bin/cowsay -> ../cowsay/cli.js
08-cowsay/node_modules/.bin/cowthink -> ../cowsay/cli.js
```

Windows에서는 08-cowsay\node_modules\.bin\ 디렉토리에 다음을 생성합니다. 
```shell
cowsay
cowsay.cmd
cowsay.ps1
cowthink
cowthink.cmd
cowthink.ps1
```
Unix 환경 같은 윈도우즈 환경에서는 확장자가 없습니다. 

npm bin은 지역적으로 설치되어 있는 bin scripts를 말해 줍니다. 
```shell
PS 08-cowsay> npm bin
G:\08-cowsay\node_modules\.bin
```

지역적으로 설치되었을 때, packages는 package.json 바로 옆의 node_modoules 디렉토리에 설치됩니다. npm이 패키를 찾을 때 현재 디렉토리에서 찾고, 없으면 조상 디렉토리에와 패키지를 설치한 곳에서 찾습니다.  지역적으로 패키지를 설치할 곳을 확인하기 위해서, 우리는 npm root를 사용합니다. 

```shell
$ cd $HOME
$ npm root
/Users/john/node_modules
```

John의 홈 디렉토리에 package.json이 없습니다. 하지만 npm 부모 디렉토리에 어떤 것도 설치할 수 없습니다. npm root는 이 디렉토리를 보여주기 때문입니다. 





### 지역적으로 설치된 bin scripts 실행하기 
이 서브 섹션에서의 모든 명령은 08-cowsay 디렉토리에서 실행됩니다. 

#### 직접적으로 bin scripts 실행하기 
쉘에서 다음을 실행하여 cowsay를 실행할 수 있습니다. 
```shell
./node_modules/.bin/cowsay Hello
```

Unix에서는 Helper를 설정할 수 있습니다. 
```shell
alias npm-exec='PATH=$(npm bin):$PATH'
```
다음 명령은 잘 동작합니다. 
```shell
npm-exec cowsay Hello
```


#### package scripts를 통하여 bin scripts 실행하기 
package.json에 다음을 추가합니다. 
```json
{
  ···
  "scripts": {
    "cowsay": "cowsay"
  },
  ···
}
```
shell에서 다음을 실행합니다. 
```shell
npm run cowsay Hello
```

Unix에서는 $PATH에 다음 목록들을 임시로 napm이 추가합니다. 
```shell
/Users/john/my-package/node_modules/.bin
/Users/john/node_modules/.bin
/Users/node_modules/.bin
/node_modules/.bin
```
윈도우즈에서는 %Path% 또는 $env:Path:에 다음을 추가합니다. 
```shell
C:\Users\jane\my-package\node_modules\.bin
C:\Users\jane\node_modules\.bin
C:\Users\node_modules\.bin
C:\node_modules\.bin
```

다음 명령은 패키지 스크립트가 실행되는 동안 존재하는 환경 변수 및 해당 값을 나열합니다.
```
npm run env
```

#### npx로 bin scripts 실행하기
npx를 사용할 수 있습니다. 
```shell
npx cowsay Hello
npx cowthink Hello
```

## 배포되지 않은 패키지 설치하기 
때때로 아직 published 되지 않은 패키지를 가집니다. 

### npm link : unpublished 패키지  전역으로 설치하기


/tmp/unpublished-package/ 디렉토리에 저장되는 @my-scope/unpublished-package 라는 이름의 unpublished 패키지가 있다고 가정합니다.  다음과 같이 하여 전역으로 설치할 수 있습니다.

```shell
cd /tmp/unpublished-package/
npm link
```

그렇게 한다면, 
* npm은  global node_modules에 symbolic link를 생성합니다. 예를 들어 다음과 같습니다. 
/usr/local/lib/node_modules/@my-scope/unpublished-package
-> ../../../../../tmp/unpublished-package

* Unix에서, global bin directory로부터 symolic link를 생성합니다. 예를 들어 다음과 같습니다.
/usr/local/bin/my-command
-> ../lib/node_modules/@my-scope/unpublished-package/src/my-command.js

* 윈도우즈에서, 보통 3개의 스크립트가 추가됩니다. 
C:\Users\jane\AppData\Roaming\npm\my-command
C:\Users\jane\AppData\Roaming\npm\my-command.cmd
C:\Users\jane\AppData\Roaming\npm\my-command.ps1

### npm link: 전역적으로 링크된 패키지를 지역적으로 설치하기 


게시된 패키지를 전역적으로 설치한 후(이전 하위 섹션 참조) 패키지 중 하나에 로컬로 설치할 수 있는 옵션이 있습니다(게시 또는 게시 취소 가능).

```shell
cd /tmp/other-package/
npm link @my-scope/unpublished-package
```

이것은 다음의 링크를 생성합니다. 
```shell
/tmp/other-package/node_modules/@my-scope/unpublished-package
-> ../../../unpublished-package
```

디폴트로 unpublisehd 패키지는 package.json에 추가되지 않습니다. 


### npm link: 링크 취소 
local link에 대해서는 다음과 같이 하여 취소할 수 있습니다. 
```shell
cd /tmp/other-package/
npm uninstall @my-scope/unpublished-package
```

global link에 대해서는 다음과 같이 하여 취소할 수 있습니다. 
```shell
cd /tmp/unpublished-package/
npm uninstall -g
```


### 로컬 경로를 통해 게시되지 않은 패키지 설치 

npm install게시되지 않은 패키지를 로컬에 설치하는 또 다른 방법 은 패키지 이름이 아닌 로컬 경로를 통해 패키지를 사용하고 참조하는 것입니다. 


```shell
cd /tmp/other-package/
npm install ../unpublished-package
```


그것은 두 가지 효과가 있습니다.

먼저 다음 심볼릭 링크가 생성됩니다.


```shell
/tmp/other-package/node_modules/@my-scope/unpublished-package
-> ../../../unpublished-package
```
둘째, 다음 항목에 종속성이 추가됩니다 package.json.
```json
"dependencies": {
  "@my-scope/unpublished-package": "file:../unpublished-package",
  ···
}
```

게시되지 않은 패키지를 설치하는 이 방법은 전역적으로도 작동합니다.

```shell
cd /tmp/unpublished-package/
npm install -g .
```













