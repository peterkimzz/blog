---
category: tech
title: 평생 무료인 모니터링 도구 10분만에 만들기
updated: 2021-09-14
created: 2021-09-03
thumbnail: https://user-images.githubusercontent.com/20244536/132088930-d2a8a3a0-8772-46c5-9815-87e671a20eae.png
published: true
---

서버를 운영하다보면 예상치 못한 서버 다운이나 응답 속도 저하를 반드시 겪게 됩니다. 원인은 둘째 치구요. 근데 문제는 서버 장애를 원천 차단할 방법이 사실상 없기 때문에, 우리 개발자들이 24시간 눈을 뜨고 지켜볼 수 밖에 없겠습니다.

<!--more-->

![1611196673948-3fc16ccbe0](https://user-images.githubusercontent.com/20244536/131988431-ebd95bbc-ad29-4ea3-a22f-30f3287faddc.jpg)

울지 마시구요.. 그래도 개발자들은 어떻게든 (반)자동화를 하며 버텨온 사람들입니다.

근데 정말 슬프게도 서버 장애를 원천 차단할 수 있는 방법은 존재하지 않습니다. 다만 24시간 서버를 쳐다보는게 아니라, 장애가 발생했을 때만 알림을 받아서 최대한 빠르게 장애를 해결하면 됩니다.

이런 행위를 **모니터링** 이라고 합니다. 이번 포스팅에서 어떤 서비스든 10분만에 평생 무료로 모니터링 도구를 배포하는 방법을 알아보겠습니다.

## 작동 원리

근데 본격적으로 모니터링을 하기 전에, 이 도구 원리를 잠깐만 생각해봅시다.

모니터링 도구가 없다면 개발자가 계속해서 서버 상태를 확인하면 됩니다. 그리고 혹시나 장애가 발생했을 때 바로 대응하면 되겠죠.

이 모니터링 행위를 자동화 한다고 가정해봅시다. 웹사이트 혹은 API 서버의 상태가 정상적인지 주기적으로 파악하기위해 계속해서 서비스에 HTTP 요청을 하면 되겠죠. 그리고 오류가 발생했을 땐 어딘가로 알림을 보내는거죠.

간단하죠?

## Upptime.js

제가 이번 포스팅에서 소개할 툴은 [`Upptime.js`](https://github.com/upptime/upptime) 이라는 오픈소스 프로젝트입니다. 오로지 `GitHub` 생태계에만 의존하는 아주 바람직한 프로젝트입니다.

이 툴의 원리는 다음과 같습니다.

1. `Github Actions`의 스케줄링 기능을 이용해 미리 정의된 엔드포인트에 주기적으로 HTTP/TCP 요청을 날립니다 (기본 값: 5분).

2. `Upptime`이 체크하는 여러가지 사항 중 응답이 저하되거나 다운되는 경우, 새로운 `Github Issue`를 발행합니다.

3. 이후 서버 장애가 해결되면 해당 `Github Issue`는 Close 됩니다.

4. 이 리포트 결과를 `Github Pages`로 만들어진 웹 대시보드를 통해 언제든지 확인할 수 있습니다.

모든 리소스를 오로지 `Github` 에만 의존하고 있다는 것 자체가 엄청난 장점입니다.

그럼 여기까지 간단하게 작동 원리를 알아보았으니, 우리만의 모니터링 웹 대시보드를 만들어보겠습니다.

## 시작하기

저는 이 블로그의 상태를 확인하기 위한 모니터링 페이지를 만들어보도록 하겠습니다.

먼저 [https://github.com/upptime/upptime](https://github.com/upptime/upptime) 이 링크를 눌러 리파지토리를 클론합시다.

![image](https://user-images.githubusercontent.com/20244536/132086435-d2fcedd9-49ef-4834-9ec7-6601823bec59.png)

이 프로젝트는 템플릿화된 리파지토리입니다. 그래서 위 이미지의 우측 상단 **Use This Template** 버튼을 눌러 내 계정 혹은 조직으로 리파지토리를 클론할 수 있습니다.

![image](https://user-images.githubusercontent.com/20244536/132086490-e2354789-a6ef-407e-b595-a1d526fda9cc.png)

프로젝트를 클론하실 때 프로젝트 이름은 아무거나 넣어도 상관 없지만, 아래 두 가지 사항은 지켜주세요.

1. 공개 여부를 `Public` 으로 설정해주세요.

2. 제일 하단 `Include all branches` 를 체크해주세요.

프로젝트를 공개 여부는 사실 필수 사항은 아니지만, 비공개로 설정하면 웹 페이지를 호스팅할 때 API 프록시 설정을 해줘야 합니다. 웹 페이지가 굳이 필요하지 않다면 비공개로 설정하셔도 무방합니다.

하지만 `GitHub Actions`의 빌드 타임이 공개 프로젝트는 무제한인 반면, 비공개 프로젝트에 대해서는 한 달에 2,000분 밖에 제공되지 않습니다. (Free tier 기준)

`Upptime.js` 특성상 빌드 타임이 기본 값인 5분으로 설정했을 때 약 3,000분에 가깝게 소요되기 때문에 무조건 비용이 발생하게 됩니다. 그러니 굳이 비공개로 해야할 필요가 없다면 공개 하시는 걸 추천드리겠습니다.

그리고 모든 브랜치를 포함해야하는 이유는, 이미 포함되어 있는 `gh-pages` 브랜치를 가져와야 이후 단계에서 설정을 마치고 `GitHub Pages` 를 통해 정상적으로 웹 페이지를 호스팅할 수 있기 때문입니다.

## GitHub Pages

프로젝트를 잘 클론했다면 `Settings` -> `Pages` 탭으로 이동해 `Source` 부분의 브랜치가 `gh-pages` 의 루트 폴더를 가리키고 있는지 확인해줍시다.

![image](https://user-images.githubusercontent.com/20244536/132087081-80c519d6-68d7-474c-89f6-92b1048bdf96.png)

저의 경우 `https://peterkimzz.github.io/upptime` 이라는 공개 링크가 생성되었습니다. 접속해보면 설정을 모두 마친 게 아니라서 정상적으로 작동하진 않을겁니다.

## PAT & Secret

PAT는 `Personal Access Token`의 약자입니다. 그냥 `GitHub` 리소스를 사용할 때 필요한 권한을 지닌 토큰이라고 생각하면 됩니다.

내 권한을 동일하게 가진 토큰이기 때문에, 공개 페이지에 저장하지 않도록 보안에 신경 써주세요.

발급 방법은 다음과 같습니다.

![image](https://user-images.githubusercontent.com/20244536/132087358-ab43e744-b27f-4881-991d-743025bb347a.png)

대시보드 우측 상단 내 프로필을 눌러 `Settings`로 이동합니다.

![image](https://user-images.githubusercontent.com/20244536/132087375-5b8b5a4d-25c5-4f97-acca-1486913efbac.png)

그리고 왼쪽 메뉴의 `Developer Settings`로 이동한 다음, 다시 `Personal access tokens` 탭으로 이동해주세요.

![image](https://user-images.githubusercontent.com/20244536/132087389-642e03de-a011-4494-96e7-a3d51d45765b.png)

토큰을 생성하기 위해 우측 상단 `Generate new token` 버튼을 눌러주세요.

우리는 오로지 `Upptime.js`을 정상적으로 작동시키기 위한 `Upptime.js`전용 토큰을 발행할겁니다. 불필요한 권한을 주지 않는 것도 보안을 강화하는 방법입니다.

![image](https://user-images.githubusercontent.com/20244536/132087443-b1834635-8966-4dd0-8e48-3bb0f0851966.png)

`Note` 칸에는 이 토큰이 어떤 목적을 가진 토큰인지 자유롭게 적어주면 됩니다.

그리고 토큰 만료 기간은 설정하는 게 보안상 좋지만, 솔직히 갱신시켜주는 거 너무 귀찮기 때문에 저는 만료 없이 발행했습니다.

필요한 권한은 `repo` 와 `workflow` 입니다.

![image](https://user-images.githubusercontent.com/20244536/132087531-c20f082f-d837-4e2b-9b71-8c3c725bfced.png)

이 키는 생성 후 딱 한 번만 볼수 있으니까 저장해서 어디 노트에 저장해두시길 바랍니다.

자 이제 `PAT` 를 만들었으니 이 토큰을 `Upptime.js` 가 사용할 수 있게 리파지토리에 저장해줍시다.

![image](https://user-images.githubusercontent.com/20244536/132087647-4437bc4d-99ac-427d-a273-c8b856a7d0ec.png)

다시 아까 만든 리파지토리의 `Settings` -> `Secrets` 탭으로 이동해서, 우측 상단 `New repository secret` 버튼을 눌러주세요.

![image](https://user-images.githubusercontent.com/20244536/132087672-2c5e1dad-4a8e-4e93-8029-0598d6e79e06.png)

`Name` 은 꼭 `GH_PAT` 로 설정해주세요.

`Value` 에는 방금 만든 토큰을 넣어주면 됩니다.

![image](https://user-images.githubusercontent.com/20244536/132087703-5360c4de-ef16-45be-aaf8-c105be977b7b.png)
_토큰이 잘 생성되었다_

이 토큰을 `Secret` 으로 저장하는 이유는, `GitHub Actions` 가 작업 중일 때 비공개로 전달해야하는 값들을 안전하게 저장하기 위함입니다.

## 설정하기

자, 마지막 단계입니다. 프로젝트를 열어 `.upptimerc.yml` 파일만 수정하면 됩니다.

아래는 초기 설정 값입니다.

```yml [.upptimerc.yml]
# Change these first
owner: upptime # Your GitHub organization or username, where this repository lives
repo: upptime # The name of this repository

sites:
  - name: Google
    url: https://www.google.com
  - name: Wikipedia
    url: https://en.wikipedia.org
  - name: Hacker News
    url: https://news.ycombinator.com
  - name: Test Broken Site
    url: https://thissitedoesnotexist.koj.co

status-website:
  # Add your custom domain name, or remove the `cname` line if you don't have a domain
  # Uncomment the `baseUrl` line if you don't have a custom domain and add your repo name there
  cname: demo.upptime.js.org
  # baseUrl: /your-repo-name
  logoUrl: https://raw.githubusercontent.com/upptime/upptime.js.org/master/static/img/icon.svg
  name: Upptime
  introTitle: '**Upptime** is the open-source uptime monitor and status page, powered entirely by GitHub.'
  introMessage: This is a sample status page which uses **real-time** data from our [GitHub repository](https://github.com/upptime/upptime). No server required — just GitHub Actions, Issues, and Pages. [**Get your own for free**](https://github.com/upptime/upptime)
  navbar:
    - title: Status
      href: /
    - title: GitHub
      href: https://github.com/$OWNER/$REPO
# Upptime also supports notifications, assigning issues, and more
# See https://upptime.js.org/docs/configuration
```

뭐 이것저것 텍스트가 많은데, 필수적인 것들만 짚고 넘어가도록 하겠습니다.

- `owner` : 내 유저명 혹은 조직 명을 넣어주면 됩니다.
- `repo` : 리파지토리 이름을 넣어주세요.
- `sites` : 모니터링하고 싶은 링크 주소를 배열로 넣어주세요. 100개 이상도 가능합니다.
- `status-website.name` : 웹사이트 이름을 넣어주세요.

아래는 둘 중 하나만 설정하시면 됩니다.

- `status-website.cname` : 커스텀 도메인을 사용하는 경우, 호스팅 할 도메인 명을 넣어주세요.
- `status-website.baseUrl` : 커스텀 도메인을 사용하지 않는 경우에 리파지토리 명을 넣어주면 됩니다.

나머지는 대시보드 꾸미기용이라, 나중에 문서를 읽어보며 설정해보시길 바랍니다.

하나 언급할 내용은, `sites`에 엔드포인트를 넣어줄 때 다양한 방식으로 HTTP 요청 방식을 보내는 것도 가능합니다.

Header를 포함한 HTTP GET 요청

```yml
- name: API endpoint
  url: https://example.com/get-user/3
  headers:
    - 'Authorization: Bearer $SECRET_SITE_2' # Repository Secret을 이용하는 방법
    - 'Content-Type: application/json'
```

Body를 포함한 HTTP POST 요청

```yml
- name: API endpoint with data
  method: POST
  url: https://example.com/login
  headers:
    - 'Content-Type: application/json'
  body: '{ "password": "hello" }'
```

원하는 응답 코드만 필터링하는 방법도 있습니다.

```yml
sites:
  - name: Google
    url: https://www.google.com
    expectedStatusCodes:
      - 200
      - 201
      - 404
```

응답 시간을 제한하는 방법도 있습니다.

```yml
- name: Slow endpoint
  url: https://example.com
  maxResponseTime: 5000
```

공개 페이지를 만드는 경우, 웹 URL을 숨기고 싶을 수도 있습니다. 그런 경우에는 아까처럼 `Repository Secrets` 을 이용하면 됩니다.

```yml
- name: Secret Site
  url: $SECRET_SITE
```

## 설정 마무리

어쨌든 저는 다 필요 없고 제 블로그가 잘 접속이 되는지 확인하고, 커스텀 도메인을 사용할 예정이기 때문에 아래처럼 구성했습니다.

```yml [.upptimerc.yml]
owner: peterkimzz
repo: upptime

sites:
  - name: peterkimzz.com
    url: http://peterkimzz.com

status-website:
  name: Upptime for peterkimzz.com
  cname: upptime.peterkimzz.com
```

이 상태로 코드를 커밋하고 푸시하면 알아서 북치고 장구치고 다 해줍니다.

참고로 커스텀 도메인을 붙이시는 분들은 도메인 네임 서버로 가셔서 `CNAME` 서브도메인 값에 `USERNAME.github.io` 를 넣어주시고 인증서가 발행될 때 까지 15분 정도 기다리셔야 합니다.

이 내용은 예전 [Github Pages로 개인 블로그 평생 무료로 운영하기](/github-pages-nuxtjs) 에도 다루었던 내용이므로 참고해주세요.

## 알림 설정하기

알림을 따로 설정하지 않더라도 내 `GitHub` 계정에 등록된 이메일로 이슈를 발송해주긴 합니다. 하지만 대부분의 경우 알림을 바로 받아보고 싶으실테니 직접 설정해보도록 하겠습니다.

현재 지원되는 제공 업체는 `Slack`, `Discord`, `Telegram`, `SMS` 와 `Email` 입니다.

저는 제가 자주 사용하는 `Discord` 채널에 알림을 보내도록 설정하겠습니다.

![image](https://user-images.githubusercontent.com/20244536/132088656-fabe6029-7932-49e1-9c4f-5133bd04a83b.png)

먼저 알림을 받고 싶은 `Discord` 채널 우측 **채널 편집** 을 눌러 설정 페이지로 이동해주세요.

![image](https://user-images.githubusercontent.com/20244536/132088693-da470e7f-7989-4e8a-920f-a43c70e657a1.png)

왼쪽 탭의 **연동** 버튼을 누른 뒤, **웹후크** 를 선택해주세요.

![image](https://user-images.githubusercontent.com/20244536/132088703-6096933f-f2bd-49a2-8e78-21346764a3ee.png)

**새 웹후크** 버튼을 누르면 가장 하단 카드가 생기고, 웹 후크의 이름과 알림을 받을 채널을 선택할 수 있습니다. 이름은 아무거나 설정해주세요.

그리고 **웹후크 URL 복사** 버튼을 눌러 잘 저장해두세요.

![image](https://user-images.githubusercontent.com/20244536/132088785-4e4bd51a-9ee8-467c-bf85-e8aacac5d60b.png)

마지막으로 아까 했던 `Repository Secrets` 로 이동해서 3개의 값을 추가해주면 됩니다.

- `NOTIFICATION_DISCORD` : true
- `NOTIFICATION_DISCORD_WEBHOOK` : true
- `NOTIFICATION_DISCORD_WEBHOOK_URL` : 웹후크 URL 주소

![image](https://user-images.githubusercontent.com/20244536/132088792-e37f235e-b293-4f53-a3c7-0476b9269c8f.png)

알림 설정은 이걸로 끝입니다.

우리가 모니터링 중인 엔드포인트에 문제가 생기면 바로 알림을 보내주고, 다시 복구가 됐을 때도 알림을 보내줄겁니다.

![image](https://user-images.githubusercontent.com/20244536/132088842-2ebcf129-7708-4b2d-8e1d-86660de074b6.png)
_실제 운영 중인 서버가 잠시 다운 됐다가, 다시 복구되었을 때 알림을 받은 모습_

## 마무리

![image](https://user-images.githubusercontent.com/20244536/132112607-ab361637-c15d-4583-a148-861dbf85db40.png)
_대시보드 화면_

이렇게 해서 저는 [https://upptime.peterkimzz.com](https://upptime.peterkimzz.com) 이라는 평생 무료인 모니터링 용 웹 대시보드를 10분만에 갖게 되었습니다.

개인 프로젝트나 재직 중인 회사에서도 충분히 도입할만한 가치가 있는 프로젝트이므로, 무료로 무한으로 즐겨보세요.

### 참고

- [Upptime.js Official Website](https://upptime.js.org/)
- [Upptime.js Official Documentation](https://upptime.js.org/docs/)
