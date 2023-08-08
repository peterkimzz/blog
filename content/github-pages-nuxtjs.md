---
category: tech
title: 평생 무료로 개인 블로그 운영하기
thumbnail: https://user-images.githubusercontent.com/20244536/102336973-3aae0880-3fd5-11eb-8fd1-e3c184d6ab7e.jpg
updated: 2020-12-17
created: 2020-12-17
published: true
---

거의 대부분의 개발자들이 `개인 블로그`를 운영하라고 얘기한다. 나도 그렇게 생각한다. 왜냐면 분명히 내가 작성했던 코드인데도, 일주일만 지나도 기억이 안나기 때문이다. 그리고 웬만하면 공개해서 작성하라고 하고 싶다. 이미 우리는 누군가가 옛날에 썼던 글을 보고, 문제를 해결한 경험히 굉장히 많기 때문이다. 나는 이런 개발자들의 문화가 너무 좋다. 이런 개발자들의 문화가 다른 업종에도 접목된다면 정말 좋으련만.

<!--more-->

아무튼 얼마 전 블로그를 새롭게 오픈했다. 사실 `미디엄`, `브런치`나 `Velog`같이 훌륭한 서비스들이 이미 많이 존재한다. 그럼에도 내가 개인 블로그를 오픈한 건, 개발자로써 개인 도메인을 가지고 싶기 때문이다. 무엇보다 디자인을 내 마음대로 꾸밀 수 있다.

