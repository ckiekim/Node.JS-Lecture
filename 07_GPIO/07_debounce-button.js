// 에지로 버튼 스위치 입력 받아 LED 켜기 
'use strict';

const Gpio = require('onoff').Gpio;
const led = new Gpio(17, 'out');
const button = new Gpio(2, 'in', 'falling', {debounceTimeout: 10});

// 버튼 누를 때 Toggle
button.watch(function(err, value) {
	if (err)
		throw err;

	led.writeSync(led.readSync() ^ 1);
});

process.on('SIGINT', function() {
	led.unexport();
	button.unexport();
});
