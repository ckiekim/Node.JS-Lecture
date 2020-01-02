function callFiveTimes(callback) {
    for (let i=0; i<5; i++) {
        callback();
    }
}

callFiveTimes(function() {
    console.log('callback function')
});

let anonymous = function() {
    console.log('callback function')
}
callFiveTimes(anonymous);