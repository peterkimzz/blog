---
category: tech
title: 정말 쉽고 간편한 Docker Compose
updated: 2021-06-07
created: 2021-06-07
published: false
---

우리가 [`Docker`](https://docker.com)를 사용해야하는 가장 큰 이유는, 어떤 컴퓨터에서든 똑같은 개발 환경을 보장해주기 떄문입니다.

로컬 컴퓨터에서 열심히 개발하고 `AWS`에 코드를 올렸는데, 에러를 마주하며 스트레스를 받았던 경험이 한 번쯤은 있을겁니다. 내 컴퓨터랑 클라우드 컴퓨터의 환경이 100% 똑같지 않기 때문이죠. 근데 이 어려움을 한 번에 해결해준다? 쓰지 말아야 할 이유가 없습니다.

<!--more-->

도커의 장점은 이 뿐만이 아닙니다. 내 앱을 실행하기 위한 모든 과정을 미리 패키징해두면 몇 초만에 앱 수 십개를 구동할 수도 있습니다. 서비스를 확장할수록 더 많은 인스턴스를 운영해야하기 때문에 반드시 도커를 사용해야 할 시점이 오게 됩니다.

이번 포스팅에서는 `node.js`와 `typescript`를 사용하는 아주 간단한 서버를 도커라이징하고, 도커를 더 쉽고 효율적으로 사용하는 몇 가지 팁들을 알려드리겠습니다.

## Node.js 서버 만들기

일단 프로젝트 폴더를 구성합니다.

```bash [shell]
$ mkdir node-docker
$ cd node-docker

$ yarn init -y # package.json 만들기
```

다음은 노드 서버를 돌리기 위한 패키지를 설치하고, 앱의 진입점이 될 자바스크립트 파일까지 만들어줍니다.

```bash [shell]
$ yarn add express
$ touch index.js
```

여기까지 하면 우리 프로젝트 폴더의 구조는 다음과 같습니다.

```
node-docker/
|-- node_modules
|-- index.js
|-- package.json
|-- yarn.lock
```

`express`는 노드에서 가장 많이 사용하는 서버 라이브러리입니다. 그럼 바로 스크립트를 작성하도록 합니다.

```js [index.js]
const express = require('express')
const app = express()

app.get('/', function(req, res) {
  res.json({ message: 'Hello, Docker!' })
})

app.listen(3000)
console.log('http://localhost:3000..')
```

서버에 요청할 때 마다 `Hello, Docker!`를 응답하는 간단한 서버입니다.

서버 코드를 작성했으니 앱을 실행시켜야겠죠. `package.json` 파일을 수정합니다.

```json [package.json]
{
  "scripts": {
    "start": "node index.js"
  }
}
```

터미널에 `yarn start`를 입력하고, 브라우저를 통해 `localhost:3000`으로 접속해보면 메세지를 응답 받을 수 있습니다.

![image](https://user-images.githubusercontent.com/20244536/121014877-69af7500-c7d5-11eb-814c-dcbc963acdff.png)

## Dockerfile

도커를 사용하기 위해 사용자 컴퓨터에 도커를 설치해야하는데, [도커 홈페이지](https://www.docker.com/get-started)에서 `Docker Desktop`을 다운로드 해주세요.

잘 설치했다면 터미널에서 `docker` 명령어를 사용할 수 있습니다.

```
$ docker -v
Docker version 20.10.6, build 370c289
```

자 그럼 도커를 사용하기 위해 `Dockerfile` 을 작성해야 합니다. 별 거 없습니다. 그냥 어떤 순서로 앱을 패키징할지 나열하는 것 뿐입니다.

프로젝트 루트 폴더에 도커파일을 만들어주세요. (대문자 `D` 오타 아닙니다)

```bash
$ touch Dockerfile
```

그럼 node 앱을 돌리기 위한 간단한 도커파일을 작성합니다.

```dockerfile [Dockerfile]

# 어떤 환경에서 도커 이미지를 만들지 결정하기.
FROM node:14-slim

# 도커 컨테이너 내부의 작업 디렉토리 결정하기. 원하는 대로 정하면 됩니다.
WORKDIR /usr/src/app

# 외부 패키지 설치를 위해 package.json과 yarn.lock 파일 복사
COPY package.json .
COPY yarn.lock .

# 패키지 설치
RUN yarn

# 나머지 모두 복사
COPY . .

# 도커 컨테이너에 접근할 수 있게 포트 열어주기
EXPOSE 3000

# 앱 실행시키기
CMD [ "yarn", "start" ]
```

참고로 도커 파일을 통해 패키징한 결과물을 **이미지**라고 합니다. 그리고 이 이미지를 저장하는 곳은 **레지스트리** 라고 합니다. 우리가 깃 프로젝트를 깃허브 리파지토리에 올리는 것과 비슷한 겁니다. 그래서 이 이미지들도 `Docker Hub`나 `AWS ECR` 같은 원격 레지스트리에 저장시켜서 사용합니다.

아무튼 `Dockerfile` 작성에 대한 방법은, 그냥 받아들이면 됩니다. 한 가지 `COPY` 명령어가 직관적으로 이해가 안갈 수 있습니다.

`COPY A B` 이런식으로 사용하면 되고, A가 내 컴퓨터 쪽, B가 도커 컨테이너 쪽입니다. A를 B로 복사한다는 뜻입니다.

이제 이 도커파일을 이용해 이미지를 만들어봅시다. 터미널에 입력해주세요.

```bash [shell]
$ docker build . -t node_app

[+] Building 11.6s (12/12) FINISHED
 => [internal] load build definition from Dockerfile                                                       0.0s
 => => transferring dockerfile: 187B                                                                       0.0s
 => [internal] load .dockerignore                                                                          0.0s
 => => transferring context: 2B                                                                            0.0s
 => [internal] load metadata for docker.io/library/node:14-slim                                            2.2s
 => [auth] library/node:pull token for registry-1.docker.io                                                0.0s
 => CACHED [1/6] FROM docker.io/library/node:14-slim@sha256:a3ff0656dfa88cc5c4092af3e18d16cbbbf50417ce4d0  0.0s
 => [internal] load build context                                                                          1.3s
 => => transferring context: 1.07MB                                                                        1.1s
 => [2/6] WORKDIR /usr/src/app                                                                             0.0s
 => [3/6] COPY package.json .                                                                              1.1s
 => [4/6] COPY yarn.lock .                                                                                 0.0s
 => [5/6] RUN yarn                                                                                         5.1s
 => [6/6] COPY . .                                                                                         0.9s
 => exporting to image                                                                                     0.9s
 => => exporting layers                                                                                    0.9s
 => => writing image sha256:33c768313fd785507812a137e90fdf97f629edd91d06851846ba416df6a62277               0.0s
 => => naming to docker.io/library/node_app                                                                0.0s
```

한 가지 알아둘 부분은, `-t` 는 태그를 지정한다는 뜻입니다. 지정하지 않으면 이름이 `NONE` 으로 지정되면서 사용하는 데 불편하므로 태깅을 잘 해주세요.

아래는 빌드된 이미지를 확인하는 방법입니다.

```bash [shell]
$ docker images

REPOSITORY   TAG       IMAGE ID       CREATED              SIZE
node_app     latest    33c768313fd7   About a minute ago   382MB
```

빌드된 이미지를 실행시켜봐야겠죠. 아래 명령어를 입력해주세요.

```bash [shell]
$ docker run -p 3000:3000 node_app

# 이렇게 컨테이너를 여러 개 실행시킬 수도 있음. 포트 바꿔서 들어가보세요.
$ docker run -p 3001:3000 node_app
$ docker run -p 3002:3000 node_app
```

브라우저를 통해 접속이 된다면 성공입니다. 이렇게 빌드된 이미지를 실행시키면, 그걸 **컨테이너**라고 부릅니다.

현재 실행 중인 모든 컨테이너 목록을 보고 싶으면 아래 명령어를 입력해주세요.

```bash [shell]
$ docker ps -a

CONTAINER ID   IMAGE      COMMAND                  CREATED          STATUS          PORTS                                       NAMES
36f74a13d90d   node_app   "docker-entrypoint.s…"   12 seconds ago   Up 10 seconds   0.0.0.0:3000->3000/tcp, :::3000->3000/tcp   upbeat_blackburn
```

쓱 한 번 보고 넘어가세요. `STATUS` 부분이 Up이라고 되어있으면 앱이 돌아간다는 뜻이니까, 컨테이너를 삭제하고 싶다면 `CONTAINER ID`를 이용해 삭제해줍시다.

```bash [shell]
$ docker rm -f 36f74a13d90d
```

## Docker Compose

지금까지 `Docker CLI`를 이용해서 이것 저것 해보았습니다만, 저는 CLI로 docker를 사용하는 것을 추천하지 않습니다. 도커 특성상 많은 옵션을 주어야 하는데 언제 일일히 치고 있나요. 명령어가 길어져서 보기 안좋습니다.

### 참고

- [Node.js 웹 앱의 도커라이징 - nodejs.org](https://nodejs.org/ko/docs/guides/nodejs-docker-webapp/)
