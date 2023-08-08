---
category: tech
title: 평생 무료로 커스텀 이메일 사용하기
updated: 2021-09-30
created: 2021-09-30
thumbnail: https://user-images.githubusercontent.com/20244536/135378482-9ac193f6-a6dd-42c1-91be-ebc83c8953dc.png
published: true
---

안녕하세요. 또 다시 찾아온 **평생 무료** 시리즈입니다. 저는 틈만나면 1인 사이드 프로젝트를 진행하기 때문에, 어떻게든 공짜로 서버를 돌리기 위해 온갖 노력을 하고 있습니다. 그래서 무료로 이용하는 방법에 관한 글을 몇 개 올렸는데 GA를 살펴보니 다른 주제보다 조회수가 높더군요. 역시 공짜가 좋네요.

<!--more-->

그런 관계로 제가 알고 있는 무료로 서비스를 운영하는 방법들을 시간이 날 때마다 종종 올려보도록 하겠습니다. 다른 무료로 사용하기 시리즈는 이렇습니다.

1. [평생 무료로 개인 블로그 운영하기](/github-pages-nuxtjs)

2. [평생 무료인 모니터링 도구 10분만에 만들기](/monitoring-tool-in-10-minutes)

## 이메일 서비스

이번엔 이메일입니다. 온라인 서비스 운영자에겐 필수라고 할 수 있겠습니다.

이유는 서비스 관련 각종 알림, 광고 발송과 계정 인증까지 모두 저비용으로 커버가 가능한 고마운 전달 매체이기 때문이죠.

그런데 이 이메일 서비스는 제대로 구현해서 안정적으로 서비스하기는 생각보다 꽤 까다롭습니다. 커스텀 이메일을 보내기 위해선 도메인 관련 지식도 필요하고, 자동화 및 개인화 하려면 서버도 돌려야 하고, 요샌 모바일로도 메일을 많이 읽어서 반응형으로 템플릿 만드는 등 이메일 하나에 정말 많은 노력이 들어갑니다. 운영하는 서비스에 따라서 전담 인력이 필요할 수도 있습니다.

