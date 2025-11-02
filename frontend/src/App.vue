<template>
  <main class="flex min-h-dvh w-full px-4 bg-brand justify-center">
    <div class="flex relative w-full h-auto lg:max-w-260 flex-1 flex-col bg-transparent gap-3">
      <MainHeader />
      <ChatContainer />
    </div>
  </main>
</template>

<script setup>
import MainHeader from './components/MainHeader.vue'
import ChatContainer from './components/ChatContainer.vue'
</script>
