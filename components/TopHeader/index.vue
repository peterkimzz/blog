<template>
  <header class="bg-white border-b top-0 sticky">
    <MaxWidthContainer>
      <nav class="flex items-center justify-between">
        <NuxtLink to="/" class="font-bold text-xl italic tracking-wide">
          <span>PETERKIM</span>
          <span class="text-gray-600">ZZ</span>
        </NuxtLink>

        <ul class="flex items-center gap-5 font-semibold">
          <li>
            <NuxtLink
              to="https://resume.peterkimzz.com"
              target="_blank"
              class="py-3 block"
            >
              Résumé
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="https://github.com/peterkimzz"
              target="_blank"
              class="py-3 block"
            >
              GitHub
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </MaxWidthContainer>
  </header>
</template>
