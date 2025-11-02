export const makeDatetime = () => {
  const ts = Date.now()
  const time = new Date(ts).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })

  return time
}
