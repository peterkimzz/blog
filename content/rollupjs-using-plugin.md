---
category: tech
title: Rollup.js - 플러그인으로 완성도를 높이다
thumbnail: https://user-images.githubusercontent.com/20244536/107738247-a4cef980-6d49-11eb-88a5-f7b8b6190a61.png
updated: 2021-02-12
created: 2021-02-12
published: true
---

지난 포스팅에서 `rollup.js` 를 이용해 두 개의 자바스크립트 파일을 하나로 묶고, `rollup.config.js` 파일을 구성해서 CLI가 아닌 스크립트로 설정 파일을 관리하는 것 까지 진행했습니다.

이번 시간에는 `rollup` 에 날개를 달아줄 플러그인들을 살펴보고 나아가 요즘 핫한 `typescript` 까지 적용해보도록 하겠습니다.

<!--more-->

## 들어가기 전에

사실 이전에 구성했던 프로젝트가 번들링이 잘 되고는 있었지만, 빌드 시에 경고 메세지가 출력되고 있었습니다.

```bash
$ yarn build

(!) Unresolved dependencies
https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency
faker (imported by src/faker.js)
```

해석하자면 우리의 `src/faker.js` 파일에서 가져온 `faker` 모듈에 대한 처리가 잘 되지 않았다는 얘기네요.

