---
category: tech
title: Twilio 번호 구매 없이 연락처 인증 서비스 5분만에 구현하기
thumbnail: https://user-images.githubusercontent.com/20244536/217119347-a66255f7-f5cd-436c-ae11-63bed3bff016.png
updated: 2023-02-19
created: 2023-02-04
published: true
---

이번 포스팅에선 `Twilio`를 이용해 `Node.js`에서 개인 번호를 발급받지 않고, 핸드폰 번호 인증을 매우 간단하게 구현하는 방법에 대해 소개해드리겠습니다.

<!--more-->

온라인 서비스를 확장하다보면 개인화된 경험을 위해 반드시 인증 서비스를 구현해야합니다. 구글,카톡으로 로그인하기 같은 OAuth도 있을거고, 이메일/패스워드 로그인도 있고, 아니면 연락처만 넣고 인증할 수도 있습니다. 운영하는 서비스에 맞게끔 잘 선택하면 되겠습니다.

저는 요즘 비밀번호를 수집하지 않는 것을 좋아합니다. 데이터베이스 유저 테이블에 `password`, `password_salt` 같은 항목을 넣기도 싫고, 보안에 더 신경을 써야할 것만 같은 느낌이 들기 때문입니다. 어렵진 않지만 굳이 암호화 로직도 추가해야하구요.

그리고 로그인 가능한 방법을 여러개 넣는 것도 좋아하지 않습니다. 구글로 로그인하기, 카톡으로 로그인하기, 이메일로 로그인하기, 연락처로 로그인하기.. 이런거 다 때려박는 서비스들이 가끔 있는데, 이러면 유저가 오랜만에 로그인하려고 하면 뭘로 했는지 기억이 안나서 로그인 시도를 여러번 해야하기 때문입니다. 일단 저부터가 뭘로 가입했었는지 기억이 안나서 중간에 앱 꺼버린 적이 생각보다 많았습니다.

## 시작하기

