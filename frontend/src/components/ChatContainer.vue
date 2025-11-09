<template>
  <section class="flex flex-col flex-1 min-h-0 border border-white/20 rounded-lg">
    <div
      class="flex flex-col gap-3 flex-1 min-h-0 overflow-y-auto text-text p-2"
      @scroll="onScroll"
    >
      <div v-for="message in messages" :key="message.id" class="w-full h-fit">
        <ChatBubble :message="message" />
      </div>
    </div>
    <div
      class="w-full h-17 bg-brand border-t border-white/20 rounded-lg flex items-center p-2 gap-2 sticky bottom-0"
    >
      <ChatInput @text="handleText" @audio="handleAudio" />
    </div>
    <div ref="pageSentinel" aria-hidden="true" class="h-0 w-full"></div>
  </section>
</template>

<script setup>
import ChatBubble from './ChatBubble.vue'
import ChatInput from './ChatInput.vue'

import { ref, watch, onMounted, nextTick } from 'vue'
import { askLLM } from '../lib/aiClient'
import { agentType } from '../consts/agentConsts'
import { messagesFactory } from '../lib/messages'
import { messageType } from '../consts/messageType'

const messages = ref([])
const pageSentinel = ref(null)

const scrollPageToBottom = async () => {
  await nextTick()
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))
  if (pageSentinel.value) {
    pageSentinel.value.scrollIntoView({
      block: 'end',
      behavior: 'smooth'
    })
  }
}

watch(
  () => messages.value.length,
  async (newValue, oldValue) => {
    if (newValue > oldValue) await scrollPageToBottom()
  }
)

const handleText = async (message) => {
  messages.value.push(
    messagesFactory({ type: messageType.TEXT, text: message, agent: agentType.USER })
  )
  try {
    const answer = await askLLM(message)
    messages.value.push(
      messagesFactory({ type: messageType.TEXT, text: answer, agent: agentType.IA })
    )
  } catch {
    messages.value.push(
      messagesFactory({
        text: 'Hubo un error al obtener la respuesta.',
        agent: agentType.IA
      })
    )
  }
}

const handleAudio = (blob) => {
  messages.value.push(messagesFactory({ agent: agentType.USER, type: messageType.AUDIO, blob }))
}

onMounted(async () => {
  try {
    const first = await askLLM('Hi, what is your name?')
    messages.value.push(
      messagesFactory({ type: messageType.TEXT, text: first, agent: agentType.IA })
    )
  } catch {
    messages.value.push(
      messagesFactory({ type: messageType.TEXT, text: 'there was an error', agent: agentType.IA })
    )
  }
  await scrollPageToBottom()
})
</script>
