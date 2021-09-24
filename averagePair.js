// O(n^2)
// TODO refactor to have better time complexity
function averagePair(array, average) {
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      const avg = (array[i] + array[j]) / 2;
      if (avg === average) return true;
    }
  }
  return false;
}

console.log(averagePair([-1, 0, , 3, 4, 5, 6], 4.1)); // false
console.log(averagePair([1, 2, 3], 2.5)); //  true
console.log(averagePair([1, 3, 3, 5, 6, 7, 10, 12, 19], 6.5)); // true
