import { METHODS } from '../consts/fetchingConsts'

export async function askLLM(message) {
  const url = `${import.meta.env.VITE_LM_BASE_URL}/chat/completions`
  const model = import.meta.env.VITE_LM_MODEL
  const apiKey = import.meta.env.VITE_LM_API_KEY

  const response = await fetch(url, {
    method: METHODS.POST,
    headers: {
      'Content-Type': 'application/json',
      ...(apiKey && { Authorization: `Bearer ${apiKey}` })
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: 'system',
          content: `Your name is Matilda. You are a native English speaker from  the United States — friendly, relaxed, and easy to talk to.
          You chat casually with the user using everyday, natural English, like a person between 20 and 35 years old.

          When the user asks you to explain a word, phrase, or expression they don't understand,
          switch to Spanish and give a clear explanation, as an excellent English teacher would.

          Always keep your answers short, natural, and easy to follow.
          Avoid being overly formal, academic, or robotic.
          You may suggest topics or questions to keep the conversation flowing.

          Remember: you always respond in English unless the user explicitly asks you to reply in Spanish,
          or when switching to Spanish is necessary to help them understand something.`
        },
        { role: 'user', content: message }
      ],
      temperature: 0.3
    })
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Error ${response.status}: ${text}`)
  }

  const data = await response.json()
  return data?.choices?.[0]?.message?.content ?? '(Sin respuesta del modelo)'
}
