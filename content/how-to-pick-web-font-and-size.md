---
category: design
title: 웹 폰트와 사이즈는 어떻게 결정해야할까?
image: https://user-images.githubusercontent.com/20244536/102753419-964e0c80-43ae-11eb-837a-fd902643f37a.png
updated: 2020-12-21
created: 2020-12-21
published: true
---

웹 사이트의 완성도를 결정하는 가장 중요한 요소 중 하나는 바로 **폰트** 입니다. 폰트는 한국어로 **서체** 정도로 해석할 수 있겠고, 비슷한 활자의 모음이라고 생각하면 됩니다.

이 폰트는 같은 Family라면 (Serif, Sans-serif 등) 얼핏보면 구분하기 어려울 정도로 미세하게 다릅니다. 하지만, 이 미세한 차이가 독자의 피로도를 크게 좌우하기 때문에 신중하게 선택해야합니다.

<!--more-->

그런데, 사실 이 폰트를 채택하는 기준에는 정답이 없습니다. 브랜딩이나 웹사이트 성격에 맞게 결정하기 때문입니다. 브런치나 미디엄같은 블로그 서비스라면 독자가 읽기 편한 폰트를 선택하는게 좋은 선택이겠죠.

개인적으로 추천하는 웹 폰트 설정은 이렇습니다. CSS 한 줄만 추가하면 됩니다.

```css
html {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica
      Neue, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;
}
```