저희가 사용하려는 서비스는 [Twilio Verify](https://www.twilio.com/verify)라는 기능입니다. 인증 1개당 $0.05입니다. 그리고 가입시 약 $15정도를 무료로 사용할 수 있도록 제공해줍니다. 한국어 번역은 지원되지 않습니다만 매우 쉽습니다.

[회원가입 페이지](https://www.twilio.com/try-twilio)로 접속하신 뒤 가입해주세요.

![Twilio-Sign-Up](https://user-images.githubusercontent.com/20244536/216743616-6635afdd-d823-49eb-98e0-bfa6fbd7e384.png)

그 다음 입력한 이메일로 온 인증 메일을 통해 가입을 완료해주세요.

![Twilio-Email-Received](https://user-images.githubusercontent.com/20244536/216743650-5ec01f83-e692-42a0-a503-e8d30f6b18b1.png)

이메일 안의 링크를 눌렀다면, 다음은 연락처 인증입니다. 이 기능은 저희가 곧 이용할 기능이기도 합니다.

![Twilio-Phone-Validation](https://user-images.githubusercontent.com/20244536/216743695-2245f96a-e68b-4674-ba65-7600d787c74d.png)

연락처는 `1011112222` 처럼 맨 앞 0은 빼고 넣으셔도 됩니다.

![Twilio-Phone-Code](https://user-images.githubusercontent.com/20244536/216743851-f0ae90ea-37d8-4f51-8bc3-0a8014923c05.PNG)

그러면 이렇게 인증 코드를 받을 수 있습니다. 근데 기존 기록을 보니 Mailchimp와 SendGrid도 Twilio를 통해 연락처 인증을 구현하고 있다는 사실을 알게 되었습니다.

![Twilio-Registered](https://user-images.githubusercontent.com/20244536/216743955-878328c6-0630-4cdd-b12e-54c0e7e8e380.png)

가입을 완료했습니다.

![Twilio-Required-Forms](https://user-images.githubusercontent.com/20244536/216744012-ad02f243-55da-4084-9d83-6479a43b55a0.png)

서비스 이용을 위해 필수로 작성해야하는 설문조사를 해야합니다. 아무렇게나 작성하셔도 됩니다.

## 인증 시스템 구현하기

자 가입을 완료했으면 자동으로 대시보드로 이동하는데요, 왼쪽 메뉴 바에서 `Verify` -> `Try it out` 으로 이동합시다.

![Twilio-Verify-Try-it-Out](https://user-images.githubusercontent.com/20244536/216744201-32283da1-d075-4b77-bde7-c707e3a177ce.png)

이 인증 서비스의 이름을 지어주세요. 이 이름은 나중에 인증 코드를 보낼 때 **서비스의 이름**으로 보여지게 됩니다. 인증 코드를 받는 유저가 헷갈리지 않도록 애플리케이션 이름과 일치시켜주시면 좋겠네요.

![Twilio-Verify-Try-it-Out](https://user-images.githubusercontent.com/20244536/216745258-594dfc3a-bdcc-4f1e-bffa-f6868948a45f.png)

서비스까지 생성하셨다면 이제 거의 다 끝났습니다. 이제 서버 측 코드에서 API를 호출하기 위한 3개의 키를 가져오면 됩니다. 일단 왼쪽 상단 `My First Twilio Account`을 눌러 콘솔 메인 화면으로 이동해주세요.

![Twilio-Verify-Try-it-Out](https://user-images.githubusercontent.com/20244536/216745698-c91d628c-45a9-4926-80a3-285ef419242b.png)

저희에게 필요한 건 3가지 키입니다.

- `Account SID`
- `Auth Token`
- `Service SID`

Account SID와 Auth Token은 방금 방문한 콘솔 메인화면 하단에 있습니다.

![Twilio-Verify-Try-it-Out](https://user-images.githubusercontent.com/20244536/216745760-0927d1e8-d156-4b98-be50-baf0a9b4ed68.png)

마지막 Service SID는 `Verify` -> `Services`에 가면 가져올 수 있습니다.

![Twilio-Verify-Try-it-Out](https://user-images.githubusercontent.com/20244536/216745796-f71f5af1-e03c-4024-9b77-6befce7f9a80.png)

## 서버측 코드 작성하기

코드를 작성하기 전에 먼저 필요한 npm 패키지들을 설치해주세요. 둘 다 타입스크립트 지원합니다.

- [`twilio`](https://www.npmjs.com/package/twilio)
- [`phone`](https://www.npmjs.com/package/phone)

```bash
yarn add twilio phone
# npm install twilio phone
```

저는 타입스크립트로 작성하겠습니다. 따로 모듈로 작성해두었구요, 이거 그냥 복붙해서 Secret 키만 바꾼다음 import 해서 사용하시면 바로 잘 작동할겁니다. 뭐 사실 너무 간단해서 코드 설명할 필요가 없습니다.

```ts
import twilio from 'twilio'

export class Twilio {
  private client: twilio.Twilio
  private accountSid = 'AC9400af563ea46b42b3255f287abXXXXX'
  private authToken = '65406c430c90d00268ef9bf0720XXXXX'
  private verifyServiceSid = 'VAaa47973652ccaabfc582ed8c1afXXXXX'

  constructor() {
    this.client = twilio(this.accountSid, this.authToken)
  }

  sendVerificationCode(options: { to: string }) {
    return this.client.verify.v2
      .services(this.verifyServiceSid)
      .verifications.create({ to: options.to, channel: 'sms' })
  }
  checkVerificationCode(options: { to: string; code: string }) {
    return this.client.verify.v2
      .services(this.verifyServiceSid)
      .verificationChecks.create({
        to: options.to,
        code: options.code,
      })
  }
}
```

호출은 정말 너무나 간단합니다.

```ts
import express from 'express'
import phone from 'phone'
import { Twilio } from './utils/sms'

const app = express()
app.use(express.json())

app.post('/send', async (req, res) => {
  const body = req.body as { phone?: string }
  if (!body.phone) {
    throw new Error('400')
  }

  const phoneValidation = phone(body.phone, { country: 'KOR' })
  if (!phoneValidation.isValid) {
    throw new Error('invalid format of the phone.')
  }

  const twilio = new Twilio()

  const result = await twilio.sendVerificationCode({
    to: phoneValidation.phoneNumber,
  })

  res.json({
    success: true,
    data: { result },
  })
})

app.listen(3000, () => {
  console.log('http://localhost:3000')
})
```

하나 짚어둘 부분이 있는데요, `twilio` 패키지에 연락처 정보를 넘길 때 항상 하이픈 없이 국가 코드를 같이 보내주어야 합니다. 예를들어 `010-1111-2222` 라는 한국 연락처가 있다고 했을 때 저 패키지 `to` 값에는 반드시 `+821011112222` 라고 넣어주어야 한다는 뜻입니다.

하지만 한국에서 일반적으로 연락처를 넣을 땐 `01011112222` 이렇게 11자리만 넣는게 모든 사람에게 익숙합니다. 아무도 `+821011112222` 이렇게 넣진 않습니다.

그래서 아까 `phone` 패키지를 같이 설치한건데요, 유저가 하이픈을 넣거나 국가코드를 넣지 않더라도 반드시 twilio가 원하는 포맷으로 만들어줍니다. 아예 안맞는 포맷이면 `isValid` 가 `false`가 되면서 유저에게 미리 에러 응답을 줄 수 있겠죠.

그래서 저 `sendVerificationCode` 함수에 대한 성공 응답은 이렇습니다.

```json
{
  "success": true,
  "data": {
    "result": {
      "sid": "VEb7fbe1cfddfb5809d5e08748816XXXXX",
      "serviceSid": "VAaa47973652ccaabfc582ed8c1afXXXXX",
      "accountSid": "AC9400af563ea46b42b3255f287abXXXXX",
      "to": "+821042730000",
      "channel": "sms",
      "status": "pending",
      "valid": false,
      "lookup": {
        "carrier": null
      },
      "amount": null,
      "payee": null,
      "sendCodeAttempts": [
        {
          "attempt_sid": "VLb759dde6804ba896b9cdb44748dXXXXX",
          "channel": "sms",
          "time": "2023-02-04T03:36:03.000Z"
        },
        {
          "attempt_sid": "VL6100bc660d2e825e3b8cfaacc15XXXXX",
          "channel": "sms",
          "time": "2023-02-04T03:38:05.798Z"
        }
      ],
      "dateCreated": "2023-02-04T03:36:03.000Z",
      "dateUpdated": "2023-02-04T03:38:05.000Z",
      "url": "https://verify.twilio.com/v2/Services/VAaa47973652ccaabfc582ed8c1af463ad/Verifications/VEb7fbe1cfddfb5809d5e0874881669f6a"
    }
  }
}
```

주목할 부분은 `data.result.valid` 값이 아직 인증 전이라 `false` 라는 것 말고는 없습니다.

아 그리고 `data.result.sendCodeAttempts` 부분을 보니 같은 번호에 대해 기록을 쌓아주는 것 같으니 너무 자주 요청을 보내지 못하도록 저 항목을 비교해서 좀 이따가 다시 시도하라는 응답을 우리 서버가 주도록 구현할 수도 있겠네요. 근데 구현하지 않더라도 아마 Twilio 내부적으로 자주 보내지 못하도록 Rate Limit이 있기는 할겁니다.

어쨌든 성공 응답을 받는다면 입력받은 연락처로 6자리 인증 코드가 발송됩니다.

![ㅁ](https://user-images.githubusercontent.com/20244536/216746989-ff7f664f-85ff-461b-af5e-906e405d9a13.jpeg)

아까 이야기했던 것 처럼 인증 코드를 보냈을 때 미리 지정해주었던 서비스 이름인 `Phone Validation Code` 가 잘 표시됩니다.

인증 쪽 코드도 똑같습니다. 연락처랑 코드 넣어주면 됩니다.

```ts
app.post('/verify', async (req, res) => {
  const body = req.body as { phone?: string; code?: string }
  if (!body.phone || !body.code) {
    throw new Error('400')
  }

  const phoneValidation = phone(body.phone, { country: 'KOR' })
  if (!phoneValidation.isValid) {
    throw new Error('invalid format of the phone.')
  }

  const twilio = new Twilio()

  const result = await twilio.checkVerificationCode({
    to: phoneValidation.phoneNumber,
    code: body.code,
  })

  res.json({
    success: true,
    data: { result },
  })
})
```

```json
{
  "success": true,
  "data": {
    "result": {
      "sid": "VEb7fbe1cfddfb5809d5e08748816XXXXX",
      "serviceSid": "VAaa47973652ccaabfc582ed8c1afXXXXX",
      "accountSid": "AC9400af563ea46b42b3255f287abXXXXX",
      "to": "+821042730000",
      "channel": "sms",
      "status": "approved",
      "valid": true,
      "amount": null,
      "payee": null,
      "dateCreated": "2023-02-04T03:36:03.000Z",
      "dateUpdated": "2023-02-04T03:39:00.000Z"
    }
  }
}
```

`data.valid`는 `true`, `data.status`는 `approved`가 되면서 인증은 끝이 납니다. 직접 운영하시는 데이터베이스가 있다면 성공 요청 이후에 해당 유저 레코드를 업데이트 해주면 되겠네요.

## 마무리

외부 서비스를 이용하다보니 사진이 많았는데 사전 작업과 코드 정말 뭐 별거 없습니다. 키 받아와서 API 2개 사용한 거 그게 전부입니다.

이제 비밀번호 수집 없이 연락처만 받고 최대한 가볍게 인증을 구현하는 것도 가능하겠죠?

우리 모두 인증 때문에 스트레스 받지 맙시다.