그럼 개인 블로그를 운영하기 위한 최고의 솔루션인 [Github Pages](https://pages.github.com/)를 이용해보자. (개인적인 생각임)

먼저 내가 생각하는 Github Pages의 장점은 크게 세 가지이다.

1. 평생 무료
2. HTTPS 신경 안써도 됨
3. Github 하나의 플랫폼 내에서 운영을 위한 모든 인프라를 쉽게 해결 가능

Github가 망하지 않는 이상 평생 무료이고, Github Pages는 정말 쉽게 커스텀 도메인과 HTTPS까지 연결할 수 있다. ~~평생 Github에 충성하자.~~

## 리파지토리 만들기

![](https://user-images.githubusercontent.com/20244536/102364149-7f4b9b00-3ff9-11eb-82bc-80751707887c.png)

일단 먼저 Github Pages를 이용하기 위해서 Github Repository를 만든다.

> 기본적으로 도메인 주소는 https://USERNAME.github.io/REPOSITORY 의 포맷으로 만들어진다. 예를 들어, 사진처럼 구성하면 https://peterkimzz.github.io/article 로 만들어진다.

## Github Pages

![](https://user-images.githubusercontent.com/20244536/102364247-95f1f200-3ff9-11eb-84e3-ca6c0836fdcd.png)

리파지토리 생성 후 `Settings` 설정으로 이동한 뒤, 아래로 내리다보면 `Github Pages` 라는 섹션을 발견할 수 있다. Github Pages의 호스팅 원리는, 해당 리파지토리에 푸시된 `브랜치`를 루트 폴더로 삼아 호스팅을 하게 된다. 브랜치 이름은 아무거나 해도 상관없다.

> Github Pages에 호스팅하는 브랜치 이름은 관습적으로 **gh-pages** 라는 이름을 쓴다. 다른 이름을 써도 무방하다.

## index.html

이번 포스팅에선 블로그가 동작하는지만 알아보기 위해 1개의 정적 HTML 파일만 업로드하겠다.

먼저 소스 코드를 컴퓨터에 clone 하자.

```bash
$ git clone https://github.com/USERNAME/REPOSITORY.git
```

다음, 루트 폴더에 HTML 파일을 만든다.

```html [index.html]
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Blog by Github Pages</title>
  </head>
  <body>
    <div>
      <h1>Hello, Pages!</h1>
    </div>
  </body>
</html>
```

빠르게 만들어주고, 리파지토리에 푸시해주도록 한다.

```bash
$ git add .
$ git commit -m 'Added index.html'
$ git push
```

코드를 푸시하고 나서 다시 Settings의 Github Pages 섹션으로 이동하면 아까는 보이지 않았던 main 브랜치를 찾을 수 있고, main으로 설정한 뒤 `Save`하면 끝. 해당 링크에 배포되었으니 확인해보라는 문구도 나온다. 너무 간단하다.

![](https://user-images.githubusercontent.com/20244536/102366831-701a1c80-3ffc-11eb-9b28-c8284df820a5.png)

![](https://user-images.githubusercontent.com/20244536/102366952-8fb14500-3ffc-11eb-9fd3-d5ec231449e7.png)

이 글을 보는 사람들은 `React`나 `Vue` 같은 모던 웹 프레임워크를 사용할 확률이 높다. 나는 웹 프론트엔드를 주로 Nuxt.js를 사용하기 때문에 Nuxt 프로젝트를 main 브랜치에 전부 올리고, `Github Actions`를 이용해 main 브랜치에 푸시되면 알아서 빌드해서 gh-pages 브랜치에 다시 배포하게끔 CI/CD를 구성했다.

일반적인 설정이라면 React나 Vue는 SPA라서 HTML 파일이 하나밖에 나오지 않지만, 정적 배포를 위해 모던 프레임워크는 모두 `정적 빌드` 옵션을 제공한다. 그 기능을 이용하면 엄청난 생산성을 누릴 수 있다.

Github Actions가 익숙하지 않은 사람들이라면 npm에 등록된 `push-dir` 라이브러리를 이용하자. 로컬 컴퓨터에서 쉽게 gh-pages 브랜치에 배포할 수 있다. 문서가 잘 되어있으니 천천히 읽어보고 구현해보자.

> push-dir: https://www.npmjs.com/package/push-dir

## 커스텀 도메인 붙이기

사실 여기까지만 알아도 블로그를 운영하는데 전혀 지장이 없다. 오히려 github.io 도메인을 사용하면 전문적인 느낌이 나서 좋아보일 때도 있다. 하지만 Pages는 개인 블로그로만 쓰는 기능은 아니기 때문에, 커스텀 도메인이 필요할 때가 있다. 걱정하지 않아도 된다. 너무 쉽다.

![](https://user-images.githubusercontent.com/20244536/102369674-8f667900-3fff-11eb-995c-18ab079b8fc8.png)

Github Pages 섹션을 보면, `Custom domain`을 넣는 부분이 있다. 여기에 원하는 도메인을 넣으면 된다. 그리고 커스텀 도메인은 `루트 도메인`과 `서브 도메인` 모두 지원한다.

하지만 문서에서는 Apex(Root) 도메인을 사용하는 것 대신, **항상 서브 도메인**을 사용하는 걸 권장한다. 명확한 이유는 나와있지는 않지만, 루트 도메인은 DNS 제공 업체에서 A 레코드나 ANAME 등 다른 속성들과 함께 쓰이기 때문에 혼란이 있을 수 있다는 것으로 추측해본다. 또, www를 사용하는 도메인에 한해서 사이트 로딩이 더 빠른 등 여러 이점이 있다고 한다. 뭐 이유가 중요할까, 지금은 그냥 하라는 대로 하자.

아무튼 도메인이 `example.com` 이라면 무조건 `www.example.com`으로 설정하면 된다는 말이다. input에 www를 포함한 도메인을 넣어주고 Save하자.

Save하면 네임 서버를 찾을 수 없다고 경고가 나올 것이다. 이제 여기서 도메인을 구입한 사이트로 이동해야 한다. 나는 GoDaddy에서 도메인을 구입했다. 다른 DNS 제공 업체여도 원리는 같다.

![](https://user-images.githubusercontent.com/20244536/102372403-832feb00-4002-11eb-9600-5e9bdbf58194.png)

요약하자면 2가지를 DNS에 설정하면 된다.

1. **루트 도메인**에 대해, A 레코드에 Github 서버의 IP 주소 4개를 넣기
2. 원하는 **서브 도메인**에 대해, CNAME 레코드에 자신의 github pages url 넣기

이름 부분이 @인 업체도 있을 것이고 아닌 곳도 있을텐데, @는 루트 도메인을 가리키는 기호이다. 정상적으로 DNS 매핑되기 까지에는 시간이 조금 걸릴 수 있으니 기다리면서 **마지막 세팅**을 하러 다시 Github Pages로 돌아가자.

![](https://user-images.githubusercontent.com/20244536/102373037-241ea600-4003-11eb-99fc-499c43bdcec8.png)

커스텀 도메인을 넣으면 Enforce HTTPS 옵션이 해제되어있을텐데 이것을 켜주면 끝이다. 심지어 갱신도 알아서 해준다. 진짜 너무 쉽다.. 세상 좋다..

![](https://user-images.githubusercontent.com/20244536/102373060-297bf080-4003-11eb-919a-a04651e24f70.png)

정상적으로 설정했다면 이제 평생 무료로, 무한으로 즐기자. 😎

### 참고

- [Configuring a custom domain for your GitHub Pages site](https://docs.github.com/en/free-pro-team@latest/github/working-with-github-pages/configuring-a-custom-domain-for-your-github-pages-site)
- [Getting started with GitHub Pages](https://docs.github.com/en/free-pro-team@latest/github/working-with-github-pages/getting-started-with-github-pages)
