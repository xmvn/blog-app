/* eslint-disable @typescript-eslint/no-unused-vars */
import { stringRegExp } from './regex'

export const slicedStr = (str: string, length: number) => {
  if (!str) {
    return ''
  }
  const sanitizedStr = str.replace(stringRegExp, '')

  const strSplitted = sanitizedStr.split(/\s+/)

  const slicedWords = strSplitted.map((word) => {
    return word.length > length ? word.slice(0, length) + '...' : word
  })

  if (slicedWords.join(' ').length > length) {
    return slicedWords.join(' ').slice(0, length)
  } else {
    return slicedWords.join(' ')
  }
}
