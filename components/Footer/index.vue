<template>
  <footer class="border-t pt-3 pb-3">
    <UContainer>
      <div
        class="flex flex-col-reverse sm:flex-row gap-2 items-center justify-between"
      >
        <span class="text-xs text-gray-500">
          &copy; {{ new Date().getFullYear() }} Peter Kim. All Right Reserved.
        </span>

        <nav>
          <ul class="flex items-center gap-2.5 text-sm">
            <li>
              <NuxtLink to="mailto:peterkimzz69@gmail.com">
                이메일 보내기
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="https://whattime.co.kr/peterkimzz">
                화상미팅 요청하기
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </UContainer>
  </footer>
</template>
