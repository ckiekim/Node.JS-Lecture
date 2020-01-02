let add = function(a, b) {  // 익명함수
    return a+b;
}

function add2(a, b) {
    return a+b;
}

let add3 = (a, b) => { return a+b };

let add4 = (a, b) => a + b;

console.log(add(3, 4));
console.log(add2(4, 5));
console.log(add3(5, 6));
console.log(add4(6, 7));