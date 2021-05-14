---
category: tech
title: 웹팩보다 100배 빠른 번들러, esbuild
thumbnail: https://user-images.githubusercontent.com/20244536/111092892-bc80e400-857a-11eb-9bb3-adce2c3c67d3.png
updated: 2021-03-14
created: 2021-03-14
published: true
---

이번 포스팅은 떠오르는 차세대 자바스크립트 번들러 [`esbuild`](https://esbuild.github.io/)에 대한 내용입니다.

작년 Github에서 떠오르는 번들링 프로젝트 중 1위를 차지했고, 오늘을 기준으로 20만개의 가까운 Github Star를 받았습니다.

<!--more-->

웹팩보다 100배 빠르다는 건 어그로가 아닙니다. 아래 그림을 봐주시죠.

![](https://github.com/evanw/esbuild/raw/master/images/benchmark.svg)

위 벤치마크는 메이저 자바스크립트 번들러들의 빌드 타임을 비교한 표입니다.

아니 어떻게 이렇게 빠를 수가 있냐구요? 이유는 이러합니다.

- `Go` 언어로 작성됨
- 코드 파싱, 출력과 소스맵 생성을 모두 병렬로 처리함
- 불필요한 데이터 변환과 할당 없음

하지만 아직 1.0 버전 출시 전이기 때문에, 많은 기능을 제공하고 있지는 않습니다. 현재 지원되는 기능은 이렇습니다.

- CommonJS, ES6
- JSX
- Typescript
- Tree shaking
- Source Map
- Minification
- 등등 더 많음

훌륭합니다. 사실 이 정도만 지원되도 사용하기에 부족함이 없습니다. 오히려 빌드 타임이 너무 빨라서 프로젝트 규모가 커질수록 이득이죠.

> esbuild는 es5 이하의 문법을 아직 100% 지원하지 않습니다. 즉 완벽한 인터넷 익스플로러 대응이 어렵습니다. IE 대응을 하려면 다른 대안을 찾는 것이 좋겠습니다.

꼭 알아야 할 내용은, esbuild는 **자바스크립트를 위한 번들러**입니다. 타입스크립트의 타입 체킹이나 프론트엔드 언어 (Vue, Angular) 지원, 핫 모듈 리로딩을 포함한 개발 서버 오픈 등 번들링과 관계 없는 기능들은 일체 없습니다. 그래서 저는 이 툴이 마음에 듭니다.

## esbuild 사용해보기

먼저 프로젝트를 초기화 해줍시다.

```bash
$ mkdir esbuild
$ cd esbuild
$ yarn init -y
$ yarn add -D esbuild
```

`esbuild`는 번들러이기 때문에 최초 진입할 파일 1개가 필요합니다. 그것도 같이 만들어주도록 하겠습니다.

```bash
$ mkdir src
$ touch src/main.js
```

저는 이번 포스팅에서 동물들을 찍어내고, 동물들의 울음소리를 출력하는 그러한 클래스를 만들어보겠습니다.

```js [src/main.js]
class Animal {
  constructor(sound) {
    this.sound = sound
  }

  Bark() {
    console.log(this.sound + '!')
  }
}
```

먼저 **동물**이라는 기본 베이스가 될 클래스를 만들고, 짖는 소리를 내는 Bark라는 함수를 만들었습니다.

다음은 이 동물을 상속받는 **개**를 한 번 만들어보도록 하겠습니다.

```js [src/main.js]
class Animal {
  constructor(sound) {
    this.sound = sound
  }

  Bark() {
    console.log(this.sound + '!')
  }
}

class Dog extends Animal {
  constructor() {
    super('멍멍')
  }
}

new Dog().Bark()
// 멍멍!
```

간단하게 개가 짖는 것 까지 만들었습니다. 그럼 바로 번들링을 해보도록 하겠습니다.

```json [package.json]
{
  "scripts": {
    "build": "esbuild src/main.js --bundle --outdir=dist"
  }
}
```

기존 package.json에 `scripts` 키를 추가하고, `build`라는 명령어를 실행시키는 스크립트를 작성했습니다. `--bundle` 옵션은 번들링을 하겠다는 뜻이고, `--outdir=dist`는 최종 결과물 파일을 dist 폴더 아래에 넣겠다는 뜻입니다.

그럼 빌드를 해봅시다.

```bash
$ yarn build # npm run build

# Log
$ esbuild src/main.js --bundle --outdir=dist
✨  Done in 0.05s.
```

작성한 코드가 거의 없긴 하지만, 0.05초는 정말 빠르네요.

결과물 파일은 이렇습니다.

```js [dist/main.js]
;(() => {
  // src/main.js
  var Animal = class {
    constructor(sound) {
      this.sound = sound
    }
    Bark() {
      console.log(this.sound + '!')
    }
  }
  var Dog = class extends Animal {
    constructor() {
      super('\uBA4D\uBA4D')
    }
  }
  new Dog().Bark()
})()
```

애초에 ES6로 작성해서 그런지, 딱히 바뀐 건 크게 없어보입니다. 한글로 된 부분은 유니코드로 변환되었고, 상단에 코드의 출처를 주석으로 달아주었네요.

## 번들링을 좀 더 자세히 알아보자

용도에 맞게 번들링을 시작하기 전에 알아두면 좋은 개념이 있습니다. 바로 `format` 입니다. 이 포맷에 관한 내용은 esbuild 뿐만 아니라, 다른 번들러들에서도 사용되는 개념이니 알아두면 좋습니다.

포맷은 용도에 따라 3가지로 나눌 수 있습니다.

- `iife`
- `cjs`
- `esm`

`iife` 는 immediately-invoked function expression의 약자이고, 브라우저에서 동작하는 포맷입니다.

`cjs`는 CommonJS라는 뜻이고, Node에서 default로 동작하는 포맷입니다.

마지막으로 `esm`은 ECMA Script라는 뜻으로, 브라우저와 노드 양쪽 모두에서 사용 가능한 포맷입니다.

내 코드가 브라우저랑 노드 양쪽 다 지원하면 좋으니까 포맷을 무조건 esm으로 해야지~ 라고 생각할 수 있지만, 당연히 결과물의 코드 양이 많아집니다. 용도에 맞게 포맷을 지정해서, 불필요하게 최종 결과물의 크기를 커지지 않도록 합시다.

esbuild에선 `platform` 이라는 옵션을 줘서 방금 소개한 `format`을 자동으로 지정해줍니다.

기본적으로 브라우저에서 사용 가능하도록 번들링하는 `browser`가 기본이고, 이 경우 `iife`포맷으로 트랜스파일링합니다.

만약 node에서만 사용 가능하도록 번들링하고 싶다면 platform 옵션을 `node`로 주면 됩니다. 이 경우 포맷은 `cjs`입니다.

아니면 브라우저와 노드 양쪽 모두에서 사용하고 싶을 땐 platform 옵션을 `neutral`로 설정합시다. 이 경우 포맷은 `esm`입니다.

저는 방금 만든 이 코드를 node에서만 사용할 예정이라, 아까 설정한 빌드 명령어를 바꾸도록 하겠습니다.

```json [package.json]
{
  "scripts": {
    "build": "esbuild src/main.js --bundle --outdir=dist --platform=node"
  }
}
```

## 빌드 스크립트 작성하기

벌써부터 빌드 명령어가 한 줄로 길어져서 보기가 안좋습니다. 앞으로 어떤 옵션이 더 추가될지 모르는데 이런 방식은 지양하는게 좋습니다.

보통 다른 툴들은 `.js`나 `.json` 형태의 설정 파일을 만들면, 해당 파일을 자동으로 읽어서 빌드를 실행합니다. 하지만 esbuild는 자바스크립트 모듈을 직접 실행시키는 방법을 사용합니다.

바로 스크립트를 작성해보도록 하겠습니다.

```bash
$ mkdir scripts
$ touch scripts/build.js
```

```js [scripts/build.js]
require('esbuild')
  .build({
    entryPoints: ['src/main.js'],
    outdir: 'dist',
    bundle: true,
    platform: 'node'
  })
  .catch(() => process.exit(1))
```

프로젝트에 scripts 폴더를 만들고, 그 아래 build.js 파일을 만들었습니다. 아까 명령어를 이해했으면, 이 설정 값도 직관적으로 바로 이해가 됩니다.

다음은 package.json에서 esbuild CLI가 아닌, 방금 작성한 자바스크립트를 실행시키게끔 코드를 변경해줍니다.

```json [package.json]
{
  "scripts": {
    "build": "node scripts/build.js"
  }
}
```

다시 `yarn build` 명령어로 빌드를 해보면, 같은 결과가 나옵니다.

## 코드 모듈화하기

우리가 만든 동물 클래스를 외부로 내보내진 않았기 때문에, 모듈은 아닙니다.

모듈로 만들어야 하는 경우는, 다른 프로젝트에서 이 동물 클래스를 사용하게 만들고 싶을 때입니다. [`npmjs.com`](https://www.npmjs.com/)에 올라온 패키지들이 전부 모듈인 것이죠.

모듈로 만드는 방법은 굉장히 간단합니다. 선언 시, `export`라는 접두어를 붙이면 됩니다.

```js [src/main.js]
export class Dog extends Animal {
  constructor() {
    super('멍멍')
  }
}
```

Dog 클래스에 export 접두어를 붙여주었습니다. 이 상태에서 빌드를 하면 다른 노드 프로젝트에서 이런 식으로 불러서 쓸 수 있게 됩니다.

```js [test.js]
import { Dog } from './dist/main'

new Dog().Bark()
```

루트 디렉토리에 `test.js`를 만들었고, 잘 작동하는지 테스트하기 위해 실행시켜줍시다.

```bash
$ node test.js

import { Dog } from './dist/main'
^^^^^^

SyntaxError: Cannot use import statement outside a module
```

오류가 발생했습니다. 이 문제는 Node가 자바스크립트를 읽을 때 CommonJS 방식으로 해석하기 때문에 발생하는 문제입니다. 우리가 번들링한 방식은 ECMA Script 포맷이었죠.

## 타입스크립트

그렇다면 어떻게 테스트 하느냐?

바로 자바스크립트 트랜스파일러인 [`Babel`](https://babeljs.io/)을 사용하면 됩니다. 하지만 타입스크립트를 도입한다면 바벨을 쓰지 않더라도 **어느정도**는 해결이 가능합니다.

그래서 여기에서 `typescript`를 이용하면 바벨 없이 런타임에 Node를 실행시키면서, 다른 유저들을 위한 `.d.ts` 파일까지 지원 가능해집니다. 심지어 개발 단계에서 타입 체킹까지 가능하니 일석삼조입니다.

고맙게도 esbuild는 확장자가 `.ts`인 파일에 대해 자동으로 처리해줍니다.

그럼 아까 만든 파일의 확장자를 `.ts`로 바꿔줍시다.

```ts [src/main.ts]
export interface IAnimal {
  sound: string
}

class Animal implements IAnimal {
  sound: string

  constructor(sound: string) {
    this.sound = sound
  }

  Bark() {
    console.log(this.sound + '!')
  }
}

export class Dog extends Animal {
  constructor() {
    super('멍멍')
  }
}
```

이렇게만 해도 번들링은 잘 되지만, esbuild는 타입스크립트의 타입 체킹을 빌드할 때 해주지는 않습니다. 단순히 코드를 읽어서 바꿔주기만 하는 것이죠. 또 `.d.ts` 파일을 만들어주지도 않습니다.

공식 문서에선 esbuild가 번들링에만 치중하기 때문에, 앞으로도 지원할 가능성은 매우 낮다고 얘기합니다.

제대로 타입스크립트를 활용하려면 몇 가지 패키지를 설치하고, 설정 파일인 `tsconfig.json`도 필요합니다.

```bash
$ yarn add -D typescript ts-node @types/node
$ node_modules/.bin/tsc --init
```

두 번째 명령어를 실행하면 `tsconfig.json` 보일러 플레이트를 만들 수 있고, 저는 이렇게 사용하도록 하겠습니다.

```json [tsconfig.js]
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "outDir": "dist",
    "declaration": true,
    "emitDeclarationOnly": true,
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["./src/**/*"]
}
```

여기선 두 가지가 중요합니다.

`declaration` 옵션은 `d.ts` 파일을 만들겠다는 뜻이고, `emitDeclarationOnly`는 tsc 내장 번들링을 사용하지 않고, 단순 타입 체킹만 하겠다는 뜻입니다.

그럼 다음으로 CLI를 실행할 빌드 스크립트로 수정해줍시다.

```json [package.json]
"scripts": {
  "build": "tsc && node scripts/build.js"
},
```

이제 명령어를 실행하면 tsc로 타입 체킹을 한뒤, 문제가 없다면 `d.ts` 파일을 만들고, 그 이후 esbuild를 이용해 빠르게 번들링하는 과정이 진행됩니다.

## 마무리

여기까지 간단하게 `esbuild`와 `typescript`를 이용해 아주 간단한 모듈을 만드는 것 까지 알아보았습니다.

### 참고

- https://esbuild.github.io/faq
- https://news.hada.io/topic?id=3587
- https://d2.naver.com/helloworld/12864
- https://helloworldjavascript.net/pages/293-module.html
