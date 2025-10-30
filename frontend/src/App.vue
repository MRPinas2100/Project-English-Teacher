<template>
  <main class="flex min-h-dvh w-full p-4 bg-brand justify-center">
    <div class="flex w-full h-auto lg:max-w-260 flex-1 flex-col bg-transparent gap-3">
      <MainHeader />
      <ChatContainer />
      <MainFooter />
    </div>
  </main>
</template>

<script setup>
import MainHeader from './components/MainHeader.vue'
import MainFooter from './components/MainFooter.vue'
import ChatContainer from './components/ChatContainer.vue'
</script>
