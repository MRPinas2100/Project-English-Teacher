<template>
  <main class="min-h-dvh w-full p-4 bg-gray-50 text-gray-900 flex flex-col">
    <MainHeader />
    <div class="flex-1">
      <!-- aquí irá el contenido -->
    </div>
    <MainFooter />
  </main>
</template>

<script setup>
import MainHeader from './components/MainHeader.vue';
import MainFooter from './components/MainFooter.vue';
</script>

<style scoped></style>
