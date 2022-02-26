---
category: tech
title: Vue.js로 크롬 확장 프로그램 만들기 강의 - 3부
updated: 2021-08-16
created: 2021-08-16
thumbnail: https://dynamisign.com/api/sign?d=peterkimzz.com&t=Vue.js%EB%A1%9C%20%ED%81%AC%EB%A1%AC%20%ED%99%95%EC%9E%A5%20%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%A8%20%EB%A7%8C%EB%93%A4%EA%B8%B0%20%EA%B0%95%EC%9D%98%20-%203%EB%B6%80
published: true
---

[이전 포스팅](/vuejs-chrome-extension-2)에서는 [Vite](https://vitejs.dev/)을 이용해 크롬 확장 프로그램을 만들기 위한 기본적인 프로젝트 환경 설정까지 마쳤습니다.

본격적으로 Vue.js 코드를 작성해보도록 합시다.

<!--more-->

## 개발 시작하기

일단 저는 개발 단계에서 크롬 확장 프로그램으로 올려서 개발하기 보다는, 그냥 브라우저에서 핫 리로드를 하며 빠르게 개발을 하도록 하겠습니다.

일단 `package.json`의 scripts를 조금 수정해줍시다.

```json [package.json]
{
  "dev": "vite",
  "dev:extension": "vite build --watch",
  "build": "vite build",
  "build:extension": "bestzip dist.zip dist/"
}
```

브라우저로 개발하고 싶을 땐 `npm run dev`를, 크롬 확장 프로그램에 올려서 하고 싶을 땐 `npm run dev:extension` 으로 하면 됩니다. `build`도 똑같습니다.

개발 서버를 열어줍니다.

```bash[bash]
npm run dev
# http://localhost:3000
```

이런 화면이 보인다면 정상적으로 개발 서버가 열린겁니다.

일단 시작 페이지를 깔끔하게 만들어주도록 하죠. `src/App.vue` 파일을 열어주세요.

```vue [App.vue]
<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + Vite" />
</template>

<script setup>
import HelloWorld from './components/HelloWorld.vue'

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

Vue는 `Single File Component (SFC)` 라는 기술로 한 파일에서 `HTML`, `Javascript`, `CSS`를 모두 정의합니다. 이 자체로 장점이 있다면 있을 수 있고, 코드가 길어진다면 단점이 될 수도 있겠죠.

기존 코드를 아래처럼 정리해주고, `src/components` 폴더에 있는 `HelloWorld.vue` 파일도 지워주세요.

```vue [App.vue]
<template>
  <div>Hello, world!</div>
</template>

<script setup></script>

<style></style>
```

![image](https://user-images.githubusercontent.com/20244536/129522620-b5c4c974-3d97-42f7-9c06-ab7c010e9f03.png)

## 레이아웃 디자인

보통 웹사이트는 `Navigation Bar`, `Main Contents`, `Footer Bar` 크게 세 가지의 영역으로 나누어 디자인을 하게 됩니다. 이게 대부분의 유저들에게 가장 익숙합니다.

`Navigation Bar` 에는 로고와 자주 사용하는 메뉴들을 넣게 됩니다.

`Main Contents` 는 말 그대로 메인 콘텐츠가 보여집니다.

`Footer bar` 영역엔 주로 회사 정보나, 사이트 내 접근 가능한 링크 혹은 외부 채널들을 넣어줍니다.

![image](https://user-images.githubusercontent.com/20244536/129524227-83ddb4d9-fd9d-4310-a6a3-ca1575361ddf.png)

간단하게 위의 구조로 HTML을 작성해줍시다.

```vue [App.vue]
<template>
  <nav>코인시세보기프로그램</nav>

  <main>Hello, world!</main>

  <footer>peterkimzz.com</footer>
</template>
```

![image](https://user-images.githubusercontent.com/20244536/129525100-9a13e16f-5e16-45a1-b90d-b95397317f17.png)

코드 상으로는 세 개의 영역이 확실히 구분되지만, 사람 눈에는 전혀 구분되어 보이지 않습니다. `css`를 활용해 지금보다 약간만 개선을 해봅시다.

```vue [App.vue]
<template>
  <nav>코인시세보기프로그램</nav>

  <main>Hello, world!</main>

  <footer>peterkimzz.com</footer>
</template>

<script setup></script>

<style>
nav {
  font-size: 1.1rem;
  font-weight: bold;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e2e2e2;
}

main {
  padding-top: 1rem;
  padding-bottom: 10rem;
}

footer {
  font-size: 0.9rem;
  color: gray;
  border-top: 1px solid #e2e2e2;
  padding-top: 0.5rem;
}
</style>
```

![image](https://user-images.githubusercontent.com/20244536/129525960-0010088b-6627-4ed8-a40b-0176bc277956.png)

음.. 네 뭐 전보다는 낫네요. 예쁜게 좋은 디자인은 아닙니다. 익숙하고 편하면 좋은 겁니다.

## 코인 거래소 UI 분석

구조는 대충 잡았는데, 어디부터 어떻게 서비스를 만들어야 할지 막막합니다. 왜냐하면 거기까지는 생각을 안해봤거든요.

그렇다면 실제 코인 거래소들은 어떤 UI를 구성했을까요? 저는 한국 거래소 1등인 [업비트](https://upbit.com/exchange?code=CRIX.UPBIT.KRW-BTC) 를 슬쩍 보도록 하겠습니다.

![image](https://user-images.githubusercontent.com/20244536/129527876-f79dd52b-828e-49f5-a052-c8c73e57473f.png)

우리가 만들어 볼 부분은 바로 여기입니다.

간단히 UI를 분석해보자면, 최상단에는 **검색**과 **설정**이 있습니다.

그 아래는 화폐에 따라 다른 시세를 볼 수 있는 **화폐 탭**이 있네요.

그리고 아래에는 테이블 형식으로 된 **코인 시세**가 있습니다.

근데 저는 개선해보고 싶은 부분이 하나 있습니다. 바로 테이블 쪽의 **거래대금** 입니다. `1,783,893백만` 이라는 숫자가 바로 읽히지 않기 때문입니다. 어차피 백만 아래 단위를 잘라서 보여줄 것 같으면 차라리 `1조 7838억` 정도로만 나와도 훨씬 이해하기 쉬울 것 같은데 말이죠.

그래서 전 업비트의 UI를 참고하되, 저만의 차별점을 약간 줘보도록 하겠습니다.

참고로 다른 서비스들을 최대한 많이 접해보는 게 좋습니다. 나중에 좋은 서비스를 만드는데 큰 밑거름이 됩니다. 자주 베끼고, 따라하세요. (그렇다고 아예 베끼라는 건 아닙니다)

## UI 만들기

일단 이 강의 시리즈에서는 검색이나 설정, 화폐 탭 바꾸기 기능 등 부가 기능들은 만들지 않도록 하겠습니다. 단순히 시세를 보여주기만 하는 것 까지만 하겠습니다. (너무 많아요)

그렇다면 일단 테이블만 먼저 스타일링 없이 만들어보도록 하겠습니다.

```vue [App.vue]
<template>
  <nav>코인시세보기프로그램</nav>

  <table>
    <thead>
      <tr>
        <th>한글명</th>
        <th>현재가</th>
        <th>전일대비</th>
        <th>거래대금</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <div>도지코인</div>
          <div>DOGE/KRW</div>
        </td>
        <td>394</td>
        <td>
          <div>-0.76%</div>
          <div>-3.00</div>
        </td>
        <td>1,783,893백만</td>
      </tr>
      <tr>
        <td>
          <div>리플</div>
          <div>XRP/KRW</div>
        </td>
        <td>1500</td>
        <td>
          <div>+0.67%</div>
          <div>10.00</div>
        </td>
        <td>1,159,312백만</td>
      </tr>
      <tr>
        <td>
          <div>이더리움클래식</div>
          <div>ETC/KRW</div>
        </td>
        <td>85,340</td>
        <td>
          <div>-2.33%</div>
          <div>-2040</div>
        </td>
        <td>933,497백만</td>
      </tr>
    </tbody>
  </table>

  <footer>peterkimzz.com</footer>
</template>
```

![image](https://user-images.githubusercontent.com/20244536/129530856-94661816-0592-45fb-a7b6-031175c33a1c.png)

실제 데이터를 받아오기 전에, 3개의 코인 정보만 업비트랑 같은 레이아웃으로 작성했습니다.

우리가 주목해야할 부분은, `<tr>` 태그 부분이 반복된다는 점입니다. 그렇다는 이야기는 자바스크립트를 이용해 좀 더 프로그램스럽게 만들 수 있다는 것이죠.

```vue [App.vue]
<template>
  <nav>코인시세보기프로그램</nav>

  <table>
    <thead>
      <tr>
        <th>한글명</th>
        <th>현재가</th>
        <th>전일대비</th>
        <th>거래대금</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="coin in coins" :key="coin.symbol">
        <td>
          <div>{{ coin.korean_name }}</div>
          <div>{{ coin.symbol }}/KRW</div>
        </td>
        <td>{{ coin.price }}</td>
        <td>
          <div>{{ coin.change }}%</div>
          <div>{{ coin.change_price }}</div>
        </td>
        <td>{{ coin.volume }}백만</td>
      </tr>
    </tbody>
  </table>

  <footer>peterkimzz.com</footer>
</template>

<script setup>
import { ref } from 'vue'

const coins = ref([
  {
    symbol: 'DOGE',
    korean_name: '도지코인',
    price: 394,
    change: -0.76,
    change_price: -3.0,
    volume: 1783783,
  },
  {
    symbol: 'XRP',
    korean_name: '리플',
    price: 1500,
    change: 0.67,
    change_price: 10.0,
    volume: 1159312,
  },
  {
    symbol: 'ETC',
    korean_name: '이더리움클래식',
    price: 85340,
    change: -2.33,
    change_price: -2040,
    volume: 933497,
  },
])
</script>
```

`script` 태그에 내부에 있는 변수들을, `<template>` 영역에서 참조가 가능합니다.

`coins` 변수를 Vue에서 반복문을 만들 때 사용하는 `v-for`를 이용해서 연결해두었으니, 나중에 `coins` 에 실제 코인 데이터를 넣어주면 업비트랑 똑같은 정보를 보여줄 수 있겠겠요. 그렇게 어렵지 않죠?

숫자가 보여지는 부분이 아까랑은 약간 다르게 보이겠지만, 나중에 개선해보도록 합시다.

## 업비트 API

`API` 라는 말 들어보셨나요? `Application Programming Interface` 라는 뜻입니다. 뭔 소리냐구요? 그냥 프로그램이 사용하는 인터페이스라고 생각하시면 됩니다.

인터페이스가 뭐냐구요? 그렇다면 `UI` 라는 말은 들어보셨겠죠. `User Interface` 라는 뜻입니다. 사람이 사용하는 인터페이스라는 뜻이겠죠.

즉, 인터페이스는 진짜 간단하게 **사용법** 이라는 뜻입니다.

그렇다면 업비트 API를 사용한다는 것은 업비트에서 제공하는 시세 데이터를 받아오거나, 매수/매도 주문을 넣거나 하는 행위를 업비트 사람이 웹사이트에서 하는 게 아니라 (이건 UI죠), **애플리케이션 끼리 하도록 하는 것**을 말합니다.

[업비트 API 가이드](https://docs.upbit.com/docs)에는 개발자들이 쉽게 가상화폐 관련 데이터를 사용할 수 있도록 API 사용 문서가 제공되고 있습니다.

일단 맛을 보기 위해 브라우저 주소창에 [https://api.upbit.com/v1/market/all](https://api.upbit.com/v1/market/all)를 입력해보세요.

업비트에서 취급하는 모든 코인 목록이 보이실겁니다. 이 데이터를 이용하면 아까 우리가 만들었던 테이블을 좀 더 풍성하게 만들 수 있겠다는 생각이 드네요.

## HTTP 요청

아까 브라우저에 `api.upbit.com` 어쩌구를 입력했던 게 HTTP 요청이라는 거 알고 계셨나요? 우린 사실 이미 수 많은 HTTP 요청을 하고 살아왔습니다.

근데 `naver.com`을 쳤을 때는 왜 웹사이트가 보일까요? 그건 네이버에서 `HTML`을 응답했기 때문입니다. 업비트는 그냥 단순 데이터를 응답한거구요. 별 거 아닙니다.

이걸 브라우저에서 요청하는 게 아니라, 우리 웹사이트가 요청하도록 하기만 하면 아까 보였던 코인 목록들을 우리 웹사이트에서 활용할 수 있습니다.

```bash
npm i axios
```

패키지 하나 설치해주세요. 자바스크립트에서 제일 많이 사용하는 HTTP 요청 라이브러리입니다.

그리고 Vue script 코드를 수정해줍시다.

```vue [App.vue]
<script setup>
import { ref } from 'vue'
import axios from 'axios'

const coins = ref([])

async function GetSymbols() {
  try {
    const { data } = await axios.get('https://api.upbit.com/v1/market/all')
    console.log(data)

    coins.value = data
  } catch (err) {
    throw err
  }
}

GetSymbols()
</script>
```

저장하고, 브라우저에서 F12를 눌러 개발자 콘솔을 열어보면 255개의 배열이 응답된 것을 확인할 수 있습니다. 그리고 우리 웹사이트에도 255개의 코인 목록이 보여지고 있네요.

![image](https://user-images.githubusercontent.com/20244536/129536005-a8b0d29e-c2d0-42a8-a869-b7f658fea4e2.png)

다만 단순 코인 목록만 요청했기 때문에, 시세 정보는 다른 API를 이용해 받아와야 합니다.

![image](https://user-images.githubusercontent.com/20244536/129536612-e93e607f-48d1-4ee2-80c4-4df6f881860f.png)

업비트 개발 문서에서 가져왔습니다. `/v1/ticker` 주소에 `markets` 라는 값과 함께 요청하면 된다는군요. 복수로 보내려면 컴마를 이용해서 가져올 수도 있다고 합니다.

그럼 아까 불러왔던 코인 목록에서 `market` 값만 추출해서 배열로 이어주고, API 요청을 날리면 되겠다는 생각을 하면 되겠네요.

코드도 조금 개선해보겠습니다.

```vue [App.vue]
<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const coins = ref([])

function GetSymbols() {
  return axios.get('https://api.upbit.com/v1/market/all')
}

function GetTickers(markets = []) {
  return axios.get('https://api.upbit.com/v1/ticker', {
    params: { markets: markets.join(',') },
  })
}

// 페이지가 로드되면 자동으로 호출되는 Vue.js의 사전 정의 함수
onMounted(async () => {
  try {
    const { data: symbols } = await GetSymbols()

    const markets = symbols.map((symbol) => symbol.market)
    const { data: tickers } = await GetTickers(markets)

    coins.value = tickers
  } catch (err) {}
})
</script>
```

![image](https://user-images.githubusercontent.com/20244536/129537276-a3a206c6-61fd-4aae-ae9c-dad840f5ad55.png)

콘솔을 확인해보니, 아까보단 각 코인들이 가지고 있는 데이터가 훨씬 더 많아졌습니다. 이것만 가지고도 아까 업비트에서 봤던 UI를 만들 수 있겠다는 생각이 드네요.

근데 하나 문제가 있습니다. `ticker`를 받아오는 API에는 코인 한글명을 응답해주지 않는다는 점입니다.

## 데이터 합치기

그럼 심볼이랑 티커를 합치면 되겠네요.

근데 잠깐, 데이터를 합치기 전에 잠깐 생각을 해봅시다. `symbols` 도 배열로 응답되고, `tickers` 도 배열로 응답됩니다.

`tickers` 안에는 `market` 변수가 제공되니까 먼저 `symbols`을 반복문 돌리고, `symbols`도 반복문을 돌려서 `market` 값으로 찾은 다음에 둘을 합쳐야겠네?

라고 생각하셨나요? 그럼 배열을 255번 x 255번을 돌아야 합니다. 총 `65,025` 번이나 돌게 생겼습니다.

그리고 지금은 단 2번의 응답을 받아서 괜찮지만, 이따 실시간으로 거래되는 트래픽을 받을 때는 1초에 수십, 수백번의 응답을 받게 됩니다. 그 때 마다 계속 배열 돌면서 시세를 업데이트 해준다면 분명 앱이 느려서 제대로 작동하지 않을겁니다.

그럼 어떡하죠? 방법은 간단합니다. 데이터를 배열이 아니라, **객체**로 저장하면 됩니다.

객체는 `Key`, `Value`로 구성되어서, `Key`를 이용해 데이터를 접근한다는 특징이 있습니다. 데이터가 많아도 매우 빠른 속도로 데이터를 찾아낼 수 있죠.

`onMounted` 를 아래처럼 수정해주세요.

```js
onMounted(async () => {
  try {
    const { data: symbols } = await GetSymbols()
    symbols.forEach((symbol) => {
      coins.value[symbol.market] = symbol
    })

    const markets = symbols.map((symbol) => symbol.market)
    const { data: tickers } = await GetTickers(markets)

    tickers.forEach((ticker) => {
      coins.value[ticker.market] = Object.assign(
        coins.value[ticker.market],
        ticker
      )
    })
  } catch (err) {}
})
```

근데 데이터를 살펴보니, 코인 데이터가 원화 마켓, BTC 마켓 등 여러 마켓이 짬뽕되어서 나오고 있습니다.

![image](https://user-images.githubusercontent.com/20244536/129540617-8255955b-c783-4b6b-a77f-7396cba0df2d.png)

마켓 구분은 심볼 앞의 접두어를 보면 됩니다. `KRW-` 은 원화 마켓, `BTC-` 는 비트코인 마켓, `USDT-` 는 달러 마켓입니다.

우린 **원화** 마켓 데이터만 가져오고 싶기 때문에 `KRW-` 으로 시작하는 코인들만 필터링 해보도록 하겠습니다.

변화된 데이터에 따라 `HTML`도 조금 수정했습니다.

```vue [App.vue]
<template>
  <nav>코인시세보기프로그램</nav>

  <table>
    <thead>
      <tr>
        <th>한글명</th>
        <th>현재가</th>
        <th>전일대비</th>
        <th>거래대금</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(coin, key) in coins" :key="key">
        <td>
          <div>{{ coin.korean_name }}</div>
          <div>{{ coin.market }}/KRW</div>
        </td>
        <td>{{ coin.trade_price }}</td>
        <td>
          <div>{{ coin.change_rate * 100 }}%</div>
          <div>{{ coin.change_price }}</div>
        </td>
        <td>{{ coin.acc_trade_price_24h }}백만</td>
      </tr>
    </tbody>
  </table>

  <footer>peterkimzz.com</footer>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const coins = ref({})

function GetSymbols() {
  return axios.get('https://api.upbit.com/v1/market/all')
}

function GetTickers(markets = []) {
  return axios.get('https://api.upbit.com/v1/ticker', {
    params: { markets: markets.join(',') },
  })
}

// 페이지가 로드되면 자동으로 호출되는 Vue.js의 사전 정의 함수
onMounted(async () => {
  try {
    const markets = []

    const { data: symbols } = await GetSymbols()

    symbols.forEach((symbol) => {
      /** `KRW-` 으로 시작하는 마켓만 핕터링 */
      if (symbol.market.indexOf('KRW-') === -1) {
        return
      }

      markets.push(symbol.market)
      coins.value[symbol.market] = symbol
    })

    const { data: tickers } = await GetTickers(markets)

    tickers.forEach((ticker) => {
      coins.value[ticker.market] = Object.assign(
        coins.value[ticker.market],
        ticker
      )
    })
  } catch (err) {}
})
</script>
```

![image](https://user-images.githubusercontent.com/20244536/129541687-e6d0cba6-53d9-47e1-8234-d3dfaa4fa7a9.png)

실제 코인과 숫자가 채워지니까 아까보다 훨신 더 있어보이네요.

## 스타일링

여기까지 스크립트는 적당히 잘 작동하는 것 같습니다.

헌데.. 솔직히 디자인이 너무 구립니다. 이대로 계속 진행하기엔 저의 내재된 디자인 감각이 허용하지 않네요. UI를 조금만 개선을 해보겠습니다.

본격적으로 스타일링을 하기 전에, 라이브러리 하나 설치하고 가도록 하겠습니다.

```bash [bash]
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
npx tailwindcss init -p
```

[`Tailwind CSS`](https://tailwindcss.com/) 라는 라이브러리입니다. 이걸 사용하면 매우 빠르게 스타일링을 할 수 있습니다. 저는 이 라이브러리의 도움으로, `<style>` 태그를 아예 사용하지 않고 스타일링을 하고 있습니다.

위 두 줄을 입력하면 `tailwind.config.js` 파일과, `postcss.config.js` 파일이 생성됩니다.

`tailwind.config.js` 파일만 조금 수정해줍시다.

```js [tailwind.config.js]
module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
```

그리고 `tailwindcss` 를 우리 프로젝트에서 사용할 수 있도록 전역 `.css` 파일을 만들고, import 해주도록 합시다.

`src` 폴더 아래에 `index.css` 라는 파일을 만들어주세요.

```css [index.css]
@tailwind base;
@tailwind components;
@tailwind utilities;
```

```js [main.js]
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

createApp(App).mount('#app')
```

이렇게 하면 구성이 끝났습니다.

일단 기존 `<style>` 태그는 전부 지워주세요. 같은 스타일링을 `tailwindcss` 를 이용해 해보도록 하겠습니다. `HTML` 클래스를 주목해주세요.

```vue [App.vue]
<template>
  <nav class="border-b border-gray-300 p-2 text-[1.1rem] font-bold">
    코인시세보기프로그램
  </nav>

  <div class="p-2">// ...</div>

  <footer class="font-[0.9rem] border-t border-gray-300 p-2 text-gray-600">
    peterkimzz.com
  </footer>
</template>
```

대충 이해가 가시나요? 부가 설명을 드리자면 `p-` 는 `padding` 관련 옵션입니다. 그리고 색깔 부분은 미리 정의된 컬러 팔레트를 사용했습니다. 각 색깔마다 100 부터 900까지 다양한 채도로 구성되어있습니다. 자세한 내용이 궁금하신 분들은 [여기](https://tailwindcss.com/docs/customizing-colors)를 확인해보세요.

전체적으로 스타일링을 조금 수정해보겠습니다.

```vue [App.vue]
<template>
  <nav class="p-4 text-[1.1rem] font-bold">코인시세보기프로그램</nav>

  <div>
    <table class="table w-full">
      <thead>
        <tr class="border-b border-gray-100 text-sm text-gray-500">
          <th class="py-2 px-4 text-left">한글명</th>
          <th class="py-2 px-4 text-right">현재가(원)</th>
          <th class="py-2 px-4 text-right">전일대비</th>
          <th class="py-2 px-4 text-right">거래대금</th>
        </tr>
      </thead>
      <tbody class="text-gray-900">
        <tr v-for="(coin, key) in coins" :key="key">
          <td class="py-1 px-4 text-left">
            <div class="font-semibold text-gray-700">
              {{ coin.korean_name }}
            </div>
            <div class="text-sm text-gray-500">{{ coin.market }}/KRW</div>
          </td>
          <td class="py-1 px-4 text-right align-top font-semibold">
            {{ coin.trade_price }}
          </td>
          <td class="py-1 px-4 text-right">
            <div class="font-semibold">{{ coin.change_rate * 100 }}%</div>
            <div class="text-sm text-gray-500">{{ coin.change_price }}</div>
          </td>
          <td class="py-1 px-4 text-right">
            {{ coin.acc_trade_price_24h }}백만
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <footer class="font-[0.9rem] border-t border-gray-300 p-4 text-gray-600">
    peterkimzz.com
  </footer>
</template>
```

![image](https://user-images.githubusercontent.com/20244536/129545644-32593360-8259-4ccf-9a48-e16c041af310.png)

강조하고 싶은 부분을 좀 더 진한 색으로, 진한 폰트로. 덜 중요한 부분을 더 연한 색으로 변경해주었습니다.

굳이 색을 넣지 않더라도, 보기 좋은 UI는 얼마든지 만들 수 있습니다.

그리고 약간씩 간격을 조정했습니다. 숫자들만 정리되면 훨씬 더 직관적이고 깔끔해 보이겠네요.

## 정리하기

정리하고 싶은 점을 나열해봅시다.

1. 현재가는 컴마 단위로 구분되서 보이면 좋겠네요. (10100원 -> 10,000원)

2. 전일 대비는 소숫점 2번째 자리까지만 반올림해서 보이게 해줍시다. (1.508123% -> 1.51%)

3. 현재가와 전일대비의 등락을 `+`, `-` 기호를 이용해 표시해주고 싶네요.

4. 아까 말했던 전일대비의 xxx백만 단위를 xxx억 단위로 바꾸도록 하겠습니다.

5. 마지막으로 마켓 심볼 부분의 KRW이 중복되지 않도록 정리해줍시다.

1번은 간단합니다. 자바스크립트 숫자형 타입에 대해 기본적으로 제공되는 `toLocaleString()` 함수를 사용하면 됩니다.

```js
function GetCurrency(value) {
  return Number(value).toLocaleString()
}
```

2번 또한 간단합니다. 자바스크립트 숫자형 타입에 대해 기본적으로 제공되는 `toFixed()` 함수를 사용하면 됩니다. 파라미터는 소숫점을 제한하고 싶은 값을 넣어주면 됩니다. 이 경우에는 2를 넣어주면 되겠죠.

```js
function GetChangeRate(value) {
  return Number(value).toFixed(2)
}
```

3번의 경우에는 API를 받아서 데이터를 가공하는 부분을 조금 수정할 필요가 있습니다. 이유는 현재 등락을 `RISE`, `FALL` 이라는 문자열을 별개로 응답하고 있기 때문입니다. 이러저래 깔끔하게 하려고 시도를 많이 했는데, 음수일 땐 `-` 값이 붙어있는 게 조작하긴 더 좋더라구요.

```js
onMounted(async () => {
  try {
    const markets = [];

    const { data: symbols } = await GetSymbols();

    symbols.forEach((symbol) => {
      if (symbol.market.indexOf("KRW-") === -1) {
        return;
      }

      markets.push(symbol.market);
      coins.value[symbol.market] = symbol;
    });

    const { data: tickers } = await GetTickers(markets);

    tickers.forEach((ticker) => {

      /** 수정된 부분 */
      if (ticker.change === "FALL") {
        ticker.trade_price = -ticker.trade_price;
        ticker.change_price = -ticker.change_price;
      }

      ticker.change_rate = ticker.change_rate * 100;
      /** 수정된 부분 끝 */

      coins.value[ticker.market] = Object.assign(
        coins.value[ticker.market],
        ticker
      );
    });
  } catch (err) {}
});
</script>
```

4번은 [`num-to-korean`](https://www.npmjs.com/package/num-to-korean) 패키지의 도움을 받도록 하겠습니다.

```bash [bash]
npm i num-to-korean
```

```js
function getVolume(volume) {
  return numToKorean(Math.floor(volume / 100000000) * 100000000, 'mixed')
}
```

억 단위 아래 숫자는 필요 없으니 나눴다 소숫점 버려주고, 다시 곱해주면 되겠죠.

이 코드들을 참고해서 만든 전체 결과물입니다.

```vue [App.vue]
<template>
  <nav class="p-4 text-[1.1rem] font-bold">코인시세보기프로그램</nav>

  <div>
    <table class="table w-full">
      <thead>
        <tr class="border-b border-gray-100 text-sm text-gray-500">
          <th class="py-2 px-4 text-left">한글명</th>
          <th class="py-2 px-4 text-right">현재가(원)</th>
          <th class="py-2 px-4 text-right">전일대비</th>
          <th class="py-2 px-4 text-right">거래대금</th>
        </tr>
      </thead>
      <tbody class="text-gray-900">
        <tr v-for="(coin, key) in coins" :key="key">
          <td class="py-1 px-4 text-left">
            <div class="font-semibold text-gray-700">
              {{ coin.korean_name }}
            </div>
            <div class="text-sm text-gray-500">{{ coin.market }}</div>
          </td>
          <td class="py-1 px-4 text-right font-semibold">
            {{ GetRatePrefix(coin) }}{{ GetCurrency(coin.trade_price) }}
          </td>
          <td class="py-1 px-4 text-right">
            <div class="font-semibold">
              {{ GetRatePrefix(coin) }}{{ GetChangeRate(coin.change_rate) }}%
            </div>
            <div class="text-sm text-gray-500">
              {{ GetRatePrefix(coin) }}{{ GetCurrency(coin.change_price) }}
            </div>
          </td>
          <td class="py-1 px-4 text-right font-semibold text-gray-500">
            {{ getVolume(coin.acc_trade_price_24h) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <footer class="font-[0.9rem] border-t border-gray-300 p-4 text-gray-600">
    peterkimzz.com
  </footer>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { numToKorean } from 'num-to-korean'

const coins = ref({})

/** Utilities */
function GetCurrency(price) {
  return Number(price).toLocaleString()
}
function GetRatePrefix(coin) {
  switch (coin.change) {
    case 'RISE':
      return '+'
    default:
      return ''
  }
}
function GetChangeRate(rate) {
  return Number(rate).toFixed(2)
}
function getVolume(volume) {
  return numToKorean(Math.floor(volume / 100000000) * 100000000, 'mixed')
}

/** Upbit APIs */
function GetSymbols() {
  return axios.get('https://api.upbit.com/v1/market/all')
}
function GetTickers(markets = []) {
  return axios.get('https://api.upbit.com/v1/ticker', {
    params: { markets: markets.join(',') },
  })
}

/**  페이지가 로드되면 자동으로 호출되는 Vue.js의 사전 정의 함수 */
onMounted(async () => {
  try {
    const markets = []

    const { data: symbols } = await GetSymbols()

    symbols.forEach((symbol) => {
      /** `KRW-` 으로 시작하는 마켓만 핕터링 */
      if (symbol.market.indexOf('KRW-') === -1) {
        return
      }

      markets.push(symbol.market)
      coins.value[symbol.market] = symbol
    })

    const { data: tickers } = await GetTickers(markets)

    tickers.forEach((ticker) => {
      if (ticker.change === 'FALL') {
        ticker.trade_price = -ticker.trade_price
        ticker.change_price = -ticker.change_price
      }

      ticker.change_rate = ticker.change_rate * 100

      coins.value[ticker.market] = Object.assign(
        coins.value[ticker.market],
        ticker
      )
    })
  } catch (err) {}
})
</script>
```

![image](https://user-images.githubusercontent.com/20244536/129551073-407c021c-a542-49cd-9c17-f66dd3b42da9.png)

아까랑 비교해보니 훨씬 낫네요.

## 색 스타일링

스타일 부분도 조금 더 개선하고 싶은 점이 있습니다. 등락을 색으로 표시해주면 더 직관적일 것 같습니다.

```js
function GetColor(change) {
  switch (change) {
    case 'RISE':
      return 'text-red-600'
    case 'FALL':
      return 'text-blue-600'
    default:
      return 'text-gray-900'
  }
}
```

```html
<td :class="[GetColor(coin), 'py-1 px-4 text-right font-semibold align-top']">
  {{ GetRatePrefix(coin) }}{{ GetCurrency(coin.trade_price) }}
</td>
<td :class="[GetColor(coin), 'py-1 px-4 text-right']">
  <div class="font-semibold">
    {{ GetRatePrefix(coin) }}{{ GetChangeRate(coin.change_rate) }}%
  </div>
  <div class="text-sm text-gray-500">
    {{ GetRatePrefix(coin) }}{{ GetCurrency(coin.change_price) }}
  </div>
</td>
```

`v-bind` 를 이용해서 html `class` 태그에 js 함수를 적용하는 부분입니다. 이런 방식을 활용해 동적으로 클래스를 계속 바꿔줄 수도 있겠죠.

![image](https://user-images.githubusercontent.com/20244536/129552175-d678c3cf-01d8-42ac-81b4-70444ff93dff.png)

## 웹 소켓

실시간 데이터를 받아올 때는 HTTP 요청으로는 사실 한계가 있습니다. 뭐 매 초 HTTP 요청을 날려서 데이터를 가져올 순 있겠지만, 주식이나 코인 거래처럼 파바바박 시세가 바뀌게끔 구현하긴 어렵습니다. 한 꺼번에 숫자들이 바뀔테니까요.

그래서 **웹 소켓**이라는 기술이 필요합니다.

HTTP는 요청, 응답 1개의 프로세스로 이루어지고 연결이 끊어집니다. 그래서 구조상 매 요청이 독립적이게 됩니다. 즉, 요청 10번이 필요할 때 무조건 10번의 호출이 필요하게 됩니다. 어떻게 보면 비효율적이죠.

반면 웹 소켓은 최초 한 번 연결을 해두면, 그 이후에 연결이 끊어지기 전까지 서로 몇 번이고 요청/응답을 주고받을 수 있습니다. 실시간 데이터를 전송/수신하기엔 안성맞춤입니다.

다행히 업비트에서도 웹소켓 API를 제공하고 있습니다.

프로세스는 간단합니다.

1. 소켓 연결 준비하기 (`Open`)
2. 업비트 소켓 서버에 연결 요청 보내기 (`Send`)
3. 연결 후 데이터 수신하기 (`OnMessage`)

끝입니다. 간단하죠?

일단 좀 더 깔끔한 코드 작성을 위해 기존 코드를 조금 수정해주세요.

```vue
<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { numToKorean } from 'num-to-korean'
import { v4 as uuidv4 } from 'uuid'

const coins = ref({})

/** 이 부분 추가 */
const markets = ref([])

onMounted(async () => {
  try {
    const { data: symbols } = await GetSymbols()

    symbols.forEach((symbol) => {
      if (symbol.market.indexOf('KRW-') === -1) {
        return
      }

      /** 이 부분 수정 */
      markets.value.push(symbol.market)

      coins.value[symbol.market] = symbol
    })
  } catch (err) {}
})
</script>
```

`markets` 변수를 전역으로 사용할 수 있도록 밖에 선언해주고, `KRW-` 코인을 필터링해서 전역 `markets` 변수에 넣어주었습니다.

자 다음은 웹 소켓 부분입니다.

```vue
<script setup>
import { v4 as uuidv4 } from 'uuid'

onMounted(async () => {
  try {
    /** 생략 */

    const ws = new WebSocket('wss://api.upbit.com/websocket/v1')

    ws.onopen = (e) => {
      ws.send(
        `${JSON.stringify([
          { ticket: uuidv4() },
          { type: 'ticker', codes: markets.value },
        ])}`
      )
    }

    ws.onmessage = async (payload) => {
      const ticker = await new Response(payload.data).json()

      if (!coins.value[ticker.code]) {
        return
      }

      if (ticker.change === 'FALL') {
        coins.value[ticker.code].trade_price = -ticker.trade_price
        coins.value[ticker.code].change_rate = -ticker.change_rate
        coins.value[ticker.code].change_price = -ticker.change_price
      } else {
        coins.value[ticker.code].trade_price = ticker.trade_price
        coins.value[ticker.code].change_rate = ticker.change_rate
        coins.value[ticker.code].change_price = ticker.change_price
      }
    }
  } catch (err) {}
})
</script>
```

브라우저 환경에서의 예제는 문서에도 없길래 직접 작성해보았습니다. 핵심은 응답 받는 데이터를 `Response` 객체로 받아서 `json` 포맷으로 만들어주는 부분입니다.

아까 말한 것 처럼 소켓을 열고 요청을 보내고, 성공하면 `onMessage` 부분에 업비트 웹소켓 서버에서 보내는 데이터를 계속해서 수신하게 됩니다.

자세한 API 사용법은 [여기](https://docs.upbit.com/docs/upbit-quotation-websocket)를 확인해주세요.

![Animation](https://user-images.githubusercontent.com/20244536/129555612-e6ee2237-701e-492a-a528-ade9b17cc307.gif)

와! 저희가 만든 앱이 100% 실시간 업비트 데이터를 보여주고 있네요.

## 크롬 확장 프로그램에서 실행하기

고생하셨습니다. 이제 크롬 확장 프로그램으로 동작하는지만 확인하면 끝입니다.

다만, 지금 상태로 크롬 확장 프로그램으로 실행시키면 좌우 너비가 안맞을 가능성이 높습니다. 지정해주지 않았기 때문이죠. 그래서 마지막으로 좌우 넓이를 조정하고 테스트해보도록 하겠습니다.

`App.vue`의 코드 전체를 `div`로 감싸고, `width`의 최소 너비를 `30rem`으로 주도록 하겠습니다.

```vue [App.vue]
<template>
  <div class="min-w-[30rem]">// ...</div>
</template>
```

이제 끝입니다. 빌드를 해줍시다.

```bash bash
npm run build
```

다음은 브라우저의 확장 프로그램 관리 페이지로 이동해서 개발자 모드를 켜주시고, 우리가 빌드한 결과물인 `dist` 폴더를 `압축해제 된 확장앱 설치` 버튼을 이용해 로드해주고 실행시켜주세요.

![Animation1](https://user-images.githubusercontent.com/20244536/129556666-875cf900-63e9-4489-a5f9-8a77614d9590.gif)

## 마무리

3부가 너무 길어서 4부까지 갈까 하다가 그냥 3부로 마무리를 했습니다.

이 시리즈를 보면서 이해가 안되셨어도 괜찮습니다. 코드가 200줄도 안되는 간단한 앱이지만, 생각보다 어려운 개념들이 많이 들어가있습니다.

그리고 약간의 버그도 있습니다. (+ 에서 -되면 색이 안변한다든지)

그치만 진행 중 모르는 부분을 구글링하면서 조금씩이라도 이해하셨다면 굉장히 많은 부분을 경험하신겁니다. 진짜로요.

하다가 잘 안되는 부분은 댓글 남겨주세요.

찐막으로 제가 실제 배포해서 운영 중인 코인 시세 모니터링 프로그램인 `브리아나` 소개해드리면서 이번 시리즈 마무리하도록 하겠습니다.

[브리아나 - 1초만에 코인 시세 확인하기](https://store.whale.naver.com/detail/hkipiplimgkfnhbimapmehjohnialiec)
![image](https://user-images.githubusercontent.com/20244536/129557679-d4986353-e84f-425c-887a-a43e3734bfad.png)

여러분들도 멋진 확장 프로그램 만드시길 바랍니다.
