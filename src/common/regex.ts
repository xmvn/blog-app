/* eslint-disable no-control-regex */
export const stringRegExp: RegExp =
  /[\u{0000}-\u{001F}\u{007F}-\u{009F}\u{00AD}\u{061C}\u{200B}-\u{200F}\u{2028}\u{2029}\u{FEFF}ㅤ\u{11A4}-\u{11FF}]/gu
export const emailRegExp: RegExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
export const passwordRegExp: RegExp = /^\S{6,40}$/
export const avatarUrlRegex: RegExp = /\.(jpg|jpeg|png|gif)$/i
