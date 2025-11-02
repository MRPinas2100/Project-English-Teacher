<template>
  <section v-if="message || message == null" class="flex flex-col w-full h-auto justify-end">
    <div :class="['flex gap-2 w-full md:max-w-150 p-2', is_IA_Sender ? 'items-start' : 'self-end']">
      <picture
        v-if="is_IA_Sender"
        class="relative self-end shrink-0 size-10 rounded-full overflow-hidden border border-icon"
      >
        <source srcset="/matilda.webp" type="image/webp" />
        <img
          src="/matilda.png"
          alt="Matilda avatar"
          class="w-full h-full object-contain bg-brand/30 absolute"
          loading="lazy"
          decoding="async"
        />
      </picture>
      <div class="flex flex-col flex-1 min-w-0 gap-1">
        <div
          :class="[
            'inline-block text-text px-3 py-2 rounded-tl-xl rounded-tr-xl wrap-break-word font-medium',
            is_IA_Sender ? 'rounded-br-xl bg-bubble-ai' : 'rounded-bl-xl bg-bubble-user'
          ]"
        >
          <p>
            {{ text }}
          </p>
        </div>
        <span
          :class="[
            'flex text-xs text-gray-500 font-medium',
            !is_IA_Sender ? 'self-end' : 'self-start'
          ]"
          >{{ time }}</span
        >
      </div>
      <picture
        v-if="!is_IA_Sender"
        class="relative self-end shrink-0 size-10 rounded-full overflow-hidden border border-icon"
      >
        <source srcset="/liney.webp" type="image/webp" />
        <img
          src="/liney.png"
          alt="Matilda avatar"
          class="w-full h-full object-contain bg-brand/30 absolute"
          loading="lazy"
          decoding="async"
        />
      </picture>
    </div>
  </section>
</template>

<script setup>
import { agentType } from '../consts/agentConsts'

const props = defineProps({
  message: {
    type: Object,
    required: false,
    default: () => ({
      id: '',
      sender: '',
      text: '',
      ts: null,
      status: '',
      time: ''
    })
  }
})

const { message } = props
const { sender, text, time } = message
const is_IA_Sender = sender === agentType.IA
</script>