지난 포스팅에 [`Tree shaking`](https://webpack.js.org/guides/tree-shaking/)에 대해 언급했었는데, `main.js` 에서 다른 모듈을 가져올 때 실제로 사용되는 함수만 번들링의 결과물에 포함시킨다는 내용이었습니다.

여기서 추가적으로 `rollup`은 우리가 직접 작성한 모듈 말고, relative path를 가리키는 외부 모듈을 가져올 때 우리의 번들링 결과물에 포함시키지 않고, 단순히 가리키기만 합니다.

즉 우리가 만든 이 프로젝트를 누군가 가져다 쓸 때는 `faker` 라는 모듈 없이 작동이 안된다는 뜻입니다. 당연한 얘기죠.

사실 이 부분은 우리가 만든 패키지를 npm에 배포할 때 `faker` 모듈을 `devDepenency`가 아닌 `depenency`에 설치해두면 가져다 쓰는 사람이 우리 패키지를 설치할 때 직접 `yarn add faker` 를 하지 않더라도 알아서 같이 `node_modules` 안에 설치가 됩니다.

결과적으로 현재 발생하는 경고 메세지를 무시해도 괜찮지만, 공식 문서에는 이 부분이 의도적이더라도 명시해주면 좋겠다고 기술하고 있습니다.

경고 메세지를 없애는 방법은 간단합니다.

```js [rollup.config.js]
export default {
  input: 'src/main.js',
  output: {
    dir: 'dist',
    format: 'cjs'
  }
  external: [ 'faker' ]
};
```

외부 모듈에 대해 직접 이름을 명시하면 더 이상 오류 메세지는 출력되지 않습니다.

## 외부 모듈도 포함시키고 싶다면?

어떻게 보면 우리 프로젝트에서는 `faker` 의 `faker.name.findName()` 함수를 제외하면 아무것도 사용하지 않기 때문에 우리 모듈을 가져다 쓰는 사람이 `faker` 모듈을 전부 설치하는 게 좀 낭비같기도 합니다. 현재 `faker`는 **41MB**나 되거든요.

그렇다면 외부 모듈에 대해서도 `Tree shaking`을 이용하면 크기를 많이 줄일 수 있겠다는 생각이 드네요.

고맙게도 그런 역할을 하는 플러그인이 제공되고 있어서 아주 쉽게 구현할 수 있습니다.

```
$ yarn add -D @rollup/plugin-node-resolve
```

프로젝트에 플러그인 역할을 할 패키지를 설치 후, 설정 파일을 수정합시다.

```js [rollup.config.js]
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default {
  input: 'src/main.js',
  output: {
    dir: 'dist',
    format: 'cjs'
  },
  plugins: [nodeResolve()]
}
```

이렇게 설정하고 번들링을 하면 예상되는 결과는 우리의 결과물에 `faker`의 `findName()` 함수에 대한 코드가 포함되어 있어야겠죠.

```bash
$ yarn build

[!] Error: 'default' is not exported by node_modules/faker/index.js, imported by src/faker.js
https://rollupjs.org/guide/en/#error-name-is-not-exported-by-module
src/faker.js (1:7)
1: import faker from 'faker'
          ^
```

오류가 발생했습니다. 이번엔 번들링 자체가 되지 않고 있습니다..

문서에서는 이러한 문제는 `CommonJS` 로 작성된 모듈들을 번들링 결과물에 포함시키려고 할 때 문제가 발생한다고 설명합니다.

당연하게도 우리가 어떤 파일에서 `import a from './a.js'` 라고 가져올 수 있는 건, `a.js` 파일에는 `export default` 이 있기 때문에 가능한 시나리오입니다.

하지만 `faker` 모듈을 살펴보면 그런 부분이 없습니다. 사실 `faker` 뿐만 아니라 엄청나게 많은 모듈들이 `faker` 와 같은 포맷으로 작성되어 있습니다.

그래서 여기서 또 다른 플러그인 하나가 등장합니다. `CommonJS` 로 작성된 모듈들을 `ES6` 바꾸어서 `rollup`이 해석할 수 있게 도와줍니다.

```
$ yarn add -D @rollup/plugin-commonjs
```

패키지를 설치하고 설정 파일을 다시 수정합시다.

```js [rollup.config.js]
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: 'src/main.js',
  output: {
    dir: 'dist',
    format: 'cjs'
  },
  plugins: [nodeResolve(), commonjs()]
}
```

다시 빌드 해봅시다.

```bash
$ yarn build

created dist in 5.2s
✨  Done in 5.84s.
```

빌드 타임은 좀 많이 늘어났습니다. 그래도 빠른 편입니다.

번들링 결과물이 길어서 첨부하지는 못하지만, `faker` 의 코드들이 번들링 결과물에 추가되어있는 걸 볼 수 있습니다. 아마 `faker` 내부에서 `findName()` 을 구현할 때 많은 단계를 거치는 것 같습니다.

그래도 우리의 `main.js` 파일의 크기는 현재 **1.8MB**입니다. 우리 코드를 제외하더라도 거의 40MB가량 이득을 봤습니다.

심지어 이 파일만 바깥으로 빼서 `node main.js` 로 실행시켜보면 다른 `node_modules` 이 없더라도 잘 실행됩니다. 필요한 부분이 전부 파일 안에 포함되었으니까요. 의존성이 없어지면서 파일 크기도 엄청나게 줄였습니다.

이제 사용자가 불필요하게 `faker` 모듈을 설치하지 않아도 되겠습니다.

## 타입스크립트

이제는 타입스크립트가 거의 대세가 된 것 같습니다. 저 역시 타입스크립트를 도입하고 그 필요성을 절실히 느끼고 있기 때문에, `typescript`로 작성되어있지 않은 패키지를 설치할 때는 조금 꺼려지게 되더군요.

먼저 우리 프로젝트에서 typescript를 사용하기 위해 패키지를 설치하도록 합시다.

```bash
$ yarn add -D typescript tslib
```

`tslib` 의 경우 `rollup` 이 typescript를 번들링할 때 필요해서 같이 설치해야합니다.

타입스크립트를 사용하기 위해 `tsconfig.json` 파일을 만들어줍시다. 만드는 방법은 간단합니다. 타입스크립트를 설치하면 사용 가능한 CLI인 `tsc` 명령어를 이용하면 템플릿을 자동으로 만들 수 있습니다.

```bash
$ node_modules/.bin/tsc --init
```

이번에도 역시 typescript를 전역으로 설치하지 않고 로컬에 설치했기 때문에, CLI를 사용하고 싶다면 프로젝트 루트 디렉토리에서 `node_modules`에 들어있는 `tsc` 를 직접 사용하면 되겠습니다.

```json [tsconfig.json]
{
  "compilerOptions": {
    "target": "es5",
    "module": "CommonJS",
    "strict": true,
    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

저는 이정도로 간단하게만 사용하겠습니다.

타입스크립트를 사용하기 위한 준비가 되었으니 `main.js` 와 `faker.js` 의 확장자를 `.ts`로 바꿔주시면 되겠습니다.

이전에 js로 작성했던 파일의 확장자를 ts로 바꾸어도 변경할 부분은 없을 것 같습니다.

이제 우리 프로젝트의 구조는 이러합니다.

```
project/
|- node_modules
|- src
  |- faker.ts
  |- main.ts
|- package.json
|- rollup.config.js
|- tsconfig.json
|- yarn.lock
```

이제 `rollup` 이 typescript 파일을 읽어서 번들링을 할 수 있도록 도와주는 패키지를 설치합시다.

```bash
$ yarn add -D @rollup/plugin-typescript
```

다음 설정 파일을 수정합시다.

```js [rollup.config.js]
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'

export default {
  input: 'src/main.js',
  output: {
    dir: 'dist',
    format: 'cjs'
  },
  plugins: [
    nodeResolve(),
    commonjs({ extensions: ['.js', '.ts'] }),
    typescript()
  ]
}
```

플러그인에 `typescript` 를 추가하고, `commonjs`가 `.ts` 파일도 읽어들일 수 있도록 설정합니다.

이 `typescript()` 플러그인 안에 타입스크립트에 대한 옵션을 넣어줄 수도 있지만, 없다면 자동으로 프로젝트 루트 디렉토리에 있는 `tsconfig.json` 파일을 찾아서 동기화를 해줍니다. 정말 간편하네요.

```bash
$ yarn build

(!) Entry module "src/main.ts" is implicitly using "default" export mode, which means for CommonJS output that its default export is assigned to "module.exports". ... 이하 생략

created dist in 5.6s
✨  Done in 6.49s.
```

정상적으로 빌드가 되었습니다. 빌드 타임은 약간 더 길어졌지만, 결과물은 기존과 같습니다.

다만 새로운 경고 메세지가 등장했습니다.

기본적으로 `rollup` 은 우리의 모듈을 번들링할 때 단 하나의 객체를 내보내는 `export default` 인지, 아니면 `default` 없이 일일이 이름을 지어서 내보내는지 추측해서 번들링 하도록 되어있습니다.

`output.exports` 의 옵션으로 `default`, `named` 아니면 `none` 3가지 옵션을 주고 있습니다.

`rollup` 의 권장사항은 `named` 입니다. 애초에 코드를 작성할 때도 마지막에 `export default` 를 하지 않기를 권장합니다.

```js [rollup.config.js]
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'

export default {
  input: 'src/main.js',
  output: {
    dir: 'dist',
    format: 'cjs',
    exports: 'named'
  },
  plugins: [
    nodeResolve(),
    commonjs({ extensions: ['.js', '.ts'] }),
    typescript()
  ]
}
```

`exports` 를 추가하면 더 이상 경고 메시지는 나오지 않습니다.

## 파일을 더 압축해보자

사실 지금 번들링의 결과물은 불필요한 공백이 파일 크기를 많이 잡아먹고 있습니다. 이를 모두 제거해버립시다.

```bash
$ yarn add -D rollup-plugin-terser
```

다음은 설정 파일을 수정합시다.

```js [rollup.config.js]
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/main.js',
  output: {
    dir: 'dist',
    format: 'cjs',
    exports: 'named'
  },
  plugins: [
    nodeResolve(),
    commonjs({ extensions: ['.js', '.ts'] }),
    typescript(),
    terser()
  ]
}
```

빌드 후 파일을 열어보면 공백이 모두 제거 되었고, 파일이 **1.8MB**에서 **1.3MB**까지 줄어들었습니다.

## 마무리

이상으로 Rollup 번들러를 이용해서 간단하게 번들링에 대해서 알아보았습니다.

사실 오픈 소스 프로젝트처럼 다른 사람들을 위해 라이브러리를 만드는 것이 아니라면, 번들링 하는 방법을 직접적으로 알 필요는 없습니다. 이미 대부분의 메이저 프레임워크들은 내부적으로 잘 구현이 되어있기 때문입니다.

하지만 내가 만든 툴을 `npm`이나 `CDN` 같이 사람들에게 툴로써 제공하고 싶다면, 번들링은 선택이 아닌 필수라고 생각합니다.
