let now = new Date();

now.setDate(now.getDate() + 100);
console.log(now.toString());
console.log(now.toLocaleString());
console.log(now.toLocaleDateString());  // 2020-1-3
console.log(now.toLocaleTimeString());  // 10:47:46

now = new Date();
//let dDay = new Date('November 14, 2020');
let dDay = new Date('2020-11-14');
let interval = dDay.getTime() - now.getTime();
interval = Math.floor(interval / (1000 * 60 * 60 * 24));
console.log(`수능 D-${interval}`);