---
category: tech
title: Rollup.js - 번들링, 파일을 하나로 합쳐보자
thumbnail: https://user-images.githubusercontent.com/20244536/107738251-a6002680-6d49-11eb-8708-dbe40704924e.png
updated: 2021-02-09
created: 2021-02-09
published: true
---

`번들링` 이라는 말을 프론트엔드 개발자라면 많이 들어보셨을겁니다. 번들링은, 파일을 하나로 묶는 것을 말합니다. 그럼 왜 굳이 파일을 하나로 묶어야 할까요? 바로 **HTTP 통신의 특성 때문입니다.**

<!--more-->

단발성으로 리소스를 요청하는 HTTP 특성상, 요청할 파일이 많으면 그만큼 요청을 많이 보내야해서 비효율적입니다. 그래서 번들링해서 파일을 하나로 묶으면 요청 횟수가 적어지니 효율적이겠죠.

그만큼 프론트엔드에서 번들링은 정말 중요합니다. 사용자가 우리의 웹사이트를 방문했을 때, 최대한 빠르게 웹 페이지를 보여줘야하기 때문입니다.

그럼 번들링은 어떻게 해야할까요? 바로 **번들러**라는 녀석을 이용하면 됩니다. 대표적으로 [`Webpack`](https://webpack.js.org/)이 있습니다. 예전과 다르게 웹팩이 많이 개선되어서, 설정 없이도 간단한 번들링은 쉽게 가능합니다.

![image](https://user-images.githubusercontent.com/20244536/107313452-e48dab00-6ad5-11eb-8a9b-223341b52217.png)

위 그림은 웹팩이 가장 왼쪽 위에 위치한 최초 진입점인 `.js` 파일을 읽어서, 그 파일이 참조 하고 있는 다른 여러 형식들의 파일들을 하나로 묶어 최종적으로 js, css, jpg, png로 만든다는 과정을 설명한 그림입니다. 이해가 안가셔도 됩니다. 그냥 최초 진입점이 될 파일 1개를 선택한다는 것만 알아두시면 됩니다.

그리고 번들러를 사용해야하는 큰 이유가 있습니다. 번들러는 이제 단순히 번들링만 하는 게 아니라, 용량 압축과 구형 브라우저 지원, Polyfill 등 하나로 묶는 것 등 굉장히 많은 이점과 편의성을 가져다줍니다.

거의 대부분 `Webpack`을 많이 사용하지만, 더욱 빠른 성능이나 Zero configuration을 강조한 후발 주자들도 많이 있습니다.

[`Rollup`](https://rollupjs.org/guide/en/), [`Parcel`](https://parceljs.org/), [`Esbuild`](https://esbuild.github.io/) 정도가 있습니다.

이번 포스팅에서는 Rollup을 이용해 번들링에 대해 간단하게 알아보겠습니다.

## 프로젝트 구성

먼저 프로젝트를 생성하고, 초기화해줍니다.

```bash
$ mkdir project && cd $_
$ yarn init -y
```

rollup을 사용하기 위해 패키지를 설치합니다. 이번 포스팅에선 `faker.js`도 같이 사용할 예정입니다.

```bash
$ yarn add -D rollup
$ yarn add faker
```

프로젝트를 번들링하기 위해 최초 rollup이 읽어들어야 할 파일이 있어야겠죠. 저는 `src` 디렉토리 아래에 `main.js` 파일과 `faker.js` 파일 2개를 만들도록 하겠습니다.

```bash
$ mkdir src
$ touch src/main.js
$ touch src/faker.js
```

여기까지 구성하셨다면 프로젝트의 구조는 다음과 같습니다.

```
project
|- node_modules/
|- src/
    |-- main.js
    |-- faker.js
|- package.json
|- yarn.lock
```

## 모듈 작성하기

자 그러면 진입점이 될 파일인 `main.js`를 작성하기 전에, `faker.js`을 이용해서 랜덤한 이름을 만들어주는 우리의 모듈(함수)부터 만들어보도록 하겠습니다.

```js [src/faker.js]
import faker from "faker";

export const GenerateName = () => {
  return faker.name.findName();
};
```

방금 만든 모듈을 이용해서 `main.js`를 구성해보도록 하겠습니다.

```js [src/main.js]
import { GenerateName } from "./faker";

function Init() {
  const name = GenerateName();
  console.log(`name: ${name}`);
}

Init();
```

이상으로 프로젝트를 실행시킬 때 마다 이름을 랜덤으로 출력해주는 간단한 모듈을 만들어보았습니다.

## 번들링하기

맨 처음 설명드린 것처럼, **번들러**는 다수의 파일을 하나의 파일로 묶어주는 역할을 한다고 했습니다. 이 말에 따르면 우리의 프로젝트는 현재 2개의 파일로 분리되어 있지만, 결과는 1개의 파일로 나와야합니다.

커맨드라인 인터페이스를 이용하면 아주 간단하게 번들링을 할 수 있습니다. cli를 이용하기위해 `package.json` 내부에 `scripts`를 추가해주도록 합시다.

```json [package.json]
{
  "scripts": {
    "build": "rollup src/main.js --file dist/main.js"
  }
}
```

옵션에 대한 설명은 두 번째 자리에 진입점이 될 파일을 넣고, --file 옵션에는 번들링된 결과 파일 명을 적어주면 되겠습니다.

> 프로젝트 내부에만 rollup을 설치했기 때문에 명령어를 터미널에 직접치면 작동하지 않습니다. 터미널에서도 실행시키고 싶다면 `$ yarn add global rollup`으로 설치해주세요.

그럼 이제 우리의 모듈을 번들링합시다.

```bash
$ yarn build

# log
$ rollup src/main.js --file dist/main.js

src/main.js → dist/main.js...
(!) Unresolved dependencies
https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency
faker (imported by src/faker.js)
created dist/main.js in 43ms
✨  Done in 0.45s.
```

성공적으로 번들링되었습니다! 현재는 경고가 하나 뜨는걸로 보이는데, 일단은 결과 파일을 살펴보도록 하겠습니다.

```js [dist/main.js]
import faker from "faker";

const GenerateName = () => {
  return faker.name.findName();
};

function Init() {
  const name = GenerateName();
  console.log(`name: ${name}`);
}

Init();
```

분리되어있던 `faker.js` 파일의 코드들이 `main.js`에 합쳐져있음을 확인할 수 있습니다.

우리의 모듈이 잘 동작하는지 테스트를 위해 `package.json`에 스크립트를 추가합시다.

```json [package.json]
{
  "scripts": {
    "build": "rollup src/main.js --file dist/main.js",
    "start": "node dist/main.js"
  }
}
```

```bash
$ yarn start

# log
import faker from 'faker';
^^^^^^

SyntaxError: Cannot use import statement outside a module
```

import 구문을 사용할 수 없다는 오류가 출력되고 있습니다. 이 부분은 rollup의 문제는 아니고, node에서 최신 자바스크립트 문법을 해석할 수 없기 때문에 발생하는 오류입니다.

감사하게도 번들링 과정에서 최신 자바스크립트 문법을 node에서 해석할 수 있도록 바꿔주는 옵션이 있습니다. `package.json`를 수정합시다.

```json [package.json]
{
  "scripts": {
    "build": "rollup src/main.js --file dist/main.js --format cjs"
  }
}
```

수정한 뒤 결과 파일을 다시 살펴보도록 하겠습니다.

```js
// dist/main.js

"use strict";

var faker = require("faker");

function _interopDefaultLegacy(e) {
  return e && typeof e === "object" && "default" in e ? e : { default: e };
}

var faker__default = /*#__PURE__*/ _interopDefaultLegacy(faker);

const GenerateName = () => {
  return faker__default["default"].name.findName();
};

function Init() {
  const name = GenerateName();
  console.log(`name: ${name}`);
}

Init();
```

이것 저것 코드가 많이 추가되었는데 다시 테스트 해보도록 하겠습니다.

```bash
$ yarn start

# log
$ node dist/main.js
name: Cesar Greenholt
✨  Done in 0.72s.
```

잘 작동하는걸 확인할 수 있습니다!

그냥 넘어가기 전에 포맷에 대한 간략한 설명입니다. `--format` 옵션에는 몇 가지가 있는데, node에서 사용하는 모듈이라면 `cjs`를 사용하면 되고, 브라우저에서 사용한다면 `iife`, 둘 다 사용하고 싶다면 `umd` 옵션을 주면 됩니다.

"무조건 umd로 하면 되겠네" 라고 생각하실 수 있지만, 당연히 번들링된 파일의 크기가 커집니다. 파일이 불필요하게 커지지 않도록 각 사용 환경에 맞게 구성하시면 되겠습니다.

## Tree shaking

번들링을 하면서 얻을 수 있는 큰 장점 중 하나는 내 프로젝트가 가져오는 외부 모듈들이 아주 많을텐데, 그 중에 실제로 사용되는 코드들만 번들링 결과물에 포함시켜준다는 점입니다.

이를 [`Tree shaking`](https://webpack.js.org/guides/tree-shaking/)이라고 합니다. 예시를 보도록 합시다.

```js
// src/faker.js

import faker from "faker";

export const GenerateName = () => {
  return faker.name.findName();
};

export const Test = () => {
  return "Some string";
};
```

기존에 작성했던 `faker.js` 파일에 `Test()` 함수를 추가해서 내보내도록 했습니다.

**main.js**

```js
import { GenerateName, Test } from "./faker";

function Init() {
  const name = GenerateName();
  console.log(`name: ${name}`);
}

Init();
```

그리고 `Test` 함수를 가져오도록 코드를 추가하고 번들링을 해보면 `Test` 함수가 포함되어 있어야 할 것 같지만, 모듈을 가져오는 부분에서 실제로 사용하진 않고 있기 때문에 결과물에 포함시키지 않습니다.

이러한 부분은 기능이 많은 다른 모듈들을 가져올 때 굉장한 도움이 됩니다.

## rollup.config.js

번들러를 사용하다보면 CLI 설정 옵션이 너무 길어지는 상황이 발생합니다. 그리고 한 줄에 모두 작성해야하기 때문에 보기에도 좋지 않습니다. 또 번들링 환경에 따라 다른 결과 파일을 만들어내야할 수 도 있습니다.

그런 몇몇 상황들을 충족시키기 위해 자바스크립트 파일로 번들링 옵션을 설정할 수 있도록 기능을 제공하고 있습니다.

`package.json` 파일을 수정합시다.

```json [package.json]
{
  "scripts": {
    "build": "rollup -c"
  }
}
```

코드가 많이 짧아졌습니다.

-c 뒤에는 설정 파일 경로를 넣어주면 되는데, 설정하지 않는다면 프로젝트 루트 디렉토리의 `rollup.config.js` 파일을 찾도록 되어있습니다. 이것도 같이 구성하도록 하겠습니다.

```bash
$ touch rollup.config.js
```

```js [rollup.config.js]
export default {
  input: "src/main.js",
  output: {
    dir: "dist",
    format: "cjs",
  },
};
```

이렇게 구성해주면 원래 작성했던 cli 코드와 설정이 같아집니다. 테스트를 위해 `yarn build`를 이용해 번들링해보면 이전과 같은 결과가 나옵니다.

## 마무리

여기까지 다룰 수 있다면 다른 node 프로젝트에서 가져다 사용하기 위해 `npm`에 배포하는 데 큰 어려움은 없지만, rollup에 호환되지 않는 포맷으로 작성된 모듈들을 가져다가 사용하면서 생기는 문제가 있을 수 있습니다. 또 타입스크립트로 작성하고 싶거나, 공백까지도 모두 지워버려서 파일 크기를 최대한으로 줄이고 싶다거나 한다면 플러그인을 사용해야 합니다.

2부에서는 이러한 문제를 아주 쉽게 해결할 수 있는 **플러그인**에 대해서 알아보도록 하겠습니다.
