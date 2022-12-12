# Yarn

## Yarn

Yarn은 자바스크립트의 새로운 패키지 매니저이다. 더욱 빠르게 패키지를 인스톨하는 방법과 의존성 관리를 다양한 디바이스에서 일관성 있게 할 수 있다.

빠르고 안정적이고 보안성이 뛰어나다.

### 설치

```
npm install --global yarn
```

### 업데이트

```
yarn self-update
```

### 프로젝트 의존성 설치

package.json에 정의된 의존성을 설치하려면 단순히 yarn을 치면 된다.

```
yarn
```

### 프로젝트 구조 생성

```
yarn init
```

그러면 package.json 파일이 만들어 진다.

### 패키지 추가

```
yarn add [package-name]@[version-or-udate][option]
```

옵션 argument는 --dev, --peer, --optional, --exact, 또는 --tilde가 있다. 첫 세가지 옵션을 사용하면 패키지를 각각 devDependencies, peerDependencies 및 optionalDependencies에 설치 하게 된다.

다음과 같은 다른 위치에서 패키지를 추가할 수 있다.

로컬 폴더 또는 로컬 tar 파일

```
yarn add file:/path/to/local/folder
yarn add file:/path/to/local/tarball.tgz
```

### 리모트 깃 레파지토리

```
yarn add <git remote url>
```

### 리모트 tar 파일

```
yarn add https://my-project.org/package.tgz
```

패키지를 업데이트 하거나 삭제 하려면, 아래의 CLI 커멘드를 입력하면 된다.

```
# upgrade all dependencies
yarn upgrade
# remove react
yarn remove react
```


| npm | yarn | meanings |
|----|----|---|
| npm init | yarn init | 초기화. package.json 만든다. |
| npm install | yarn 또는 yarn install | package.json의 패키지 설치 |
| npm install --save [package name] | yarn add [ package name] | 의존성으로 추가 |
| napm install --save-dev [package name] | yarn add --dev (또는 -D) [package name] | 개발 의존성으로 추가 |
| npm install --global [package name] | yarn global add [package name] | 전역으로 추가 |
| npm update --save | yarn upgrade | 패키지 업데이트 |
| npm run [스크립트명] | yarn [스크립트명] | package.json의 스크립트 명령 실행 |
| npm uninstall --save [package name] | yarn remove [package name] | 패키지 삭제 |
| npm uninstall -g [pacakge name] | | 전역 패키지 삭제 |
| npm clean cache | yarn cache clean | 캐시 삭제 |
| npm list | yarn list | 지역적으로 설치된 패키지 목록 출력 |
| npm -g list | yarn global list | 전역으로 설치된 패키지 목록 출력 |

* --save 또는 -S를 하면 dependencies에(npm5부터는 -save옵션이 기본적으로 설정되어 있기 때문에 안 붙여도  된다.
* --save-dev 또는 -D하면 devDependencies에 추가된다. 
* -g를 하면 글로벌 패키지에 추가된다. 








## Trouble Shooting

### yarn.ps1 파일을 로드할 수 없다

관리자 권한으로 Powershell을 열고 다음을 실행한다.

```
Set-ExecutionPolicy Unrestricted
```
