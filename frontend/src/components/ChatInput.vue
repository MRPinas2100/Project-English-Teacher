<template>
  <form class="w-full h-full flex items-center gap-2" @submit.prevent="sendMessage">
    <input
      v-model="userMessage"
      class="flex-1 h-full text-text outline-none p-4 bg-input rounded-full text-lg font-medium"
      type="text"
      placeholder="Type new message ..."
    />
    <button
      :class="[
        'flex items-center justify-center rounded-full size-10 cursor-pointer hover:bg-input active:bg-input',
        isRecording ? 'bg-red-500/20 ring-2 ring-red-500 animate-pulse' : 'bg-transparent'
      ]"
      type="button"
      @click="toggleRecording"
      :aria-pressed="isRecording"
      :title="isRecording ? 'Detener grabación' : 'Iniciar grabación'"
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
import { onBeforeUnmount, ref } from 'vue'
import MicIcon from './icons/MicIcon.vue'
import SendIcon from './icons/SendIcon.vue'

const userMessage = ref('')
const isRecording = ref(false)
const mediaStream = ref(null)
let mediaRecorder = null
let chunks = []

const emit = defineEmits(['text', 'audio'])

const sendMessage = () => {
  if (!userMessage.value.trim()) return
  emit('text', userMessage.value)
  userMessage.value = ''
}

const pickRecorderOptions = () => {
  const opts = {}
  if (window.MediaRecorder?.isTypeSupported?.('audio/webm;codecs=opus')) {
    opts.mimeType = 'audio/webm;codecs=opus'
  } else if (window.MediaRecorder?.isTypeSupported?.('audio/webm')) {
    opts.mimeType = 'audio/webm'
  } else if (window.MediaRecorder?.isTypeSupported?.('audio/ogg;codecs=opus')) {
    opts.mimeType = 'audio/ogg;codecs=opus'
  }
  return opts
}

const startRecording = async () => {
  try {
    if (!navigator.mediaDevices?.getUserMedia) {
      console.error('getUserMedia is not available .')
      return
    }

    mediaStream.value = await navigator.mediaDevices.getUserMedia({
      audio: {
        channelCount: 1,
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true
      }
    })

    mediaRecorder = new MediaRecorder(mediaStream.value, pickRecorderOptions())
    chunks = []

    mediaRecorder.ondataavailable = (e) => {
      console.log(e.data)
      if (e.data && e.data.size > 0) chunks.push(e.data)
    }

    mediaRecorder.onstop = () => {
      const mime = mediaRecorder?.mimeType || 'audio/webm'
      const blob = new Blob(chunks, { type: mime })
      emit('audio', blob)
    }

    mediaRecorder.start()
    isRecording.value = true
  } catch (err) {
    console.error('No se pudo iniciar la grabación:', err)
    stopRecording()
  }
}

const stopRecording = () => {
  try {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop()
    }
  } catch (e) {}

  if (mediaStream.value) {
    mediaStream.value.getTracks().forEach((t) => t.stop())
    mediaStream.value = null
  }
  isRecording.value = false
}

const toggleRecording = () => {
  if (isRecording.value) stopRecording()
  else startRecording()
}

onBeforeUnmount(stopRecording)
</script>
