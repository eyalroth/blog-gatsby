import { Languages } from '../consts/languages'
import readingTime from 'reading-time'

export function parseReadingTimeText(text, lang) {
  const { text: readingText, minutes: rawMinutes } = readingTime(text)

  switch (lang) {
    case Languages.English:
      return readingText
    case Languages.Hebrew:
      const minutes = Math.round(rawMinutes)
      if (minutes < 2) {
        return 'דקת קריאה אחת'
      } else {
        return `${minutes} דקות קריאה`
      }
    default:
      console.error(`Reading time: unrecognized language '${lang}'`)
      return ''
  }
}
