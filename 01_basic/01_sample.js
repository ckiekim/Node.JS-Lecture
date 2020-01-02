var old;
function makeTableRow(a, b, c) {
    var row = `<tr><td>${a}</td><td>${b}</td><td>${c}</td></tr>`;
    old = '<tr><td>' + a + '</td><td>' + b + '</td><td>' + c + '</td></tr>';
    console.log(old);
    return row;
}

console.log(makeTableRow('aaa', 'bbb', 'ccc'));
if (old === makeTableRow('aaa', 'bbb', 'ccc')) {
    console.log('같습니다.')
}
