import { stringRegExp } from './regex'

export const slicedStr = (str: string, length: number) => {
  str = str?.replace(stringRegExp, '')
  return str?.length >= length ? str.slice(0, length) + '...' : str
}
