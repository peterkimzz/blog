---
category: tech
title: 평생 무료로 반응형 이메일 템플릿 무한대로 만들기 - mjml.io
updated: 2022-01-07
created: 2022-01-07
thumbnail:
published: true
---

저는 이메일을 데스크톱과 모바일 환경에서 매일매일 확인합니다. 그런데 아직도 모바일 디스플레이에 최적화되지 않은 이메일을 받을 때가 많습니다.

어차피 확대해서 보면 되니까 크게 상관 없긴하지만, 누군가는 이메일 열었는데 잘 안보이면 짜증나서 이메일을 바로 닫아버릴 수도 있겠죠. 안그래도 내가 보낸 이메일 열게 하는 것도 힘든데 말이죠.

그래서 준비했습니다. 이메일을 좀 더 있어보이게 만들고 싶은 분들을 위해 이번엔 **무료로 반응형 이메일 템플릿을 무한으로 즐기는 방법**을 소개해드리려고 합니다. (명륜진사메일)

<!--more-->

저번에 작성한 [평생 무료로 커스텀 이메일 사용하기](/custom-email-service-for-free-forever) 포스팅에서는 `Node.js` 에서 프로그래밍적으로 이메일을 보내는 방법을 알아보았습니다. 저번 포스팅과 시리즈처럼 이어지는 내용입니다.

## [mjml.io](https://mjml.io)

> The only framework that makes responsive email easy

공식 홈페이지에 들어가면 가장 먼저 나오는 문구입니다. 멋지네요.

`mjml.io` 을 사용하는 방법은 2가지가 있습니다. 아 근데 `HTML` 을 어느정도 작성할 줄 알아야 합니다.

1. `npm install mjml`

2. 온라인 에디터

사실 제대로 사용하려면 2번은 필수고, 1번은 옵션입니다. 온라인 에디터에서 템플릿 작성하면서 미리보기 화면으로 이메일이 어떻게 보여질지 실시간으로 봐야하니까요.

`mjml`이 반응형 이메일을 만들어주는 건 내부 원리는 간단합니다. `mjml` 문법에 맞춰 콘텐츠를 작성하면, 반응형 이메일이 되도록 `HTML`으로 바꿔주는게 전부입니다.

아 그리고 `mjml` 의 장점 하나 더 있습니다. 이메일을 읽어들이는 클라이언트 앱에 상관없이 같은 스타일링을 보장해줍니다.

무슨 말이냐면 이메일을 읽어주는 클라이언트 앱이 사실 엄청 많습니다. Outlook, Office 365, Gmail, iOS 메일 앱 등등 엄청 많죠. 근데 그게 크롬이랑 파이어폭스가 자바스크립트, 보안 룰이랑 스타일링 조금씩 다르게 적용하는 것 처럼, 이메일 클라이언트들도 각자 조금씩 다릅니다. 근데 `mjml` 은 (어느정도는) 똑같이 보이도록 대응해줍니다. 이거 하나하나 대응하는 거 못할 짓입니다.

