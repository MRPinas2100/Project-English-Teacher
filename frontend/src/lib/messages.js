import { makeDatetime } from './datetime'

export const messagesFactory = ({ text, agent }) => {
  const message = {
    id: window.crypto.randomUUID(),
    sender: agent,
    text,
    status: 'ok',
    time: makeDatetime()
  }

  return message
}
