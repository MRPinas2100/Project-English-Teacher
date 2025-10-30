<template>
  <form class="w-full h-17 border-t border-white/20 rounded-lg flex items-center p-2 gap-2">
    <input
      class="flex-1 h-full text-text outline-none p-4 bg-input rounded-full text-lg font-medium"
      type="text"
      placeholder="Type new message ..."
    />
    <button
      class="flex items-center justify-center rounded-full size-10 bg-transparent cursor-pointer"
      type="button"
    >
      <MicIcon class="w-6 h-6 text-text" />
    </button>
    <button
      class="flex items-center justify-center rounded-full size-10 bg-bubble-user cursor-pointer"
      type="button"
    >
      <SendIcon class="w-6 h-6 text-text" />
    </button>
  </form>
</template>

<script setup>
import MicIcon from './icons/MicIcon.vue'
import SendIcon from './icons/SendIcon.vue'
</script>
