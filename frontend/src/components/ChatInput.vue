<template>
  <form class="w-full h-full flex items-center gap-2" @submit.prevent="sendMessage">
    <input
      v-model="userMessage"
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
      type="submit"
    >
      <SendIcon class="w-6 h-6 text-text" />
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import MicIcon from './icons/MicIcon.vue'
import SendIcon from './icons/SendIcon.vue'

const userMessage = ref('')
const emit = defineEmits(['send'])

const sendMessage = () => {
  if (!userMessage.value.trim()) return
  emit('send', userMessage.value)
  userMessage.value = ''
}
</script>
