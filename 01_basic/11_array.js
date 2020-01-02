let array = [1, 2, 3];
let array2 = [[1, 2, 3], [4, 5, 6]];
let array3 = [[1, 2, 3], [4, 5, 6], ['a', 'b']];

/* console.log(array.length);
console.log(array2.length);
console.log(array2[0].length);
console.log(array3.length);

console.log(array3); */
for (let index in array3) {
    console.log(index);
}
// Enhanced for-loop
for (let element of array) {
    console.log(element);
}
for (let item of array3) {
    console.log(item);
}
for (let i=0; i<array3.length; i++) {
    console.log(array3[i]);
}