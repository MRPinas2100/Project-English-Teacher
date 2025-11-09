import { messageType } from '../consts/messageType'
import { makeDatetime } from './datetime'

export const messagesFactory = ({ agent, type, text = null, blob = null }) => {
  const base = {
    id: window.crypto.randomUUID(),
    type,
    sender: agent,
    status: 'ok',
    time: makeDatetime()
  }

  if (type === messageType.TEXT) {
    return {
      ...base,
      text
    }
  }

  if (type === messageType.AUDIO) {
    const src = URL.createObjectURL(blob)
    return {
      ...base,
      audio: {
        src,
        mimeType: blob.type
      }
    }
  }

  return base
}