이 폰트 구성을 사용하는 웹사이트는 대표적으로 외국 서비스 중엔 [Github](https://www.github.com), [Notion](https://notion.so), [Product Hunt](https://www.producthunt.com)가 있고, 국내 서비스 중엔 [클래스101](https://class101.net), [마이리얼트립](https://www.myrealtrip.com), [탈잉](https://taling.me/) 등이 있습니다. (완전 똑같지는 않지만, 거의 같은 구성입니다.)

위에 나열한 폰트들은 모두 시스템 폰트이고, 개인적으로는 어디에나 잘 어울리는 기본 중에 기본같은 녀석이라고 생각합니다. CSS의 font-family 속성은 제일 앞에 있는 서체부터 찾기 시작하고, 만약 있으면 그 서체로 텍스트를 렌더링합니다.

시스템 폰트의 장점은 외부 리소스를 가져올 필요 없이 사용할 수 있다는 점입니다. 사용자 컴퓨터에 이미 탑재가 되어있기 때문입니다. 폰트가 웹 리소스 로딩에 차지하는 비율이 굉장히 크기 때문에, 특별한 이유가 있지 않다면 시스템 폰트로 구성하는게 성능 최적화에 큰 도움이 됩니다.

> 웹 콘텐츠에 한중일 언어가 포함되는 경우, `system-ui`는 사용하지 않는게 좋습니다. 현재 Firefox와 Edge에서 fallback 폰트를 찾지 못하는 이슈가 있습니다.

## 폰트 사이즈

폰트의 크기를 채택하는 건, 폰트를 고르는 것 만큼이나 중요합니다. 콘텐츠 전반적으로 폰트 크기가 크면 미관상 좋지 않습니다. 어르신들이 카카오톡을 사용하는 걸 슬쩍 보고 '와 폰트 진짜 크다!' 했던 경험이 한 번쯤은 있을겁니다. 폰트가 너무 크다보니 UI가 전부 흐트러져서 좋아보이진 않지만, 노안때문에 어쩔 수 없습니다.

그렇다고 너무 폰트가 작아버리면 읽기가 너무 힘듭니다. 브라우저, OS 환경에 따라 폰트가 깨져 보이기도 합니다. 이제는 유저들이 정말 다양한 환경에서 텍스트를 읽기 때문에, 우리 웹 개발자/디자이너들이 신경써서 대응할 수 밖에 없겠습니다.

폰트 시스템을 잘 설계하려면, 기초를 잘 잡아야 합니다. 여기서 말하는 기초란 기본 (Default) 폰트 사이즈입니다. 이것도 정답은 없습니다. 그냥 우리가 만드려는 사이트와 비슷한 성격을 가진 다른 사이트들을 참고해서 기본 사이즈를 정하는게 옳은 방향이겠죠.

저는 이 블로그의 기본 폰트 사이즈를 `16px`, 모바일 환경에선 `14px`로 설정했습니다. CSS로는 이렇게 작성합니다.

```css
html {
  font-size: 14px;

  @media (min-width: 768px) {
    font-size: 16px;
  }
}
```

하지만 많은 웹사이트들이 단 한 개의 사이즈만 사용하진 않습니다. 정보의 위계질서에 따라 텍스트 일부를 작게, 혹은 크게 표시해야 할 필요가 있기 때문입니다.

예를 들어 우리가 글을 쓸 때 제목은 크게 쓰고, 본문은 적당한 사이즈, 그리고 각주 같은 것들은 작게 쓰는게 보기 좋고, 이런 패턴이 거의 대부분의 사람들에게 익숙합니다.

근데 여기서 중요한 건, 매 페이지마다 제목이나 본문의 글자 크기가 달라지면 안되겠죠. 엄밀히 말하면 안될 이유는 없지만, 굉장히 불편할겁니다. 사람들은 규칙적인 것에 안정감을 느끼기 때문입니다.

규칙적이면서 효율적으로 사이즈를 관리하려면 이 사이즈들을 숫자로만 나타내는 게 아니라, 나름의 유저 친화적인 작명이 필요합니다. 예를 들면 이렇게 구성할 수 있습니다.

- `font-xs`: 12px
- `font-sm`: 14px
- `font-base`: 16px
- `font-lg`: 18px
- `font-xl`: 20px

대제목은 `font-xl`, 소제목은 `font-lg`, 본문은 `font-base`, 각주나 조금 덜 중요한 것들은 `font-sm`나 `font-xs`로 사용하면 개발하는 사람 입장에서는 엄청 편하겠죠.

눈치 채셨겠지만, 잘 짜여진 폰트 디자인 시스템은 크기의 증감이 Base로 부터 규칙적입니다. 이게 모든 상황에서 정답은 아닐 수 있지만, 대체로 이런 규칙을 갖추는 게 안정적이라고 합니다.

## rem vs px

CSS에서 폰트 사이즈를 결정할 때 주로 `rem`이나 `px`이라는 단위를 사용하게 됩니다. rem은 HTML 최상위 태그에 적용된 폰트 사이즈에 의존해서 크기가 결정되고, px은 어떠한 경우에도 설정한 값으로만 보여집니다.

예를 들어 우리가 이렇게 CSS를 적용했습니다.

```css
html {
  font-size: 16px; // 만약 설정하지 않는다면, 브라우저 기본 사이즈가 설정됩니다. 일반적으로 16px입니다.
}

.p1 {
  font-size: 1.5rem;
}
.p2 {
  font-size: 24px;
}
```

결과적으로 `.p1`과 `.p2` 모두 `24px`로 렌더링됩니다. rem은 앞서 말한 것 처럼 Root 태그의 사이즈인 16px과 자신에게 설정된 1.5를 곱해 24px라는 값이 나오게 된 것입니다.

저는 `rem`을 사용하는걸 권장드립니다. 이유는 `rem`은 사용자 환경에 따라 유동적으로 바뀌기 때문입니다. 우리가 폰트 사이즈를 유동적으로 해야하는 이유는, 사용자의 환경을 예측할 수 없기 때문입니다.

아까 말했던 카카오톡을 사용하는 어른들의 사례를 다시 떠올려봅시다. 만약 우리가 `px`로 모든 콘텐츠의 사이즈를 고정해버리면 원래 폰트를 크게 보는 사람들을 고려하지 않는 셈이 되어버립니다. 하지만 최상위 태그에 기본 값을 지정하지 않은 상태에서 `rem`을 이용하면 사용자의 환경에 맞게 렌더링할 수 있게 됩니다. 하지만 역시 정답은 없습니다. 글자가 커지면서 UI가 흐트러지는 게 싫다면 rem을 쓰지 않는게 옳은 방향이겠죠.

만약 `rem`을 사용하는 경우 아까 설정한 폰트 디자인 시스템은 이렇게 바뀝니다.

- `font-xs`: 0.75rem
- `font-sm`: 0.875rem
- `font-base`: 1rem
- `font-lg`: 1.125rem
- `font-xl`: 1.25rem

일반적으로 브라우저의 기본 폰트 사이즈는 16px이므로, 결과값은 아까랑 같습니다.

## 결론

폰트 모양과 사이즈를 결정하는데 있어서 고려해야할 요소들을 정리해보았습니다. 2줄 요약하자면 이렇습니다.

- 폰트는 **시스템 폰트**를 사용하자. 웹 리소스 로딩을 많이 줄일 수 있다.
- 폰트 사이즈는 px대신 `rem`을 사용하자. 사용자 브라우저 사이즈에 맞게 유동적으로 대응할 수 있다.

사실이 두 가지 말고도 자간, 줄간격과 행간까지 고려해야하는데, 그건 다음 포스팅에서 알아보도록 하겠습니다.

### 참고

- https://github.com/necolas/normalize.css/issues/665
