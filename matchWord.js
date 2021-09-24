const array = ["asd", "abc", "abc", "asd", "qwe", "abc"];

const arrayTwo = [
  "satu",
  "dua",
  "tiga",
  "satu",
  "tiga",
  "lima",
  "empat",
  "dua",
];

function matchWords(array) {
  const index = [];
  const repeatedWords = [];

  // find every words that has a repeat
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i].toLowerCase() === array[j].toLowerCase()) {
        repeatedWords.push({
          word: array[i],
          range: j - i,
          earliestMeet: j - i - i,
        });
      }
    }
  }

  //   loop to find lowest earliestMeet
  let findWord = repeatedWords[0];
  for (let i = 0; i < repeatedWords.length - 1; i++) {
    if (repeatedWords[i].earliestMeet <= repeatedWords[i + 1].earliestMeet) {
      findWord = repeatedWords[i];
    }
  }

  for (let i = 0; i < array.length; i++) {
    if (array[i] === findWord.word) {
      index.push(i);
    }
  }

  return index;
}

console.log(matchWords(array));
console.log(matchWords(arrayTwo));
