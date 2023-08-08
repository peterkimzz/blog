---
category: tech
title: "[Nuxt 3] 사이드 프로젝트 만들기 - 인증"
updated: 2022-04-17
created: 2022-04-17
thumbnail: https://user-images.githubusercontent.com/20244536/158020130-9fbf9873-9bdf-43ca-81a8-45cbe5ac900b.png
published: false
---

저번 [사이드 프로젝트 만들기 - 개발 환경 설정편](/nuxt3-sideproject-2/)에선 `nuxt3`의 주요 변경점을 알아보았습니다. 이번엔 우리의 기획했던 기능들을 구현하기 위한 프론트엔드와 백엔드측 작업들을 같이 해보겠습니다.

## 인증

사용자들이 경품 이벤트를 직접 만들고 관리하려면 사용자 인증이 꼭 필요하겠죠. 회원가입, 로그인을 만들어보겠습니다.

많은 B2C 서비스들처럼 카톡, 구글 로그인 같은 OAuth2 인증을 탑재하면 좋겠지만 우리가 만들 서비스는 B2B에 가까워서 이벤트/마케팅 담당자들이 업무용 계정을 카톡이나 구글로 생성하지 않았을 가능성이 높습니다. 그래서 UX를 위해 비밀번호를 받을 수 밖에 없습니다.

그러면 바로 백엔드측 작업을 해보도록 하겠습니다. 근데 백엔드는 원래 기존에 제가 운영하던 서버에 추가할 생각이었는데, 이 글이 강의를 위한 목적이다보니 기존에 있던 프로젝트를 가져오면 이해가 안되실 것 같아 그냥 같이 새로 만들어보려고 합니다.

일단 저는 프로젝트를 이렇게 관리합니다. 지금은 조직명을 `drawbeat` 이라고 가정하겠습니다.

```bash
projects/
└─ @drawbeat/
    ├── www.drawbeat.com/ # 메인 서비스
    ├── api.drawbeat.com/ # 백엔드
    └── app.drawbeat.com/ # 기업고객을 위한 대시보드 서비스
```

`GitHub`에서도 리파지토리 이름을 도메인명과 동일하게 생성이 가능하기 때문에 이렇게 하면 처음보는 사람도 이해하기 쉽겠죠. 어쨌든 백엔드측 구성을 위해 폴더를 생성해주세요. (근데 여러분 마음대로 하셔도 됩니다)

```bash
mkdir api.drawbeat.com && cd api.drawbeat.com
yarn init -y
```

`package.json` 까지 만들었다면 필요한 패키지들을 설치해보겠습니다.

```bash
yarn add express
yarn add -D nodemon typescript ts-node @types/node @types/express
```

간단한 패키지 설명입니다.

- [`express`](https://expressjs.com/ko/): Node에서 사용하는 서버측 프레임워크입니다. 순정 Node로 서버 개발해도 상관은 없는데, 오랫동안 안정적으로 국룰처럼 사용되었으니 사용 안할 이유는 없겠죠
- [`nodemon`](https://www.npmjs.com/package/nodemon): 핫 리로드를 위해 사용합니다. 코드 변경시 알아서 서버를 재시작 해주는 역할입니다.
- `@types`: 타입스크립트를 사용할 땐 `.d.ts` 로 끝나는 타입 정의 파일이 프로젝트에 있다면 자동으로 읽어서 개발할 때 도움을 줍니다. 그것들만 모은 패키지입니다

타입스크립트를 사용하기위해 `tsconfig.json` 파일을 만들어줍시다. 아래 명령어를 입력해주세요.

```bash
npx tsc --init
```

이러면 자동으로 파일이 생깁니다. 파일 열어보면 뭐 엄청 많은데, 일단 그냥 넘어갑시다. 설명하려면 한참걸려요.

그럼 간단하게 작동하는 서버 파일을 하나 작성하겠습니다. 루트 폴더에 `src` 폴더를 만들고, 그 안에 `app.ts` 파일을 만들어주세요.
