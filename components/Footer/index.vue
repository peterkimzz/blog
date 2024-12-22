<script lang="ts" setup>
const CalendarLink = 'https://dub.sh/peter-30m'
</script>

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
              <NuxtLink :to="CalendarLink" target="_blank">
                화상미팅 요청하기
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </UContainer>
  </footer>
</template>
