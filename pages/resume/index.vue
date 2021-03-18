<template>
  <div class="pb-20">
    <vue-s-e-o title="이력서" :title-template-visible="false" />

    <header>
      <p class="text-gray-500 font-medium uppercase">Résumé</p>
      <h1
        class="text-3xl font-bold bg-gradient-to-b bg-clip-text text-transparent from-white to-gray-300"
      >
        개발자 김동현 이력서
      </h1>
      <p class="text-gray-600 text-xs mt-4">
        2021년 3월 16일에 마지막으로 업데이트 됨.
      </p>
    </header>

    <main class="mt-16 space-y-28">
      <section>
        <div class="mb-10">
          <h3 class="text-sm font-medium text-gray-500 uppercase">Profile</h3>
          <h2 class="text-2xl text-gray-200 font-semibold">프로필</h2>
        </div>
        <div class="md:flex">
          <img src="/profile.jpg" class="w-24 h-24 rounded-3xl shadow-sm" />
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

      <section>
        <div class="mb-10">
          <h3 class="text-sm font-medium text-gray-500 uppercase">
            Expreiences
          </h3>
          <h2 class="text-2xl text-gray-200 font-semibold">경력</h2>
        </div>
      </section>

      <section>
        <div class="mb-10">
          <h3 class="text-sm font-medium text-gray-500 uppercase">Projects</h3>
          <h2 class="text-2xl text-gray-200 font-semibold">프로젝트</h2>
        </div>
      </section>

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
            <p>
              미국 엑셀러레이터 Y Combinator의 Startup School 1기 10주 과정을
              성공적으로 수료했습니다. 이 때 지원했던 프로젝트는 "Hoopee" 모바일
              앱이었습니다. <br /><br />

              지금은 스타트업 스쿨이 상시 공개되어있는 YC의 무료 강의
              프로그램으로 바뀌었지만, 제가 지원했을 때는 기존 YC 메인 배치의
              온라인 버전이었습니다.
            </p>
          </vue-resume-item>
        </div>
      </section>

      <section>
        <div class="mb-10">
          <h3 class="text-sm font-medium text-gray-500 uppercase">Awards</h3>
          <h2 class="text-2xl text-gray-200 font-semibold">수상</h2>
        </div>

        <div>
          <vue-resume-item
            src="/imgs/startup_school_logo.png"
            label="2017년 4월 - 6월"
          >
            <div slot="title" class="flex items-center">
              <span>
                Y Combinator Startup School
              </span>
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
            <p>
              미국 엑셀러레이터 Y Combinator의 Startup School 1기 10주 과정을
              성공적으로 수료했습니다. 이 때 지원했던 프로젝트는 "Hoopee" 모바일
              앱이었습니다. <br /><br />

              지금은 스타트업 스쿨이 상시 공개되어있는 YC의 무료 강의
              프로그램으로 바뀌었지만, 제가 지원했을 때는 기존 YC 메인 배치의
              온라인 버전이었습니다.
            </p>
          </vue-resume-item>
        </div>
      </section>

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
  layout: 'article'
}
</script>