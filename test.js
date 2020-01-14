const array = ["5e197b2a22a4ae2aa457d131", "5e197b2a22a4ae2aa457d131", "5e197b2a22a4ae2aa457d131"];

console.log(array);

const index = array.indexOf("5e197b2a22a4ae2aa457d131");
if (index > -1) {
  array.splice(index, 1);
}

// array = [2, 9]
console.log(array); 