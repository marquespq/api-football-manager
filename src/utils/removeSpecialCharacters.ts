/* eslint-disable prefer-regex-literals */
export function removeSpecialCharacters(text: string = '') {
  if (!text) return '';
  let textFormatted = text;
  textFormatted = text
    .replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a')
    .replace(new RegExp('[ÉÈÊ]', 'gi'), 'e')
    .replace(new RegExp('[ÍÌÎ]', 'gi'), 'i')
    .replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o')
    .replace(new RegExp('[ÚÙÛ]', 'gi'), 'u')
    .replace(new RegExp('[Ç]', 'gi'), 'c');
  return textFormatted.toLowerCase();
}
