// 삼각형으로 별 그리기
for (let i=0; i<5; i++) {
    for(let k=0; k<=i; k++) {
        process.stdout.write('*');
    }
    console.log();
}
console.log();

// 역삼각형으로 별 그리기
for(let k=0;k<5;k++){
    for(let j=0; j<k; j++){
        process.stdout.write(' ');
    }
    for(let i=5; i>k; i--){
        process.stdout.write('*');
    }
    console.log('');
}
console.log();

// 다이아몬드 별 그리기
for(let i=0; i<4; i++){
    for(let k=0; k<3-i; k++){
        process.stdout.write(' ');   
    }
    for(let z=0; z<(i*2+1); z++){
        process.stdout.write('*');
    }
    console.log();
}
for(let i=0; i<3; i++){
        for(let k=0; k<i+1; k++){
            process.stdout.write(' ');   
        }
        for(let z=1; z<=((3-i)*2-1); z++){
            process.stdout.write('*');
        }
        console.log();
}
