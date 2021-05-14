---
category: tech
title: Firebase를 대체할 오픈소스 프로젝트, Supabase
thumbnail: https://media.vlpt.us/images/peterkimzz/post/b2873856-20b6-49a4-a8f4-176a94c92d23/08f3d41684b91f7d68810459b2356ecb4819c382.png
updated: 2020-12-15
created: 2020-12-15
published: true
---

[`Supabase`](https://supabase.io/)는 구글 Firebase를 엔터프라이즈 레벨에서도 사용 가능하도록 만든 오픈소스 프로젝트이다. 현재는 베타 서비스이다.

컴퓨터에 직접 설치하는 방식은 아니고, Firebase처럼 클라우드로 제공되는 서비스이다.

내가 Firebase를 사용하면서 아쉬웠던 건, 데이터가 많아졌을 때 인덱싱을 쉽게 적용시켜서 빠르게 레코드를 읽어오는 기능이 강력하진 않아서 데이터가 많은 앱에서는 사용하기 힘들다는 점이다.

<!--more-->

## Supabase?

Supabase 팀은 이 프로젝트를 이렇게 소개한다.

> Create a backend in less than 2 minutes. Start your project with a Postgres Database, Authentication, instant APIs, and realtime subscriptions.

2분 안에 Postgres, 인증과 API, 실시간 구독을 구현할 수 있다는 얘기이다. 사실이라면 엄청나게 편리할 것 같다.

현재 회원가입은 Github OAuth로만 가능하고, 올해 12월까지 가입하는 유저들은 자동으로 2년 가량의 Base Tier 크레딧을 받을 수 있다.

![](https://images.velog.io/images/peterkimzz/post/8723a9c7-db0f-4385-9575-ebbef1b79a4d/image.png)

가입하고 Organization과 Database를 만들고 프로비저닝이 완료될 때 까지 기다리면 이런 대시보드가 나온다.

데이터베이스에 대한 정보도 볼 수 있는데, 비밀번호를 제외하고 전부 자동으로 설정되고, 변경도 되지 않는다. 베타 버전이라 그런 것 같은데, 오히려 이름 짓느라 고민하지 않아도 되서 개인적으로는 좋았다.

![](https://images.velog.io/images/peterkimzz/post/9fe72d58-cbde-4966-a1ba-632196d5cfaa/image.png)

## Table 생성

![](https://images.velog.io/images/peterkimzz/post/e062a75b-6dae-4b66-a556-12511cf2bf71/image.png)

테이블명과 PK를 설정하는 부분인데, PK는 4가지 타입으로 제공된다. 나는 uuid로 선택했다.

![](https://images.velog.io/images/peterkimzz/post/10b41a97-4401-4666-b20d-2344cd0eba37/image.png)

테이블과 PK를 설정하면 칼럼도 추가할 수 있는데 UI가 상당히 직관적이다.

아직은 베타 버전이라 현재는 웹사이트를 통해서만 Database, Table을 만들 수 있다.

## API

사실 데이터베이스는 서버쪽에서 데이터베이스 설정이나 스키마, 레코드 Read/Write를 코드로 관리하기 편해야한다. ORM을 사용하는 이유이기도 하다.

클라이언트측 라이브러리는 현재 자바스크립트만 제공된다. 패키지 이름은 [`@supabase/supabase-js`](https://www.npmjs.com/package/@supabase/supabase-js)이고, 사용해보니 타입스크립트도 지원된다.

### 설치

```bash
$ yarn add @supabase/supabase-js
# npm i @supabase/supabase-js
```

### 사용법

npm으로 제공하는 라이브러리를 이용해 간단하게 인스턴스를 구현 가능하다.

```ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://siwwiuleewkpfbschahw.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY as string
const supabase = createClient(supabaseUrl, supabaseKey)
```

**레코드 쓰기**

```ts
await supabase
  .from('User')
  .insert([{ some_column: 'someValue', other_column: 'otherValue' }])
```

**레코드 읽기**

```ts
let { data: User, error } = await supabase.from('User').select('*')

let { data: User, error } = await supabase
  .from('User')
  .select('some_column, other_column')
  .range(0, 9)

let { data: User, error } = await supabase.from('User').select(`
    some_column,
    other_table (
      foreign_key
    )
  `)
```

**이벤트 훅**

```ts
// insert
const User = supabase
  .from('User')
  .on('INSERT', payload => {
    console.log('Change received!', payload)
  })
  .subscribe()

// specific row
const User = supabase
  .from('User')
  .eq('column_name', 'someValue')
  .on('*', payload => {
    console.log('Change received!', payload)
  })
  .subscribe()
```

기존 ORM에 익숙하다면 별 다른 문서없이 바로 이해가 될 정도로 직관적이다.

읽기 쓰기 이외에도 필터링, 수정 삭제 등 필수적으로 제공되야 할 기능들이 제공된다.

## GraphQL vs Supabase

GraphQL에 익숙한 사람들을 위해 gql과 비슷하게 사용할 수 있는 인터페이스도 제공된다.

현재는 GraphQL만큼 강력하진 않겠지만, 그에 준하는 기능들을 가지게 된다면 엄청난 장점이 될 것 같다.

```ts
// graphql
const { loading, error, data } = useQuery(gql`
  query GetDogs {
    dogs {
      id
      breed
      owner {
        id
        name
      }
    }
  }
`)

// supabase
const { data, error } = await supabase.from('dogs').select(`
      id, breed,
      owner (id, name)
  `)
```

## 회원 관리

Firebase나 Supabase같은 툴들이 가진 가장 큰 장점 중 하나는 이 `회원 관리` 기능이다.

**회원 가입**

코드 3줄이면 비밀번호 암호화 알고리즘을 구현할 필요없이 회원을 가입시킬 수 있다.

```ts
let { user, error } = await supabase.auth.signUp({
  email: 'someone@email.com',
  password: 'nshOpnIDkwgnouwsVLnk'
})
```

**로그인**

Supabase는 유저가 회원가입하면 고유한 id를 만들고, 서버가 켜져 있는 동안 어디서든 `supabase.auth.user()` 를 호출하는 것으로 유저 정보를 가져올 수 있다.

물론 이 id를 다른 테이블에서 FK로 넣어줄 수 있다.

```ts
let { user, error } = await supabase.auth.signIn({
  email: 'someone@email.com'
})

// OAuth
let { user, error } = await supabase.auth.signIn({
  provider: 'github'
})
```

**기타 편의 기능**

```ts
// 비밀번호 재설정 이메일 보내기
let { data, error } = await supabase.auth.api.resetPasswordForEmail(email)

// 현재 세션에 저장된 유저 정보 가져오기
const user = supabase.auth.user()

// 초대 메일 보내기
let { user, error } = await supabase.auth.api.inviteUserByEmail(
  email: 'someone@email.com'
)
```

초대 메일을 보내는 기능을 써봤더니, 아래처럼 메일이 도착했다.

![](https://images.velog.io/images/peterkimzz/post/5062b7ad-3a72-4ce6-8f0f-bf279419de4c/image.png)

저 localhost로 보이는 부분은 웹 대시보드에서 변경 가능하다.

추가로 Firebase와 동일하게 회원 관리를 위한 이메일 템플릿은 웹 대시보드에서 수정이 가능하다.

## SQL

내부적으로 PostgreSQL을 사용하기 때문에, 이렇게 웹 브라우저에서 SQL을 실행시키는 인터페이스도 제공된다.

![](https://images.velog.io/images/peterkimzz/post/4741f89f-921f-4d89-b76b-5ef16d9a2836/image.png)

**Quick start**

SQL Editor 탭에서는 몇 가지 예제를 제공하고 있다.

아래 예제는 Supabase에서 만들어 둔 Todo list 앱 개발을 위한 테이블이다. 테이블 읽기/쓰기 정책을 SQL로 설정할 수 있다.

```sql
--
-- For use with https://github.com/supabase/supabase/tree/master/examples/todo-next-js
--

create table todos (
  id bigint generated by default as identity primary key,
  user_id uuid references auth.users not null,
  task text check (char_length(task) > 3),
  is_complete boolean default false,
  inserted_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table todos enable row level security;

create policy "Individuals can create todos." on todos for
    insert with check (auth.uid() = user_id);

create policy "Individuals can view their own todos. " on todos for
    select using (auth.uid() = user_id);

create policy "Individuals can update their own todos." on todos for
    update using (auth.uid() = user_id);

create policy "Individuals can delete their own todos." on todos for
    delete using (auth.uid() = user_id);
```

## 마무리

Supabase는 런칭 후 9달 동안 약 3,000개 가량의 데이터베이스가 만들어졌다고 한다. 그리고 현재 YC와 Mozila에게 총 약 60억의 시드 투자를 받았다.

직접 간단하게 훑어봤는데 아직은 기업에서 쓰긴 기능들이 약하지만, 10GB 용량이 무료로 제공되고 인터페이스가 간단하기 때문에 Firebase 대신에 공부나 토이 프로젝트로 쓰기는 좋을 것 같다.

곧 Storage와 Function 기능을 출시할 예정이라고 한다. 앞으로 더 많은 기능이 제공된다면 정말 강력한 툴이 될 것 같다.

### 참고

- https://supabase.io/
- https://github.com/supabase/supabase
