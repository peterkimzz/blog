<template>
  <footer class="py-6 md:py-10 text-xs md:text-sm">
    <div class="mb-10">
      <vue-brand class="w-28 md:w-36 text-white" />

      <p class="mt-1">
        <b>기술</b>과
        <b>예술</b>을 담다
      </p>

      <div class="mt-8">
        <p class="font-semibold text-gray-400 text-base">김동현</p>
        <ul class="mt-1">
          <li>
            <a
              href="mailto:peterkimzz69@gmail.com"
              class="text-cyan-700 underline-offset-2 hover:underline"
            >peterkimzz69@gmail.com</a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://whattime.co.kr/peterkimzz"
              class="text-cyan-700 underline-offset-2 hover:underline"
            >화상 미팅 요청하기</a>
          </li>
        </ul>
        <div></div>
      </div>
    </div>

    <vue-divider />

    <div class="flex justify-between text-gray-600">
      <vue-copyright />
      <vue-s-n-s />
    </div>
  </footer>
</template>