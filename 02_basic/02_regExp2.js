// 입력을 받아서 email 형식에 맞는지 여부를 알려주는 프로그램
var readline = require('readline');

var r = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// email 정규표현식
var emailRegEx = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
// 핸드폰 전화번호 정규표현식
var hpRegEx = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
// 패스워드 정규표현식, 8 ~ 10자 영문, 숫자 조합
var pwdRegEx = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/; 

r.setPrompt('> ');
r.prompt();
r.on('line', function(line) {
    if (line === 'exit') {
        r.close();
    }
    if (emailRegEx.test(line)) {
        console.log('email 표현식입니다.');
    } else if (hpRegEx.test(line)) {
        console.log('전화번호 표현식입니다.');
    } else if (pwdRegEx.test(line)) {
        console.log('비밀번호 표현식입니다.');
    } else {
        console.log('다시 입력하세요.')
    }
    //console.log(line);
    r.prompt();
});

r.on('close', function() {
    process.exit();
});