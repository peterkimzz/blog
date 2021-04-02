<template>
  <div class="pb-20 text-sm md:text-base">
    <vue-s-e-o title="이력서" :title-template-visible="false" />

    <header>
      <p class="text-gray-500 font-medium uppercase">Résumé</p>
      <h1 class="text-2xl md:text-3xl font-extrabold text-gray-100">
        개발자 김동현 이력서
      </h1>
      <p class="text-gray-600 text-xs mt-4">
        2021년 4월 2일에 마지막으로 업데이트 됨.
      </p>
    </header>

    <main class="mt-16 space-y-28">
      <!-- Profile -->
      <section>
        <div class="mb-10">
          <h3 class="text-sm font-medium text-gray-500 uppercase">Profile</h3>
          <h2 class="text-2xl text-gray-200 font-semibold">프로필</h2>
        </div>
        <div class="md:flex">
          <img
            src="/profile.jpg"
            class="w-24 h-24 rounded-3xl shadow-sm bg-gray-700 p-1"
          />
          <div class="space-y-6 mt-6 md:mt-0 md:ml-10">
            <vue-definition sub-label="Name" label="이름"
              >김동현</vue-definition
            >
            <vue-definition sub-label="Birthday" label="생년월일"
              >1993년 2월 25일</vue-definition
            >
            <vue-definition sub-label="Phone" label="연락처">
              <a
                target="_blank"
                href="tel:+82-10-4273-5480"
                class="hover:underline"
                >+82-10-4273-5480</a
              >
            </vue-definition>
            <vue-definition sub-label="Email" label="이메일">
              <a
                target="_blank"
                href="mailto:peterkimzz69@gmail.com"
                class="hover:underline break-all"
                >peterkimzz69@gmail.com</a
              >
            </vue-definition>
            <vue-definition sub-label="Intro" label="소개" class="block">
              <p class="mt-4 leading-7">
                안녕하세요, 소프트웨어 개발자 김동현입니다.<br /><br />

                저는 플랫폼 개발에 자신있습니다. 또한 저의 최대 강점은 개발
                속도가 빠르다는 것입니다. 지금까지 소규모 인원의 스타트업에서
                오랫동안 개발자로 일을 해왔기 때문에, 누구보다 빠르게 MVP를
                만들어내는 법을 잘 알고 있습니다.<br /><br />

                보통 개발이 빠르면 유지보수하기 어려운 코드를 작성할거라고
                생각십니다. 하지만 제가 개발이 빠른 이유는 Vue.js와 Node.js
                프레임워크를 오랫동안 사용했기 때문입니다. 결코 유지보수가
                어려운 코드는 작성하지 않습니다. <br /><br />

                또한 스스로 웹 디자인에 대한 감각이 있다고 생각해서 프론트엔드
                개발을 좋아합니다. 웹의 장점인 프론트엔드에 대한 소스코드가
                개방되어 있다는 점을 이용해 다른 웹사이트의 디자인을 참고하여
                해당 서비스에게 맞는 새로운 디자인을 잘 창조해냅니다.
              </p>
            </vue-definition>
          </div>
        </div>
      </section>

      <!-- Skills -->
      <section>
        <div class="mb-10">
          <h3 class="text-sm font-medium text-gray-500 uppercase">Skills</h3>
          <h2 class="text-2xl text-gray-200 font-semibold">기술</h2>
        </div>

        <div class="space-y-10">
          <vue-definition
            sub-label="Front-end"
            label="프론트엔드"
            class="items-start"
          >
            <ul class="list-disc pl-12 space-y-2">
              <li>Vue.js (Nuxt.js)</li>
              <li>Chrome Extension</li>
            </ul></vue-definition
          >
          <vue-definition
            sub-label="Back-end"
            label="백엔드"
            class="items-start"
          >
            <ul class="list-disc pl-12 space-y-2">
              <li>Node.js</li>
              <li>Docker</li>
              <li>NginX</li>
            </ul></vue-definition
          >
          <vue-definition
            sub-label="Database"
            label="데이터베이스"
            class="items-start"
          >
            <ul class="list-disc pl-12 space-y-2">
              <li>MySQL</li>
              <li>Elasticsearch</li>
            </ul></vue-definition
          >
          <vue-definition
            sub-label="Cloud platform"
            label="클라우드"
            class="items-start"
          >
            <ul class="list-disc pl-12 space-y-2">
              <li>AWS</li>
              <li>GCP, Firebase</li>
            </ul></vue-definition
          >
        </div>
      </section>

      <!-- Expreiences -->
      <section>
        <div class="mb-10">
          <h3 class="text-sm font-medium text-gray-500 uppercase">
            Expreiences
          </h3>
          <h2 class="text-2xl text-gray-200 font-semibold">경력</h2>
        </div>

        <div class="space-y-10">
          <vue-resume-item
            v-for="exp in experiences"
            :key="exp.org"
            :label="exp.duration"
          >
            <div slot="title" class="flex items-center">
              <span class="font-semibold">{{ exp.org }}</span>
              <span class="ml-2 text-cyan-500">{{ exp.bio }}</span>
            </div>
            <p v-html="exp.desc"></p>
          </vue-resume-item>
        </div>
      </section>

      <!-- Projects -->
      <section>
        <div class="mb-10">
          <h3 class="text-sm font-medium text-gray-500 uppercase">Projects</h3>
          <h2 class="text-2xl text-gray-200 font-semibold">프로젝트</h2>
        </div>

        <div class="space-y-10">
          <vue-resume-item
            v-for="project in projects"
            :src="project.src"
            :key="project.title"
            :label="project.duration"
          >
            <div slot="title" class="flex items-center">
              <span class="font-semibold">{{ project.title }}</span>
            </div>
            <p v-html="project.desc"></p>
          </vue-resume-item>
        </div>
      </section>

      <!-- Education -->
      <section>
        <div class="mb-10">
          <h3 class="text-sm font-medium text-gray-500 uppercase">Education</h3>
          <h2 class="text-2xl text-gray-200 font-semibold">학력</h2>
        </div>

        <div>
          <vue-resume-item
            src="/imgs/gachon.png"
            label="2012년 03월 - 2018년 03월"
          >
            <div slot="title" class="flex items-center">
              <span>
                가천대학교 전자공학과
              </span>
            </div>
            <p>
              전자공학과 4학기를 다녔고, 군 전역 이후 컴퓨터공학과로 전과했지만
              1학기도 듣지 않고 자퇴했습니다.
            </p>
          </vue-resume-item>
        </div>
      </section>

      <!-- Press -->
      <section>
        <div class="mb-10">
          <h3 class="text-sm font-medium text-gray-500 uppercase">Press</h3>
          <h2 class="text-2xl text-gray-200 font-semibold">언론</h2>
        </div>

        <div>
          <vue-resume-item label="2021년 3월 29일">
            <div slot="title" class="flex items-center">
              <a
                href="https://zdnet.co.kr/view/?no=20210329170514"
                class="underline text-cyan-500"
                >클라우드 빌드·배포 등 단순업무, 오픈소스로 한 번에 해결</a
              >
            </div>
            <p>
              앰포 김동현 개발자, 원격 클라우드 자동화 도구 오픈소스 공개
            </p>
          </vue-resume-item>
        </div>
      </section>

      <!-- Awards -->
      <section>
        <div class="mb-10">
          <h3 class="text-sm font-medium text-gray-500 uppercase">Awards</h3>
          <h2 class="text-2xl text-gray-200 font-semibold">수상</h2>
        </div>

        <div class="space-y-10">
          <vue-resume-item
            v-for="award in awards"
            :key="award.title"
            :src="award.src"
            :label="award.duration"
          >
            <div slot="title" class="flex items-center">
              <a
                :href="award.href"
                target="_blank"
                :class="[award.href ? 'text-cyan-500 underline' : '']"
                >{{ award.title }}</a
              >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="w-4 h-4 ml-1.5 text-cyan-400"
              >
                <path
                  fill-rule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <p v-html="award.desc"></p>
          </vue-resume-item>
        </div>
      </section>

      <!-- Languages -->
      <section>
        <div class="mb-10">
          <h3 class="text-sm font-medium text-gray-500 uppercase">Languages</h3>
          <h2 class="text-2xl text-gray-200 font-semibold">언어</h2>
        </div>

        <div>
          <vue-definition sub-label="English" label="영어"
            >기초 회화</vue-definition
          >
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  layout: 'article',
  data() {
    return {
      experiences: [
        {
          duration: '2019년 11월 - 현재',
          org: 'Empo Inc.',
          bio: 'Backend Developer',
          desc: `
            본 엔젤스 시드 투자와 TIPS 프로그램에 선정된 모바일 데이터 공유 플랫폼 앰포 서비스의 서버 개발자로 입사했습니다.<br><br>
            
            기존 PHP로 작성된 서버와, 기존 데이터베이스의 정규화 작업을 포함한 서버 마이그레이션 작업을 진행하고 있습니다.<br><br>

            이후 현재 앰포 앱의 서버 유지 보수 작업과, 사내 새로운 프로젝트 "데이터스캐너"와 "마릴"의 프론트엔드와 백엔드를 담당하고 있습니다.
            `
        },
        {
          duration: '2018년 8월 - 2019년 3월',
          org: '강남엄마',
          bio: 'PM, Web Fullstack Developer',
          desc: `
            입사 했을 당시 기존 개발자들이 모두 나간 상태였고, Ruby on Rails로 되어있던 프로젝트를 당시 가장 핫한 프레임워크인 Vue.js로 테크 스택을 변경할 것을 제안드렸고 혼자 웹사이트와 API서버를 첫 한 달 동안 개발해서 성공적으로 리뉴얼을 마쳤습니다.<br><br>
            
            이후 총 3명의 개발자를 직접 채용했고 점점 커지는 프로젝트를 관리해야 했기 때문에 자연스럽게 PM 역할을 맡았습니다.<br><br>
            
            웹 개발 뿐만 아니라 디자인과 기획도 주도적으로 진행했으며, 입사 당시 MAU 3-4만이었던 트래픽이 퇴사 직전에는 약 8만 정도로 상승했습니다. 이후 회사 경영난으로 퇴사하게 되었습니다.`
        },
        {
          duration: '2017년 2월 - 2018년 7월',
          org: 'Zerobase Software Inc.',
          bio: '공동 창업, CTO',
          desc: `
            약 1년 반동안 총 3개의 프로젝트인 "Hoopee", "Picon" 그리고 "Factoryhunt"를 진행했습니다.<br><br>
            
            이 때 "Hoopee"를 메인 프로젝트로 미국 엑셀러레이터인 "Y Combinator Startup School" 1기에 합격해 10주 동안 성공적으로 교육을 수료했습니다.<br><br>
            
            총 2번의 Y Combinator 메인 배치에 지원했고, 서류 합격 후 온라인 인터뷰에서 아쉽게 탈락했고 프로그램과는 별개로 프로젝트의 수익성이 오랫동안 이루어지지않아 지분을 모두 정리 후 퇴사하게 되었습니다.`
        },
        {
          duration: '2016년 3월 - 2016년 11월',
          org: 'inActive Inc.',
          bio: '1인 창업',
          desc: `모바일 게임 개발사를 운영하고 싶어 처음으로 만들었던 법인입니다. 게임 런칭 이후, 운영과 유지/보수를 진행하다 혼자서 게임 개발사를 운영하는 것은 조금 무리라고 판단하고 법인을 휴업으로 전환했습니다.`
        }
      ],
      projects: [
        {
          src: '/imgs/briana.png',
          duration: '2021년 1월 - 현재',
          title: '브리아나',
          desc: `
            가상화폐를 거래할 때 도움을 주는 크롬 확장 프로그램입니다.<br><br>

            혼자 진행하는 사이드 프로젝트이고, 크롬과 웨일, 엣지 브라우저에서 모두 사용 가능합니다.<br><br>

            누구보다 빠르게 시세를 확인해야 하는 유저의 니즈를 포착해, 웹 대신 확장 프로그램으로 만들었습니다.<br><br>

            실시간 국내, 해외 코인 시세 모니터링과, 환율 차이 (김프), 즐겨찾기 등 현재 시장에 나와있는 확장 프로그램 중 가장 뛰어난 기능을 가지고 있습니다. 또한 확장 프로그램 특성상 창 사이즈가 제한적이기 때문에 UI와 UX를 극도로 신경썼습니다.<br><br>

            현재 일간 활성 사용자(DAU)는 100명 이상입니다.
            `
        },
        {
          src: '/imgs/empo.ico',
          duration: '2019년 11월 - 현재',
          title: 'Empo',
          desc: `
            앰포는 모바일 데이터 직거래 플랫폼입니다.<br><br>

            전 세계의 심각한 대역폭 공급 불균형을 해소하기 위해 글로벌 시장을 타겟으로 서비스 중입니다. 현재는 인도가 메인 타겟이고, 안드로이드 OS만 서비스 중입니다.<br><br>

            기존 PHP 언어로 개발되어있던 서버 코드를 Node.js로 변경하면서 데이터베이스 정규화 작업 및 마이그레이션을 진행했습니다.<br><br>

            데이터를 거래하는 앱이라, 은행처럼 데이터 거래 기록을 주고 받는 Data transaction에 신경을 많이 썼습니다.
            `
        },
        {
          src: '/imgs/solum.png',
          duration: '2019년 6월 - 7월',
          title: 'SoluM ESL Dashboard',
          desc: `
            (주)솔루엠의 외주 프로젝트의 일원으로 참여했던 프로젝트입니다.<br><br>

            당시 API 서버는 개발이 완료되어있던 상황이었고, 편의점 혹은 마트 등에서 사용하는 종이로 된 상품 가격표를 전자 태그로 대체해서 웹사이트 Admin 페이지로 디스플레이를 조절하는 대시보드 페이지를 개발했습니다.<br><br>

            SEO가 필요없는 애플리케이션이므로 정적 페이지인 Vue.js로 개발해서 서버 비용 부담을 줄였습니다. (내부 보안 정책에 의해 프로젝트에 도메인 주소는 연결시키지 않았습니다.)`
        },
        {
          src: '/imgs/gangmom_logo.png',
          duration: '2018년 8월 - 2019년 3월',
          title: '강남엄마',
          desc: `
            "학원 찾을 땐, 강남엄마"<br><br>

            전국의 사교육 시장을 타겟으로 멋쟁의사자처럼 해커톤 1등을 했던 프로젝트를 비즈니스화한 프로젝트입니다. 처음 풀스택 개발자로 합류했고 이후 PM 역할을 맡았습니다.<br><br>

            직접 참여했던 프로젝트는 총 3개입니다.<br><br>
            - www.gangmom.kr<br>
            - api.gangmom.kr<br>
            - admin.gangmom.kr`
        },
        {
          src: '/imgs/factoryhunt_logo.png',
          duration: '2017년 6월 - 2018년 6월',
          title: 'Factoryhunt',
          desc: `
            "A hub of whoesale supplier listings. THE BEST way to showcase your business!"<br><br>

            중국 "alibaba.com"의 Pain Point를 해결하고자 기획했던 프로젝트입니다. 메인 유저는 중국을 제외한 전 세계의 공장들이 타겟이었고 1년 동안 전 세계 약 100곳의 공장을 가입시켰습니다.<br><br>

            이 프로젝트는 앱 보다는 반응형 웹사이트가 메인 타겟에게 익숙할 것으로 예상되어서 웹사이트로 개발했습니다.<br><br>
            
            또한 한국 업체와 영어권 업체가 타겟이었기 때문에, 영어와 한국어를 지원했습니다.`
        },
        {
          src: '/imgs/picon_logo.png',
          duration: '2017년 4월 - 6월',
          title: 'Picon',
          desc: `
            "Weekly Photo Contest"<br><br>

            이벤트성 애플리케이션이며 메인 컨셉은 매주 토요일 24시간 동안만 1인당 1개의 사진을 업로드할 수 있고, 이후 일요일부터 금요일까지 회원들이 투표해서 최다 득표를 한 1, 2, 3등에게 현금 보상을 해주는 서비스입니다.<br><br>

            이 프로젝트에서는 Swift를 사용해 App Store에만 배포했습니다. 총 3번 상금을 지급했었고 BM이 다소 약해 중단된 프로젝트입니다.`
        },
        {
          src: '/imgs/hoopee_logo.png',
          duration: '2017년 2월 - 4월',
          title: 'Hoopee',
          desc: `
            "Simple Notification for Groups"라는 슬로건으로 진행했던 프로젝트입니다. 비슷한 서비스로는 지금의 "페이스북 페이지"와 "카카오톡 채널"입니다.<br><br>

            이 프로젝트를 하게 된 계기는 보통 어떠한 비즈니스 혹은 커뮤니티 등등 기본적으로 웹사이트가 필요하게 되는데 지금은 Mobile First 시대이기 때문에 무엇이든 일을 진행할 때 웹사이트와 모바일 웹사이트 (자칭 앱사이트)를 필요로 하게 될 거라고 생각했습니다.<br><br>

            이 프로젝트는 Zerobase Software가 Y Combinator Startup School을 수료할 수 있게 도와준 앱이어서 애착이 가는 프로젝트입니다. Startup School 진행 중 "Hoopee"를 그만두게 되었는데, 이유는 당시 카카오톡 채널 (당시 카카오톡 플러스친구)와 페이스북 페이지가 굉장히 활발하게 개발/서비스 중이어서 경쟁력에서 많이 밀린다고 판단되어 중단하게 되었습니다.<br><br>

            또한 기술적으로도 문제가 있었는데 "React Native"를 이용해 iOS와 Android를 모두 개발했지만 당시 라이브로 사용하기엔 너무 높은 러닝 커브 + 적은 레퍼런스 + 잦은 버그로 당장 상용화는 어려울 것 같아 중단했습니다.`
        },
        {
          src: '/imgs/a_man_like_fox_logo.png',
          duration: '2016년 3월 - 11월',
          title: '여우같은 그 남자',
          desc: `
            여성향 시뮬레이션 게임입니다. 총 20개의 메인 에피소드와 5개의 스페셜 엔딩을 구성했습니다.<br><br>

            메인 줄거리는 천 년을 살면 인간으로 환생하는 구미호 설정인 남자 주인공인 "여원"이 조선시대 인간 여자인 "연희"와 사랑에 빠지는 내용입니다. 불미스러운 사건으로 "연희"가 죽고 몇 백년 뒤 "여원"이 "연희"와 같은 외모로 다시 태어난 "신재"와 재회하는 스토리입니다.<br><br>

            당시 히트쳤던 게임 "일진에게 찍혔을 때"를 필두로 미연시를 장르가 유행해서 3달간 팀원들과 준비해서 런칭했습니다. 이 때 3만원을 Facebook 네이티브 광고비로 사용해서 광고 게시글 좋아요 100개 이상을 받았습니다. 이를 계기로 출시하자마자 인 앱 결제로 이루어져 수익을 발생시켰습니다.<br><br>

            인 앱 결제는 총 최초 4개의 "여우 구슬" 아이템이 주어지고 에피소드를 1개 진행하면 "여우 구슬"이 1개 차감되는 방식이었고, 하루마다 여우 구슬 2개가 지급됐습니다.`
        }
      ],
      awards: [
        {
          src: '/imgs/nipa.png',
          duration: '2020년 11월',
          title: '오픈소스 활용기 자랑하기',
          href:
            'https://www.oss.kr/notice/show/3a6b233b-bef5-4c1d-97da-dc9815eea2ab',
          desc: `
          정보통신산업진흥원 (NIPA)에서 운영하는 오픈소스 소프트웨어 통합지원센터의 [오픈소스 활용기 자랑하기]에 수상했습니다.<br><br>

          내용은 사내에서 사용 중이거나, 직접 개발한 오픈소스 라이브러리를 소개하는 이벤트였습니다.<br><br>

          당시 제출했던 오픈소스 프로젝트는 Github에 커밋, 푸시 등 이벤트가 발생했을 때 AWS EC2 컴퓨터에 원격으로 커맨드를 날릴 수 있는 라이브러리입니다.<br><br>

          <img src="https://user-images.githubusercontent.com/20244536/111867035-ca889780-89b4-11eb-9684-f754ae33c329.png"><br>
          `
        },
        {
          src: '/imgs/startup_school_logo.png',
          duration: '2017년 4월 - 6월',
          title: 'Y Combinator Startup School',
          desc: `
          미국 엑셀러레이터 Y Combinator의 Startup School 1기 10주 과정을 성공적으로 수료했습니다. 이 때 지원했던 프로젝트는 "Hoopee" 모바일 앱이었습니다.<br/><br/>

          지금은 스타트업 스쿨이 상시 공개되어있는 YC의 무료 강의 프로그램으로 바뀌었지만, 당시엔 기존 메인 배치와 같이 10주간의 Office hour를 가지며 스타트업 생태계에 대해 정말 많은 인사이트를 얻었습니다.<br><br>

          <img src="https://user-images.githubusercontent.com/20244536/111867133-6fa37000-89b5-11eb-8e72-e4ee75f398af.png">
          `
        }
      ]
    }
  }
}
</script>