그래서 [스티비](https://stibee.com), [Mailchimp](https://mailchimp.com) 같은 이메일 솔루션을 사용하는 게 맘 편하기는 합니다.

하지만 문제는 **가격**입니다. 스티비의 경우 무제한으로 이메일을 보내기 위해선 최소 월 29,000원을 지불해야합니다. 솔직히 사용 만족도 대비 절대 아깝지 않습니다만, 사이드 프로젝트인데 이메일 서비스에만 월 3만원 가량을 지불한다는 건 무일푼으로 프로젝트하는 우리에게 있을 수 없는 일입니다.

그리고 사실 스티비는 자체 서버에서 100% 커스텀해서 통합하긴 어렵습니다. 이메일 구독시키기, 그룹화하기나 웹훅 API 정도만 지원하기 때문입니다.

## 다음 스마트워크

그래서 평생 무료로, 100% 원하는대로 커스텀 이메일을 서비스하는 방법을 준비했습니다. 바로 **다음 스마트워크**를 이용하는 방법입니다.

지금은 카카오랑 통합했지만, 다음도 네이버와 마찬가지로 오래전부터 메일 서비스를 제공 중입니다. 다만 이 방법은 다음 계정 1개당 커스텀 도메인 1개만 가능합니다.

그리고 개인 계정이랑 커스텀 도메인이 완벽히 분리되는 방법은 아닙니다. 개인 계정을 커스텀 도메인처럼 사용하는 방식이기 때문입니다. 뭐 크게 신경쓸 부분은 아닙니다.

그리고 가끔 이메일 발송이 늦는 경우가 있습니다. 그래도 보통 1분 이내로 발송됩니다.

카카오도 최근 메일 서비스를 베타로 출시했는데, UI가 기존 다음 이랑 거의 비슷합니다. 다만 스마트워크처럼 커스텀 도메인을 만드는 기능은 없습니다. 정식 버전에선 지원해주길 기도하겠습니다.

![image](https://user-images.githubusercontent.com/20244536/135370985-2cee0aff-da43-4008-86e3-fcd34826d953.png)
_카카오 메일 BETA. 스마트워크 유지해주세요. 제발_

## 시작하기

먼저 [다음](https://www.daum.net) 사이트에 접속해서 로그인 후, 메일로 이동합니다. 기존 다음 계정이나, 통합된 카카오 계정이라도 상관 없습니다. 저는 기존 다음 계정과 카카오 계정을 통합시킨 계정으로 사용 중입니다.

![image](https://user-images.githubusercontent.com/20244536/135372107-526bb7ca-6880-47d3-9f20-a947bde73b72.png)

그리고 왼쪽 사이드 메뉴 하단에 **Daum 스마트워크**로 이동해주세요.

![image](https://user-images.githubusercontent.com/20244536/135372169-c0afba98-5421-4799-b752-127317f4e255.png)

이미 등록한 개인 도메인이 없다면, 도메인을 입력하는 공간이 있을 겁니다. 저는 지금은 취소를 할 수가 없어서 사진을 첨부하지 못했는데, 그냥 사용할 도메인 주소를 넣어주기만 하면 됩니다.

그리고 커스텀 도메인을 사용하기 위해 도메인을 구입한 호스팅 업체에 가서 `MX` 레코드를 추가해주셔야 합니다. 저는 [Godaddy](https://godaddy.com)를 사용 중입니다. 다른 업체를 사용하고 계셔도 작동 원리는 모두 같습니다.

DNS 설정하는 곳으로 가셔서 `MX` 레코드 2개 추가해주세요.

1. aspmx.daum.net (우선순위: 10)
2. alt.aspmx.daum.net (우선순위: 20)

![image](https://user-images.githubusercontent.com/20244536/135372996-bb7f2384-3b9f-4937-a53f-ced8e3271cfb.png)

친절하게 설정 방법까지 메일로 보내주네요.

이러면 커스텀 도메인을 사용하기 위한 준비가 끝났습니다. 쉽죠?

![image](https://user-images.githubusercontent.com/20244536/135373246-cc81e429-90bc-4f11-b6f4-dbfaafa2c7b4.png)
_다음에서 정상적으로 도메인 `MX` 레코드를 확인한 상태_

## 서버에 통합하기

여기까지 설정을 마치셨다면, 지금부터 개인 도메인 주소로 메일을 발송할 수 있습니다. 서버 통합 필요없이 그냥 웹 메일만 이용하실 분들은 지금 상태로도 이용하는데 문제 없습니다.

하지만 자체 서버에서 메일을 보내길 원하시는 분들은 아래 예제를 참고해주시면 되겠습니다.

저는 `Node.js`를 사용했고, 메일 발송을 위해 [`Nodemailer`](https://nodemailer.com/) 라이브러리를 사용했습니다.

```bash [bash]
# yarn
$ yarn add nodemailer
$ yarn add -D @types/nodemailer # typescript 사용하는 경우

# npm
$ npm i nodemailer
$ npm i -D @types/nodemailer # typescript 사용하는 경우
```

패키지 설치 후, 코드 재사용성을 위해 아래와 같이 모듈화 해줍니다.

```ts [typescript]
import nodemailer from "nodemailer";

export type mailOptions = {
  to: string | string[];
  subject: string;
  html: string;
};

export class Nodemailer {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.daum.net",
      port: 465,
      secure: true,
      auth: {
        user: "다음 계정 아이디",
        pass: "다음 계정 비밀번호",
      },
    });
  }

  public sendMail(options: mailOptions) {
    return this.transporter.sendMail({
      priority: "normal",
      sender: "브리아나랩스",
      from: "브리아나랩스 <contact@brianalabs.com>",
      to: "contact@brianalabs.com",
      bcc: options.to,
      subject: options.subject,
      html: options.html,
    });
  }
}
```

`nodemailer`의 인터페이스는 매우 간단합니다. 이메일 서비스 업체의 정보를 담은 `transport` 객체를 만들고, 이 객체에 내장된 `sendMail` 함수를 통해 메일을 발송하면 끝입니다.

여기서 한 가지 짚어드릴 부분이 있다면, `sendMail` 함수의 `to` 옵션을 수정하지 못하도록 작성했습니다. 이유는 같은 메일을 여러 명에게 발송할 때 `to` 객체에 다 넣게 되면 메일을 받는 사람에게 다른 사람들의 메일까지 전부 노출되게 됩니다.

수신자 입장에선 내 메일 주소가 다른 사람에게 노출됐기 때문에 상당히 불쾌할 수 있습니다.

그런 불상사를 막기 위해 받는 사람을 메일 발송자의 주소와 동일하게 해두고, 숨은 참조로만 메일을 보내도록 설계해주세요. 이건 이메일 예절이기도 합니다.

숨은 참조로 보내면 메일을 여러 명에게 발송해도 개인에게만 발송된 것 처럼 보입니다. 그리고 관리자 계정으로 메일을 보내기 때문에, 우리 메일이 잘 발송됐는지 확인도 가능합니다.

사용 예제는 이렇습니다.

```ts [typescript]
const mailer = new Nodemailer();
const info = await mailer.sendMail({
  to: "tmna1234@naver.com",
  subject: "이메일 인증 코드를 보내드립니다.",
  html: "인증번호는 [000000] 입니다.",
});
```

![image](https://user-images.githubusercontent.com/20244536/135374752-bcb31d0b-11db-4fd5-b561-4b4ba6ede6f6.png)

![image](https://user-images.githubusercontent.com/20244536/135374879-86121a4a-47ab-4e33-9f99-0df87efa1b1e.png)

위 사진은 메일함에서 받았을 때 모습이고, 아래는 아이폰 기본 메일 앱에서 받았을 때 보이는 모습입니다. 우리가 흔히 받는 메일의 포맷이죠? 이제 옵션을 조절해서 원하는 포맷으로 메일을 마음껏 발송하세요.

## 마무리

다음 스마트워크는 도메인 당 계정 `500`개까지 등록 가능하고, 계정 당 `20GB`의 용량을 무료로 제공합니다. 이 혜택은 정말 미친겁니다. 웬만한 규모에선 사실상 이메일 관련해서 지출 없이 서비스를 운영할 수 있습니다.

여기서 추가로 이메일 UI/UX 개선을 위해 반응형 이메일 템플릿까지 제공하면 완벽하겠죠. 다만 분량 관계로 무료로 반응형 이메일 템플릿을 작성 및 유지보수하는 방법은 다음 포스팅에서 다루도록 하겠습니다.

잘 안되거나, 모르는 부분은 아래 댓글로 남겨주세요.

### 참고

- [Daum 스마트 워크 도움말](https://cs.daum.net/faq/43/13114.html)
- [nodemailer.com](https://nodemailer.com/)