호환성 문서는 [여기](https://mjml.io/compatibility/mj-section)를 참고해주세요.

## 시작하기

일단 [온라인 에디터](https://mjml.io/try-it-live)에 접속합니다. 기본 템플릿이 미리 작성되어있습니다.

```mjml [mjml]
<mjml>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-image width="100px" src="/assets/img/logo-small.png"></mj-image>

        <mj-divider border-color="#F45E43"></mj-divider>

        <mj-text font-size="20px" color="#F45E43" font-family="helvetica"
          >Hello World</mj-text
        >
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
```

`HTML` 이랑 코드 작성하는게 완전히 똑같죠? 엄청 쉽습니다. 사용 가능한 모든 태그는 [여기](https://documentation.mjml.io/#components)에서 확인 가능합니다.

근데 일단 코드 작성하기 전에 이메일을 어떻게 구성할지 기획부터 합시다.

보통 일반적인 이메일의 구성은 상단에 기업 로고가 있고 바로 본문, 그리고 하단에는 서비스 관련 링크나 수신 거부, SNS 링크 등이 있죠.

아직 제 블로그의 뉴스레터 구독 기능은 없지만, 구독 신청을 해준 사람들에게 바로 감사 이메일을 작성하는 이메일을 작성한다고 생각하고 이메일을 만들어보도록 하겠습니다.

```mjml [mjml]
<mjml>
  <mj-body>
    <mj-section>
      <mj-column>
        <!-- Header -->
        <mj-image
          width="150px"
          src="https://user-images.githubusercontent.com/20244536/148511699-e4d03a86-7b71-40c4-9cda-975e64687ff0.png"
        ></mj-image>
        <mj-spacer height="20px"></mj-spacer>

        <!-- Main -->
        <mj-text font-size="16px" line-height="1.5">
          안녕하세요 **님! 제 개인 블로그 peterkimzz.com 을 구독해주셔서
          감사합니다.
        </mj-text>

        <mj-text font-size="16px" line-height="1.5">
          최소 2주에 1번 정도는 도움이 될만한 글들을 꼭 포스팅 해보도록
          하겠습니다. 구독해주셔서 정말 감사합니다!
        </mj-text>

        <mj-text font-size="16px" line-height="1.5"> 김동현 드림 </mj-text>

        <!-- Footer -->
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
```

![image](https://user-images.githubusercontent.com/20244536/148514261-2496b382-82a4-427e-9cbc-1837e6fcef5d.png)

먼저 헤더측과 본문 측을 나누고, 헤더엔 로고를 넣고 본문에 전달 사항을 작성했습니다. 저 `**님` 부분은 나중에 스크립트로 이름 대치해서 넣어주면 받는 사람이 좀 더 기분 좋겠네요.

여기서 한가지 꿀팁은 로고 주소를 원격 저장소에 저장된 링크를 사용하는 게 좋습니다.

이유는 이메일은 한 번 발송되면 내용을 수정할 수가 없기 때문입니다. 하지만 링크는 주소는 유지하면서 콘텐츠는 수정할 수 있죠. 이걸 활용하면 이미 보낸 수 많은 이메일의 기업 로고를 리뉴얼된 새 로고로 전부 바꾼다거나 하는 일이 가능해집니다. 또, [bit.ly](https://bit.ly/) 같은 링크 리디렉션 서비스를 이용해서 이미 보낸 이메일도 링크 주소를 다르게 변경할 수도 있겠습니다.

이렇게만 해도

```mjml [mjml]
<!-- Footer -->
<mj-divider border-color="#E5E7EB" border-width="1px"></mj-divider>

<mj-text
  align="center"
  font-family="Pretendard, Arial"
  font-size="12px"
  line-height="1.75"
>
  <a
    href="https://www.peterkimzz.com"
    target="_blank"
    rel="noopener noreferrer nofollow"
    >웹사이트</a
  >
  <span>·</span>
  <a
    href="https://www.instagram.com/peterkimzz"
    target="_blank"
    rel="noopener noreferrer nofollow"
    >인스타그램</a
  >
</mj-text>

<mj-text
  align="center"
  font-family="Pretendard, Arial"
  font-size="12px"
  line-height="1"
>
  © Peter Kim. All Rights Reserved.
</mj-text>
```

![image](https://user-images.githubusercontent.com/20244536/148514316-3c2e04fd-0598-41f0-9499-d1649892f469.png)

내용이 길어져서 Footer 쪽만 작성했습니다. 얇은 선으로 Footer 영역을 구분하고, 제 블로그 링크와 개인 인스타그램 주소를 넣었습니다. 회사 메일이라면 홈페이지, 이용약관, 개인정보처리방침 등을 넣으면 되겠죠.

이렇게만 해도 그냥 텍스트만 보내는 것 보다 훨씬 낫죠? 생각보다 이메일 작성하는 거 어렵지 않습니다.

## 스타일링 개선

하지만 몇 가지 아쉬운 부분은 있습니다. 본문 첫 문단의 **감사합니다** 부분이 공간이 모자라서 중간에 글자가 잘렸습니다. 그리고 폰트도 좀 더 깔끔한 걸로 바꿔주면 좋을 것 같고, 채도도 조금 낮춰주면 더 읽기 편할 것 같습니다. 링크도 브라우저 기본 색 보다는 좀 더 예쁜 파란색으로 바꿔주겠습니다.

1. 문장 잘리는 문제

css 속성 중 `word-break: keep-all` 속성이 있습니다. 이걸 사용하면 공간이 모자라도 반드시 단어가 다음 줄로 넘어가지 않게 해줍니다.

이건 본문 전체에 적용되야 하니 전역으로 적용하면 좋겠네요.

```mjml [mjml]
<mjml>
  <mj-head>
    <mj-style> * { word-break: keep-all; } </mj-style>
  </mj-head>
</mjml>
```

![image](https://user-images.githubusercontent.com/20244536/148515567-b06a90a5-a5de-49b8-be7d-00526ea80847.png)

`<mjml>` 태그 바로 밑에 `<mj-head>` 태그를 만들고, 그 안에 `<mj-style>` 태그에 원래 작성하던 css를 작성하면 됩니다. 콘텐츠 전체에 `word-break` 속성을 적용시켜야 하니 `*` 선택자를 사용했습니다.

"감사합니다와" "구독해주셔서" 부분이 개선됐습니다.

2. 폰트

폰트는 원하시는 거 사용하시면 됩니다. 저는 [`Pretendard`](https://github.com/orioncactus/pretendard) 라는 한/영 지원이 모두 가능한 폰트를 사용하겠습니다.

```mjml [mjml]
<mj-head>
  <mj-font
    name="Pretendard"
    href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
  />

  <mj-attributes>
    <mj-all font-family="Pretendard, Arial" />
  </mj-attributes>

  <mj-style> * { word-break: keep-all; } </mj-style>
</mj-head>
```

![image](https://user-images.githubusercontent.com/20244536/148516068-c1f23242-4976-4f42-8315-f4174cb99116.png)
![image](https://user-images.githubusercontent.com/20244536/148516244-5a32389c-e8c6-497d-8e2a-c2c658932e2d.png)

`<mj-font>` 태그로 폰트를 불러주고, 여기서는 버그인지 모르겠는데 `<mj-style>` 안에 넣으면 스타일 적용이 안되서 mjml 컴포넌트 태그인 `<mj-attributes>`를 활용해서 폰트를 적용시켰습니다. 훨씬 깔끔합니다.

3. 색깔

본문 색이 `#000` 이라서 너무 까맣습니다. 약간 연하게 하면 훨씬 읽기 좋습니다. 전 `#404040` 를 사용하겠습니다.

그리고 링크도 기본 색깔도 예쁜 파란색으로 바꿔주겠습니다.

```mjml [mjml]
<mj-attributes>
  <mj-all font-family="Pretendard, Arial" color="#404040" />
</mj-attributes>

<mj-style>
  * { word-break: keep-all; } a { color: #2563eb !important; }
</mj-style>
```

<div class="grid grid-cols-2 gap-2">
 <img src="https://user-images.githubusercontent.com/20244536/148514316-3c2e04fd-0598-41f0-9499-d1649892f469.png">
 <img src="https://user-images.githubusercontent.com/20244536/148516791-fa711694-330f-4e17-90ac-d030aa3c2fbc.png">
</div>

완성입니다. 처음과 비교해봐도 바뀐 게 훨씬 깔끔하죠? 아래 첨부한 전체 mjml 코드를 참고해서 원하는 내용으로 바꿔보세요.

```mjml [mjml]
<mjml>
  <mj-head>
    <mj-font
      name="Pretendard"
      href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
    />

    <mj-attributes>
      <mj-all font-family="Pretendard, Arial" color="#404040" />
    </mj-attributes>

    <mj-style>
      * { word-break: keep-all; } a { color: #2563eb !important; }
    </mj-style>
  </mj-head>
  <mj-body>
    <mj-section>
      <mj-column>
        <!-- Header -->
        <mj-image
          width="150px"
          src="https://user-images.githubusercontent.com/20244536/148511699-e4d03a86-7b71-40c4-9cda-975e64687ff0.png"
        ></mj-image>
        <mj-spacer height="20px"></mj-spacer>

        <!-- Main -->
        <mj-text font-size="16px" line-height="1.5">
          안녕하세요 **님! 제 개인 블로그 peterkimzz.com 을 구독해주셔서
          감사합니다.
        </mj-text>

        <mj-text font-size="16px" line-height="1.5">
          최소 2주에 1번 정도는 도움이 될만한 글들을 꼭 포스팅 해보도록
          하겠습니다. 구독해주셔서 정말 감사합니다!
        </mj-text>

        <mj-text font-size="16px" line-height="1.5"> 김동현 드림 </mj-text>

        <!-- Footer -->
        <mj-divider border-color="#E5E7EB" border-width="1px"></mj-divider>

        <mj-text align="center" font-size="12px" line-height="1.75">
          <a
            href="https://www.peterkimzz.com"
            target="_blank"
            rel="noopener noreferrer nofollow"
            >웹사이트</a
          >
          <span>·</span>
          <a
            href="https://www.instagram.com/peterkimzz"
            target="_blank"
            rel="noopener noreferrer nofollow"
            >인스타그램</a
          >
        </mj-text>

        <mj-text
          align="center"
          font-family="Pretendard, Arial"
          font-size="12px"
          line-height="1"
        >
          © Peter Kim. All Rights Reserved.
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
```

## Nodemailer로 메일 보내기

저번에 작성했던 [평생 무료로 커스텀 이메일 사용하기](/custom-email-service-for-free-forever) 를 보셨다면 엄청 쉽습니다.

일단 mjml을 서버측에서 바로 HTML로 바꿔주는 `mjml` 패키지를 설치해주세요.

```bash [bash]
$ yarn add mjml
$ yarn add -D @types/mjml # typescript인 경우
```

사실 이러면 끝입니다.

```ts [typescript]
import mjml2html from 'mjml'

const { html } = mjml2html(`아까 작성했던 mjml코드`)
```

이러면 `html` 변수 안에 반응형으로 변경된 순수 HTML이 담기게 됩니다. 엄청 좋죠? 중간에 대치할 내용이 있다면 함수로 빼서 템플릿 리터럴을 사용하면 되겠습니다.

`Nodemailer`를 활용하면 아래처럼 작성 가능합니다.

```ts [typescript]
import nodemailer from 'nodemailer'
import mjml2html from 'mjml'

const { html } = mjml2html(`아까 작성했던 mjml코드`)

const transporter = nodemailer.createTransport({
  /** */
})

transporter.sendMail({
  sender: 'petekimzz.com',
  from: 'peterkimzz69@gmail.com',
  to: '받는사람 이메일',
  html: html,
})
```

자 완성입니다! 이러면 우리가 만든 반응형 이메일이 받는 사람에게 잘 전달됩니다.

## 마무리

반응형 이메일을 만드는 게 생각보다 어렵지 않았죠?

근데 사실 시간과 돈이 없는 1인 기업, 프리랜서 개발자나 소규모 기업에선 반응형 이메일 만드는 게 사치인 것 같기도 합니다. 텍스트로만 보내도 전달하고 싶은 말은 충분히 전달할 수 있거든요.

AWS 같은 큰 서비스도 어떤 메일은 아직도 그냥 텍스트로만 보내기도 합니다. 그러니까 이메일을 예쁘게 만드는 것에 대해 너무 부담갖지 마시길 바랍니다!

### 참고

- [mjml Github](https://github.com/mjmlio/mjml)
