# npx 

npm을 좀 더 편하게 사용하기 위해서 npm에서 제공해주는 하나의 도구로서 npm@5.2.0 이상 버전만 깔려 있다면 npx 명령어를 사용할 수 있다. 


npm이 편리하지만 설치하는 공간이 항상 node_modules 에 설치되기 때문에 문제가 될 수 있다. 

'npm -g install'을 사용하여 gloabl에 설치하면 항상 node_modules를 찾아서 설치한다. 그러나 원하는 곳에 설치하기가 힘들다. 


모듈를 실행할 때 다음과 같이 불편하게 실행한다. 
```
./node_modules/.bin/abc 
```
npx를 사용하면 간단히 실행할 수 있다. 
```
npx abc 
```


## 한번만 실행되어야 하는 명령 
svelte 프로젝트를 생성할 때 1번만 사용하고 다시 사용하지 않는다. 한 번 사용하고 삭제해야 한다. npx를 사용하면 간단히 해결할 수 있다. 

```
npx degit sveltejs/template svelte 
```




