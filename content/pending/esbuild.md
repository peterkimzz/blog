---
category: tech
title: 웹팩보다 100배 빠른 번들러, esbuild
description: Template description
thumbnail: https://images.unsplash.com/photo-1519682337058-a94d519337bc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80
updated: 2021-02-16
created: 2021-02-16
---

이번 글은 떠오르는 차세대 자바스크립트 번들러 `esbuild`에 대한 내용입니다.

작년 Github에서 떠오르는 번들링 프로젝트 중 1위를 차지했고, 오늘을 기준으로 20만개의 가까운 Github Star를 받았습니다.

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

꼭 알아야 할 내용은, esbuild는 **자바스크립트를 위한 번들러**입니다. 타입스크립트의 타입 체킹이나 프론트엔드 언어 (Vue, Angular) 지원, 핫 모듈 리로딩을 포함한 개발 서버 오픈 등 번들링과 관계 없는 기능들은 일체 없습니다. 그래서 툴이 가볍고, 더욱 제 마음에 듭니다.

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

먼저 `동물`이라는 기본 베이스가 될 클래스를 만들고, 짖는 소리를 내는 Bark라는 함수를 만들었습니다.

다음은 이 동물을 상속받는 `개`를 한 번 만들어보도록 하겠습니다.

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
(() => {
  // src/main.js
  var Animal = class {
    constructor(sound) {
      this.sound = sound;
    }
    Bark() {
      console.log(this.sound + "!");
    }
  };
  var Dog = class extends Animal {
    constructor() {
      super("\uBA4D\uBA4D");
    }
  };
  new Dog().Bark();
})();
```

애초에 ES6로 작성해서 그런지, 딱히 바뀐 건 크게 없어보입니다. 한글로 된 부분은 유니코드로 변환되었고, 상단에 코드의 출처를 주석으로 달아주었네요.

## 번들링을 좀 더 자세히 알아보자

용도에 맞게 번들링을 시작하기 전에 알아두면 좋은 개념이 있습니다. 바로 `format` 입니다. 이 포맷에 관한 내용은 esbuild 뿐만 아니라, 다른 번들러들에서도 사용되는 개념이니 알아두면 좋습니다.

포맷은 용도에 따라 3가지로 나눌 수 있습니다.

- iife
- cjs
- esm

`iife` 는 immediately-invoked function expression의 약자이고, 브라우저에서 동작하는 포맷입니다.

`cjs`는 CommonJS라는 뜻이고, Node에서 동작하는 포맷입니다.

마지막으로 `esm`은 ECMA Script라는 뜻으로, 브라우저와 노드 양쪽 모두에서 사용 가능한 포맷입니다.

내 코드가 브라우저랑 노드 양쪽 다 지원하면 좋으니까 포맷을 무조건 esm으로 해야지~ 라고 생각할 수 있지만, 당연히 결과물의 코드 양이 많아집니다. 용도에 맞게 포맷을 지정해서, 불필요하게 최종 결과물의 크기를 커지지 않도록 합시다.

esbuild는 기본적으로 브라우저에서 사용 가능하도록 번들링하는 `iife`가 기본값입니다.

만약 node에서만 사용 가능하도록 번들링하고 싶다면 platform 옵션을 `node`로 주면 됩니다.

아니면 브라우저와 노드 양쪽 모두에서 사용하고 싶을 땐 platform 옵션을 `neutral`로 설정합시다.

저는 방금 만든 이 코드를 node에서만 사용할 예정이라, 아까 설정한 빌드 명령어를 바꾸도록 하겠습니다.

```json [package.json]
{
  "scripts": {
    "build": "esbuild src/main.js --bundle --outdir=dist --platform=node"
  }
}
```

## 빌드 스크립트 작성하기

벌써부터 빌드 명령어가 한 줄로 길어져서 보기가 안좋습니다. 앞으로 어떤 옵션이 더 추가될지 모르는데 이런 방식은 지양하고 싶네요.

보통 다른 툴들은 `.js`나 `.json` 포맷으로, 독자적인 파일을 만들면 알아서 설정 파일을 읽어서 빌드를 실행합니다. 하지만 esbuild는 자바스크립트 모듈을 직접 실행시키는 방법을 사용합니다.

바로 스크립트를 작성해보도록 하겠습니다.

```bash
$ touch scripts/build.js
```

```js [scripts/build.js]
require('esbuild').build({
  entryPoints: ['src/main.js'],
  bundle: true,
  platform: 'node',
  outdir: 'dist',
}).catch(() => process.exit(1))
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

우리가 만든 동물 클래스를 외부로 내보내진 않았기 때문에, 모듈이라고 하기에는 무리가 있습니다. 

### 참고

- https://esbuild.github.io/faq
- https://news.hada.io/topic?id=3587