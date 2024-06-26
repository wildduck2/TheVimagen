export function getCookie(name: string) {
  const value = `; `
  const parts = document.cookie.split(value)
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i].split('=')
    if (part[0].trim() === name) {
      return decodeURIComponent(part[1])
    }
  }
  return null
}
