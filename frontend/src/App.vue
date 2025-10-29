<template>
  <main class="min-h-dvh w-full p-4 bg-brand text-gray-900 flex flex-col">
    <MainHeader />
    <div class="flex-1">
      <!-- aquí irá el contenido -->
    </div>
    <MainFooter />
  </main>
</template>

<script setup>
import MainHeader from './components/MainHeader.vue'
import MainFooter from './components/MainFooter.vue'
import { onMounted } from 'vue'
import { askLLM } from './lib/aiClient'

onMounted(async () => {
  try {
    const reply = await askLLM('Hi, what is your name?')
    console.warn('🧠 Respuesta del modelo:', reply)
  } catch (err) {
    console.error('❌ Error consultando el modelo:', err)
  }
})
</script>
