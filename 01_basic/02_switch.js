let grade = 'A';

// String 타입에 대해서도 switch-case 가능
switch(grade) {
    case 'A':
        console.log('100 - 90점');
        break;
    case 'B':
        console.log('89 - 80점');
        break;
    case 'C':
        console.log('79 - 70점');
        break;
    case 'D':
        console.log('69 - 60점');
        break;
    default:
        console.log('60점 미만');
}