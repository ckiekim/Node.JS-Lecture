function callThreeTimes(callback) {
    if (callback) {
        for (let i = 0; i < 3; i++) {
            callback();
        }
    } else {
        console.log('No callback!!!');
    }
}

callThreeTimes(function() {
    console.log("Hello!")
});

callThreeTimes();