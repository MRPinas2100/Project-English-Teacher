<template>
  <div class="flex gap-6 size-full bg-transparent">
    <button @click="toggle" class="flex cursor-pointer items-center" type="button">
      <PauseIcon v-if="isPlaying" />
      <PlayIcon v-else />
    </button>

    <div class="flex flex-col size-full bg-transparent">
      <div
        ref="waveContainer"
        class="relative flex-1 h-full min-w-0"
        @click.stop
        :title="isReady ? 'Haz clic para moverte por el audio' : 'Cargando…'"
      ></div>
      <div class="flex">
        <span class="text-[10px] font-light">{{ currentTimeLabel }} - {{ durationLabel }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import PlayIcon from './icons/PlayIcon.vue'
import PauseIcon from './icons/PauseIcon.vue'

import WaveSurfer from 'wavesurfer.js'
import { onMounted, onBeforeUnmount, ref, computed, watch } from 'vue'

const props = defineProps({
  message: { type: Object, required: true }
})

const isReady = ref(false)
const isPlaying = ref(false)
const waveContainer = ref(null)
const duration = ref(0)
const current = ref(0)
let wavesurfer = null
let mediaEl = null

const fmt = (s) => {
  const m = Math.floor(s / 60)
  const ss = Math.floor(s % 60)
    .toString()
    .padStart(2, '0')
  return `${m}:${ss}`
}
const currentTimeLabel = computed(() => fmt(current.value))
const durationLabel = computed(() => (duration.value > 0 ? fmt(duration.value) : '--:--'))

onMounted(() => {
  if (!waveContainer.value) return

  mediaEl = new Audio()
  mediaEl.src = props.message?.audio?.src || ''
  mediaEl.crossOrigin = 'anonymous'

  wavesurfer = WaveSurfer.create({
    container: waveContainer.value,
    media: mediaEl,
    height: 48,
    waveColor: 'rgba(255,255,255,0.35)',
    progressColor: 'rgba(255,255,255,0.9)',
    cursorWidth: 0,
    cursorColor: 'transparent',
    hideScrollbar: true,
    normalize: true,
    barWidth: 2,
    barGap: 1,
    barRadius: 2,
    barHeight: 0.8,
    responsive: true,
    partialRender: true
  })

  wavesurfer.on('ready', () => {
    isReady.value = true
    duration.value = wavesurfer.getDuration() || 0
  })

  wavesurfer.on('play', () => {
    isPlaying.value = true
  })
  wavesurfer.on('pause', () => {
    isPlaying.value = false
  })
  wavesurfer.on('finish', () => {
    isPlaying.value = false
  })
  wavesurfer.on('timeupdate', (t) => {
    current.value = t || 0
  })
  wavesurfer.on('error', (e) => console.error('WaveSurfer error:', e))
})

watch(
  () => props.message?.audio?.src,
  async (newSrc, oldSrc) => {
    if (!wavesurfer || !newSrc || newSrc === oldSrc) return
    isReady.value = false
    isPlaying.value = false
    current.value = 0
    duration.value = 0
    mediaEl.src = newSrc
  }
)

onBeforeUnmount(() => {
  wavesurfer?.destroy()
  wavesurfer = null

  if (mediaEl) {
    mediaEl.pause()
    mediaEl.src = ''
    mediaEl = null
  }
})

const toggle = () => {
  if (!wavesurfer || !isReady.value) return
  wavesurfer.playPause()
}
</script>
