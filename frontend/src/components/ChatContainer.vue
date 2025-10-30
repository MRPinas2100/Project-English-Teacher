<template>
  <section class="flex flex-1 border border-white/20 rounded-lg flex-col">
    <div class="flex gap-3 flex-col flex-1 p-4 text-text overflow-y-auto">
      <ChatBubble :agent="agentType.IA" />
      <ChatBubble :agent="agentType.USER" />
      <ChatBubble :agent="agentType.IA" />
    </div>
    <ChatInput />
  </section>
</template>

<script setup>
import ChatBubble from './ChatBubble.vue'
import ChatInput from './ChatInput.vue'

import { onMounted } from 'vue'
import { askLLM } from '../lib/aiClient'
import { agentType } from '../consts/agentConsts'

onMounted(async () => {
  try {
    const reply = await askLLM('Hi, what is your name?')
    console.warn('🧠 Respuesta del modelo:', reply)
  } catch (err) {
    console.error('❌ Error consultando el modelo:', err)
  }
})
</script>
