let now = new Date();

// 2020-01-02(목) 13:22
/* console.log(now.getFullYear());    // 2020
console.log(now.getMonth());       // 0
console.log(now.getDate());        // 2
console.log(now.getDay());         // 4
console.log(now.getHours());       // 13
console.log(now.getMinutes());     // 22 */

let currentHour = 12;
if (currentHour >= 12) {
    console.log('오후 ' + (currentHour-12) + '시');
} else {
    console.log('오전 ' + currentHour + '시');
}

if (currentHour >= 12) {
    console.log(`오후 ${currentHour-12}시`);
} else {
    console.log(`오전 ${currentHour}시`);
}

let apm = '오전';
if (currentHour >= 12) {
    apm = '오후';
    if (currentHour >= 13) {
        currentHour -= 12;
    }
}
console.log(`${apm} ${currentHour}시`);

apm = currentHour >= 12 ? '오후' : '오전';
currentHour = currentHour >= 13 ? currentHour-12 : currentHour;
console.log(`${apm} ${currentHour}시`);