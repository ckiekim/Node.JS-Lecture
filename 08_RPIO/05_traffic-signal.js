var rpio = require('rpio');
const RED = 11;     // Red, Pin11-GPIO17
const GREEN = 21;   // Green, Pin21-GPIO9
const YELLOW = 19;  // Yellow, Pin19-GPIO10
const SWITCH = 3;   // Switch, Pin3-GPIO2

rpio.open(RED, rpio.OUTPUT, rpio.LOW);
rpio.open(GREEN, rpio.OUTPUT, rpio.LOW);
rpio.open(YELLOW, rpio.OUTPUT, rpio.LOW);
rpio.open(SWITCH, rpio.INPUT, rpio.PULL_OFF);

function pollcb(pin) {
    console.log('Button pressed on pin P%d', pin);
    rpio.sleep(3);
    rpio.write(GREEN, rpio.HIGH);
    rpio.sleep(10);
    for (let i=0; i<3; i++) {
        rpio.write(GREEN, rpio.LOW);
        rpio.msleep(500);
        rpio.write(GREEN, rpio.HIGH);
        rpio.msleep(500);
    }
    rpio.write(GREEN, rpio.LOW);
    rpio.write(YELLOW, rpio.HIGH);
    rpio.sleep(3);
    rpio.write(YELLOW, rpio.LOW);
    rpio.write(RED, rpio.HIGH);
}

process.on('SIGINT', function() {
    console.log('\nUser Interrupt Detected. Exiting');
    rpio.close(RED);
    rpio.close(GREEN);
    rpio.close(YELLOW);
    rpio.close(SWITCH);
});

rpio.poll(SWITCH, pollcb, rpio.POLL_LOW);