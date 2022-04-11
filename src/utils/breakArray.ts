export function breakArray(arr: Array<any>, size: number) {
  const newArray = [];
  let i = 0;
  while (i < arr.length) {
    newArray.push(arr.slice(i, i + size));
    i += size;
  }
  return newArray;
}
