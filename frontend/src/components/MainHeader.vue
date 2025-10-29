<template>
  <header class="bg-transparent backdrop-blur">
    <div class="flex gap-6 mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg p-4">
      <picture class="block w-12 h-12 rounded-full overflow-hidden border border-icon">
        <source srcset="/matilda.webp" type="image/webp" />
        <!-- Fallback -->
        <img
          src="/matilda.png"
          alt="Matilda avatar"
          class="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </picture>
      <div class="flex items-start flex-col">
        <h2 class="text-xl font-bold md:text-2xl text-text">Matilda IA</h2>
        <span class="text-online">Online</span>
      </div>
    </div>
  </header>
</template>

<script setup></script>
