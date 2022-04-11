export function sortTeam(arr: Array<any>) {
  const newArray = [];
  while (arr.length) {
    const index = Math.floor(Math.random() * arr!.length - 1);

    const [option] = arr!.splice(index, 1);

    newArray.push(option);
  }
  return newArray;
}
