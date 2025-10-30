<template>
  <section v-if="agentMessage" class="w-full h-auto">
    <div class="flex gap-2 items-start w-full md:max-w-150 p-2">
      <picture
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
          class="inline-block bg-bubble-ai text-text px-3 py-2 rounded-tl-xl rounded-tr-xl rounded-br-xl wrap-break-word font-medium"
        >
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti quis ratione,
            repellendus perferendis odit porro accusantium nemo doloribus nulla ducimus, eos modi.
            Quibusdam beatae laborum fuga libero corporis illum nobis.
          </p>
        </div>
        <span class="text-xs text-gray-500 font-medium">10:45 pm</span>
      </div>
    </div>
  </section>

  <section v-else class="flex flex-col items-end-safe w-full h-auto">
    <div class="flex gap-2 items-end w-full md:max-w-150 p-2">
      <div class="flex flex-col flex-1 min-w-0 gap-1">
        <div
          class="inline-block bg-bubble-ai text-text px-3 py-2 rounded-tl-xl rounded-tr-xl rounded-bl-xl wrap-break-word font-medium"
        >
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius natus laboriosam sunt sint
            vel. Facere quia, asperiores ut incidunt cumque laboriosam inventore eius, non
            architecto tempore
          </p>
        </div>
        <span class="text-xs self-end text-gray-500 font-medium">12:00 pm</span>
      </div>
      <picture
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
  agent: {
    type: String,
    required: false,
    default: ''
  }
})

const { agent } = props
const agentMessage = agent === agentType.IA
</script>
