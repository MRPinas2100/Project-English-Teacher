<template>
  <header
    class="flex bg-transparent backdrop-blur border-b border-r border-l border-white/20 rounded-bl-lg rounded-br-lg sticky top-0 z-10"
  >
    <div
      class="flex flex-1 gap-6 mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg p-4"
    >
      <picture
        class="flex items-center justify-center w-12 h-12 rounded-full overflow-hidden border border-icon"
      >
        <source srcset="/matilda.webp" type="image/webp" />
        <img
          src="/matilda.png"
          alt="Matilda avatar"
          class="w-full h-full object-contain bg-brand/30"
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
