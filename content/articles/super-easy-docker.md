---
category: tech
title: 정말 너무 쉬운 Docker
updated: 2021-06-09
created: 2021-06-09
thumbnail: https://dynamisign.com/api/sign?t=%EC%A0%95%EB%A7%90%20%EB%84%88%EB%AC%B4%20%EC%89%AC%EC%9A%B4%20Docker&d=peterkimzz.com
published: true
---

우리가 [`Docker`](https://docker.com)를 사용해야하는 가장 큰 이유는, 어떤 컴퓨터에서든 똑같은 개발 환경을 보장해주기 떄문입니다.

로컬 컴퓨터에서 열심히 개발하고 `AWS`에 코드를 올렸는데, 에러를 마주하며 스트레스를 받았던 경험이 한 번쯤은 있을겁니다. 내 컴퓨터랑 클라우드 컴퓨터의 환경이 100% 똑같지 않기 때문이죠. 근데 이 어려움을 한 번에 해결해준다? 쓰지 말아야 할 이유가 없습니다.

<!--more-->

이 뿐만이 아닙니다. 내 앱을 실행하기 위한 모든 과정을 미리 패키징해두면 몇 초만에 앱 수 십개를 구동할 수도 있습니다. 서비스를 확장할수록 더 많은 인스턴스를 운영해야하기 때문에 반드시 도커를 사용해야 할 시점이 오게 됩니다.

이번 포스팅에서는 `node.js`와 `typescript`를 사용하는 아주 간단한 서버를 도커라이징하고, 도커를 더 쉽고 효율적으로 사용하는 몇 가지 팁들을 알려드리겠습니다.

## Node.js 서버 만들기

일단 프로젝트 폴더를 구성합니다.

```bash [shell]
$ mkdir node-docker
$ cd node-docker

$ yarn init -y # package.json 만들기
```

다음은 노드 서버를 돌리기 위한 패키지를 설치하고, 앱의 진입점이 될 타입스크립트 파일까지 만들어줍니다.

```bash [shell]
$ yarn add express
$ yarn add -D typescript ts-node nodemon @types/node @types/express

$ touch index.ts
$ npx tsc --init # tsconfig.json 만들기
```

여기까지 하면 우리 프로젝트 폴더의 구조는 다음과 같습니다.

```
node-docker/
|-- node_modules
|-- index.ts
|-- package.json
|-- tsconfig.json
|-- yarn.lock
```

`express`는 노드에서 가장 많이 사용하는 서버 라이브러리입니다. 그럼 바로 스크립트를 작성하도록 합니다.

```ts [index.ts]
import express from 'express'
const app = express()

app.get('/', (req, res) => {
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
    "start": "node index.js",
    "dev": "nodemon -L --exec ts-node index.ts",
    "build": "tsc"
  }
}
```

터미널에 `yarn dev`를 입력하고, 브라우저를 통해 `localhost:3000`으로 접속해보면 메세지를 응답 받을 수 있습니다.

추가로 개발 환경 때 시간 단축을 위해 `nodemon` 패키지를 사용합니다. `-L` (Legacy Watch) 플래그를 넣는 이유는 WindowsOS에서 `ts` 파일을 수정할 때 인식이 안되는 버그가 있어서 그렇습니다.

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
CMD [ "yarn", "dev" ]
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

그리고 지금은 이미지 1개만 띄우니까 괜찮지만, 나중에는 몇 개를 띄워야 할 지 모릅니다. 그 때 마다 일일히 이미지 하나씩 올리는 건 상당히 귀찮은 일이겠죠.

그래서 여러 이미지를 한 번에 관리할 수 있게끔 개발된 게 `Docker Compose` 입니다. 바로 예제를 보도록 하죠.

```yaml [docker-compose.yml]
version: '3.9'

services:
  app: # 이미지 이름 (마음대로 설정해도 됩니다)
    build: . # Dockerfile이 있는 경로를 넣어주기
    ports:
      - '3000:3000' # docker CLI의 "-p 3000:3000" 과 같은 표현
```

프로젝트 루트 디렉토리에 `docker-compose.yml` 파일을 만들어 주고 터미널에 `docker compose up` 을 입력하면 정상적으로 컨테이너가 생성되고, 로컬호스트로 접근이 가능해집니다.

> docker compose CLI는 이제 docker CLI에서 제공됩니다. `docker-compose CMD` 대신 `docker compose CMD` 를 사용해주세요.

그리고 여러 개의 컨테이너를 한 꺼번에 띄우고 싶다면 이런식으로 하면 됩니다.

```yaml [docker-compose.yml]
version: '3.9'

services:
  app1:
    build: .
    ports:
      - '3000:3000'

  app2:
    build: .
    ports:
      - '3001:3000'

  app3:
    build: .
    ports:
      - '3002:3000'

  app4:
    build: .
    ports:
      - '3003:3000'
```

이러고 3000 ~ 3003 포트까지 들어가보면 잘 접속됩니다.

![image](https://user-images.githubusercontent.com/20244536/121302145-359e9600-c934-11eb-8a32-2aa5c323945a.png)
_이미지가 잘 안보이는데, 아무튼 4개 앱이 각자 다른 포트로 열렸다는 뜻_

도커 컴포즈는 일반 도커 명령어와 다르게, 터미널에서 작업을 종료하면 그대로 컨테이너들이 모두 비활성화됩니다. 백그라운드에서도 계속 실행시키고 싶다면 `docker compose up -d` 명령어를 사용해주세요.

그리고 백그라운드에서 실행된 컨테이너들을 한 번에 지우려면 `docker compose down`을 하면 됩니다. (다른 디렉토리에서 하면 당연히 안됩니다..)

## 프로젝트 구조 개선하기

여기까지 간단하게 `Docker` 에 대해 살펴봤습니다. 근데 사실 지금 상태로 앱을 개발하고, 배포하기엔 몇 가지 문제가 있습니다.

첫 번째는 **핫 리로딩**입니다. 도커 컨테이너로 개발을 하는 경우, 코드를 수정할 때 마다 개발 서버가 다시 시작되지 않습니다. 이유는 우리가 수정하는 코드는 로컬 컴퓨터의 코드지, 컨테이너 안의 코드가 아니기 때문입니다.

두 번째는 **배포**입니다. 일반적으로 배포용 앱은 `webpack` 같은 번들링 도구를 이용해 코드를 변형하거나 압축시키는 작업을 하게 됩니다. 그렇게 하기 위해서는 배포용 `Dockerfile` 이 필요합니다.

### 핫 리로딩 개선하기

해결 방법은 간단합니다. 내 로컬 컴퓨터와 컨테이너의 **저장 공간**을 공유하면 됩니다. 로컬 코드를 수정하면 바로 컨테이너 안의 코드도 같이 수정이 되는거죠.

```yaml [docker-compose.yml]
version: '3.9'

services:
  app:
    build: .
    ports:
      - '3000:3000'
    volumes:
      - '.:/usr/src/api' # Dockerfile의 WORKDIR와 맞추기
      - '/usr/src/api/node_modules' # 핫 리로드 성능 개선
```

이렇게 하고 `docker compose up --build` 명령어로 새로 빌드하면서 컨테이너를 띄워주고, 코드를 수정하면 바로 서버가 다시 시작하게 됩니다.

### 개발용, 배포용 이미지 분리하기

일단 기존 도커파일은 개발용이었으니 파일 이름을 `Dockerfile.dev` 로 변경해주고, 배포용 파일인 `Dockerfile` 을 새로 만들어주세요.

배포용 도커 파일은 이렇게 작성합니다.

```dockerfile [Dockerfile]
FROM node:14-slim

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

RUN yarn build # 빌드하는 부분 추가

EXPOSE 3000

CMD [ "yarn", "start" ] # `yarn dev`에서 `yarn start`로 변경
```

그리고 기존 `docker-compose.yml` 도 이름을 `docker-compose.dev.yml` 로 바꾸고, 새로운 컴포즈 파일을 만들고 아래 내용을 작성합니다.

```yaml [docker-compose.yml]
version: '3.9'

services:
  app:
    build: .
    ports:
      - '80:3000'
```

물론 배포용 앱을 웹서버 없이 그냥 올리는 사람은 없을겁니다. `nginx` 같은 웹서버로 프록시를 해줘야 하지만, 여기서 다루면 또 내용이 비대해지기 때문에, 일단은 대충 이렇게 한다는 걸 알아두시면 되겠습니다.

개발용인 `Dockerifle.dev` 와 `docker-compose.dev.yml` 은 이렇게 사용하면 됩니다.

도커파일은 똑같고, 컴포즈 파일은 조금 수정이 필요합니다.

```yaml [docker-compose.dev.yml]
version: '3.9'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - '3000:3000'
    volumes:
      - '.:/usr/src/app'
      - '/usr/src/app/node_modules'
```

`build` 부분이 조금 바뀌는데, 개발 때는 `Dockerfile.dev` 을 읽도록 바꿔주었습니다.

`CLI`로 실행할 땐 `-f` 플래그를 이용하면 됩니다.

```bash [shell]
$ docker compose -f docker-compose.dev.yml up --build
```

### 참고

- [Node.js 웹 앱의 도커라이징 - nodejs.org](https://nodejs.org/ko/docs/guides/nodejs-docker-webapp/)
- [Compose file - docs.docker.com](https://docs.docker.com/compose/compose-file/)
