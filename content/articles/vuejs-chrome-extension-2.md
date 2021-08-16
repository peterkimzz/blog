---
category: tech
title: Vue.js로 크롬 확장 프로그램 만들기 강의 - 2부
updated: 2021-05-13
created: 2021-05-13
thumbnail: https://dynamisign.com/api/sign?d=peterkimzz.com&t=Vue.js%EB%A1%9C%20%ED%81%AC%EB%A1%AC%20%ED%99%95%EC%9E%A5%20%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%A8%20%EB%A7%8C%EB%93%A4%EA%B8%B0%20%EA%B0%95%EC%9D%98%20-%202%EB%B6%80
published: true
---

[이전 포스팅](/vuejs-chrome-extension-1)에서 `index.html`과 `manifest.json` 파일을 이용해서 확장 프로그램을 개발자 모드로 실행시키는 것 까지 진행했습니다.

이번 포스팅에서는 Vue.js와 Vite을 사용해서 프로젝트를 재설계해보도록 하겠습니다.

## Vue.js

[Vue.js](https://v3.vuejs.org/)는 웹사이트를 만들기 위해 고안된 프레임워크입니다. 그냥 순수 HTML을 작성하는 것 보다 개발자에게 훨씬 더 많은 이점을 가져다주기 때문에 사용합니다.

<!--more-->

> Vue.js: The Progressive JavaScript Framework

이 Vue.js를 프로젝트에 제대로 구현하려면 사실 프론트엔드 지식이 많이 필요합니다. `Webpack`이나 `Rollup`같은 번들러 사용법과, 자바스크립트 모듈 시스템에 대한 이해가 필요하기 때문입니다.

하지만 걱정마세요. 우리는 남들이 만든 좋은 툴을 그저 가져다 사용하면 됩니다. 물론 나중에는 이게 왜 작동하는지 내부 구조나 기술들을 알고 계셔야 합니다만, 아마 아주 나중에 저절로 관심이 생기실테니 그 때 공부해보시길 바랍니다.

제가 소개할 남들이 만든 툴은 바로 [Vite](https://vitejs.dev/) 입니다.

> Vite: Next Generation Frontend Tooling

문서에 따르면 빗 이라고 읽으면 된답니다. 불어로 `빠른` 이라는 뜻입니다.

Vite을 사용하면 복잡한 설정들을 직접 구현할 필요가 없습니다. 그리고 Vue 만을 위한 툴은 아니고, **React**나 **Svelte**같은 다른 프레임워크도 모두 제공합니다.

## 프로젝트 새로 구성하기

일단 기존에 만들었던 `vue-extension` 디렉토리는 지워주세요. vite를 이용해 새로 구성할겁니다.

```bash
$ npm init @vitejs/app vue-extension
```

터미널이 몇 가지 물어볼텐데, `vue`와 `javascript`를 선택해주세요.

정상적으로 진행이 되었다면 해당 디렉토리로 이동 후, 패키지를 설치해줍니다.

```bash
$ cd vue-extension
$ npm install
$ npm run dev
```

이렇게 까지 하면 Vite이 `http://localhost:3000` 주소로 개발 서버를 열어줍겁니다. 브라우저를 통해 접속해보세요.

![](https://user-images.githubusercontent.com/20244536/118081940-48867f00-b3f7-11eb-860e-f74ab318f7e5.png)

## 프로젝트 구조

자바스크립트 프로젝트라면 반드시 필요한 파일이 있습니다. 바로 `package.json` 입니다. 이 파일은 현재 이 디렉토리가 자바스크립트 프로젝트라는 걸 의미합니다. 또한 이 파일에 프로젝트 이름이나 버전, 외부 패키지 이름들을 적어줄 수 있습니다.

그럼 Vite이 만들어 준 `package.json` 파일을 살펴보죠.

```json[package.json]
{
  "name": "vue-extension",
  "version": "0.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "serve": "vite preview"
  },
  "dependencies": {
    "vue": "^3.0.5"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^1.2.2",
    "@vue/compiler-sfc": "^3.0.5",
    "vite": "^2.3.0"
  }
}
```

이 `package.json` 파일을 제대로 설명하기 위해 또 다른 포스팅이 필요할 정도로 알아야 할 내용이 굉장히 많습니다만, 일단은 이 프로젝트를 진행하기 위해 알아야할 부분만 간단하게 설명하겠습니다.

1. `name`: 프로젝트 이름입니다. 외부로 배포하지 않는다면 무시해도 됩니다.
2. `version`: 프로젝트 버전입니다. 외부로 배포하지 않는다면 무시해도 됩니다.
3. `scripts`: 커맨드라인 명령어를 정의할 수 있습니다. 예를 들어 `dev`의 경우 `vite`라는 값이 정의되어있는데, 터미널에 `npm run dev` 이라는 명령어를 입력하면 대신 `vite`를 실행하게 됩니다.
4. `dependencies`: 외부 패키지들을 목록입니다. 여기에 패키지들을 적고 `npm install` 명령어를 입력하면 프로젝트 루트 디렉토리에 `node_modules` 폴더가 생기고, 이 밑에 적어둔 모든 패키지가 설치됩니다. `dependencies`와 `devDependencies` 와의 차이는 일단 무시하세요.

우리가 좀 더 알아야 할 부분은 `scripts` 부분입니다. 아래 내용은 `vite` 프로젝트에 대해서만 유효합니다.

1. `npm run dev`: 개발 서버를 열어줍니다. 기본값은 `http://localhost:3000` 입니다.
2. `npm run build`: 프로덕션 (배포)용 프로젝트를 위해 코드를 정제합니다. 그리고 그 결과물을 `dist` 폴더로 내보냅니다. 보통 이 작업을 **build** 라고 합니다.
3. `npm run serve`: 빌드된 프로젝트를 실행시킵니다. 역시 서버가 열립니다. 기본값은 `http://localhost:5000` 입니다.

패키지 목록을 보니, 현재 Vue 최신 버전인 `Vue 3`가 설치되어있습니다. 2버전과 3버전은 차이가 꽤 크고, 3 버전에서 정말 많은 개선이 이루어졌으니 혹시라도 `2.x` 이하의 버전을 사용하고 계셨던 분들이라면, 이번 기회에 `3.x` 버전을 사용해보세요.

## Vite을 확장 프로그램으로 만들기

간단합니다. 이전에 만들어두었던 `manifest.json` 파일을 `public` 폴더에 넣어주고 빌드하면 됩니다.

`public` 폴더에 넣는 이유는 vite가 프로젝트를 빌드할 때 `public` 폴더에 있는 파일들의 코드는 건들지 않고 바로 `dist` 폴더로 옮겨주기 때문입니다.

```
$ touch public/manifest.json
$ npm run build
```

이렇게하면 `manifest.json` 파일이 포함된 결과물이 `dist` 폴더로 내보내집니다. 크롬 확장 프로그램 관리자 페이지에서 이 `dist`를 로드하면 정상적으로 확장 프로그램으로 작동하는 걸 확인할 수 있습니다.

![](https://user-images.githubusercontent.com/20244536/118083782-7faa5f80-b3fa-11eb-944f-8c782d05a59f.png)

하지만 여기서 큰 문제가 하나 있습니다.

우리가 크롬 확장 프로그램을 개발할 때 계속해서 앱 화면을 확인해야하는데, 매번 `npm run build` 를 입력하면서 개발을 할 순 없겠죠. 엄청난 시간 낭비일겁니다.

해결 방법은 간단합니다. `package.json`의 `script.build` 부분을 다음과 같이 수정해주세요.

```json[package.json]
{
  "scripts": {
    "build": "vite build --watch"
  }
}
```

이제 개발할 때 `npm run dev` 대신에 `npm run build` 를 실행하면, 개발 서버처럼 동작하되 코드를 수정할 때 마다 계속해서 빌드를 하게됩니다. 이렇게 하면 계속해서 build 명령어를 입력하지 않아도 되겠죠.

근데 여기서 또 다른 문제가 하나 있다면, 일반 웹사이트 개발과는 다르게 크롬 확장 프로그램은 앱 특성상 코드 변경 후 화면을 확인 할 때 창을 껐다 켜야 변경사항을 확인할 수 있습니다.

저는 그냥 껐다 켰다 하면서 개발하고 있지만, 이게 번거로우시다면 `npm run dev`를 이용해 `localhost`에서 개발하고 배포 전 테스트 할 때만 창으로 확인해도 상관없습니다. 편한 방법으로 개발하시면 되겠습니다.

저는 브라우저에서 테스트하고 싶진 않으니 `scripts` 명령어를 크롬 확장 프로그램에 좀 더 맞게끔 수정하고, 결과물을 압축해주는 기능까지 추가해보록 하겠습니다.

압축을 하기 위해서는 패키지를 하나 설치해야합니다. 설치 후 코드를 변경해주세요.

```bash
$ npm install -D bestzip
```

```json[package.json]
{
  "scripts": {
    "dev": "vite build --watch"
    "build": "bestzip dist.zip dist/"
  }
}
```

이제 평소 개발을 할 때는 `npm run dev`을 이용해 감시 모드로 빌드를 하고, 앱을 배포할 시기가 오면 `npm run build` 명령어를 이용해 `dist` 폴더를 `dist.zip` 파일로 만들어주면 됩니다.

결과물을 압축하는 이유는, 이후 확장 프로그램을 스토어에 배포할 때 `.zip` 파일로 제출해야하기 때문입니다.

## 2부 마무리

2부 강의에서 `Vue`를 설치하긴 했지만, 막상 뷰 코드를 열어보지도 못했네요. 하지만 프로젝트 구조를 잘 잡아두었으니 이제 다음 강의에서는 코드 작성에 좀 더 치중해보도록 하겠습니다.
