---
category: tech
title: 웹팩보다 100배 빠른 번들러, esbuild
description: Template description
thumbnail: https://images.unsplash.com/photo-1519682337058-a94d519337bc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80
updated: 2021-02-13
created: 2021-02-13
---

이번 글은 떠오르는 차세대 자바스크립트 번들러 `esbuild`에 대한 내용입니다.

2020년 1년간 Github에서 떠오르는 번들링 프로젝트 중 1위를 차지했고, 20만개의 가까운 Github Star를 받았습니다.

웹팩보다 100배 빠르다는 건 어그로가 아닙니다. 아래 그림을 봐주시죠.

![](https://github.com/evanw/esbuild/raw/master/images/benchmark.svg)

위 벤치마크는 메이저 자바스크립트 번들러들을 비교한 표입니다.

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

<!--more-->
훌륭합니다. 이 정도만 지원되도 혼자 혹은 소규모 조직에서 사용하기에 무리가 없습니다. 오히려 빌드 타임이 너무 빨라서 이득이죠.

## esbuild 사용해보기

먼저 프로젝트를 초기화 해줍시다.

```bash
$ mkdir esbuild
$ cd esbuild
$ yarn init -y
$ yarn add -D esbuild
```

Here's a simple footnote,[^1] and here's a longer one.[^bignote]

[^1]: This is the first footnote.

[^bignote]: Here's one with multiple paragraphs and code.

    Indent paragraphs to include them in the footnote.

    `{ my code }`

    Add as many paragraphs as you like.

### 참고

- https://esbuild.github.io/faq
- https://news.hada.io/topic?id=3587