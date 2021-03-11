<template>
  <footer class="footer">
    <div class="mb-10">
      <vue-brand />
      <p class="mt-1"><b>기술</b>과 <b>예술</b>을 담다</p>

      <div class="mt-8 text-gray-500">
        <p>김동현</p>
        <p>peterkimzz69@gmail.com</p>
      </div>
    </div>

    <vue-divider />

    <div class="flex justify-between text-gray-600">
      <vue-copyright />
      <vue-s-n-s />
    </div>
  </footer>
</template>

<style lang="postcss" scoped>
.footer {
  @apply py-6 md:py-10;
  @apply text-xs md:text-sm;
}
</style>