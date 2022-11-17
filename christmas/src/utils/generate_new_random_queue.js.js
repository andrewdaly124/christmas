export default function generateNewRandomQueue(num) {
  // https://stackoverflow.com/a/2450976
  function shuffle(arr) {
    const array = [...arr];
    let currentIndex = array.length;
    let randomIndex = 0;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  let arr = Array.from(Array(num + 1).keys());
  arr = shuffle(arr);
  return arr;
}
