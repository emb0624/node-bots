/**
 * 
 * Copyright (c) 2014, 2015 Brian Genisio <briangenisio@gmail.com>

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the 'Software'), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
* 
* github: https://github.com/BrianGenisio/codemash-nodebots-docs/blob/master/examples/base-sumobot.js
 * 
 */
var five = require('johnny-five');
var board = new five.Board();

var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();

board.on('ready', function () {
   initWheels();
});


function getLeds() {
  return {
  	right: new five.Led(12),
  	left: new five.Led(13),

  	onBoth: function() {
  		this.right.on();
  		this.left.on();
  	},

  	blinkBoth: function(ms) {
  		ms = ms || 200;
  		this.right.blink(ms);
  		this.left.blink(ms);
  	},

  	offBoth: function() {
  		this.right.off().stop();
  		this.left.off().stop();
  	}
  }
}

function getWheels() {
	return {

	  left: new five.Servo({ pin: 9, type: 'continuous' }),
	  right: new five.Servo({ pin: 11, type: 'continuous' }),

	  stop: function () {
	      this.left.center();
	      this.right.center();
	  },
	  forward: function () {
	      this.left.ccw();
	      this.right.cw();
	      console.log('goForward');
	  },
	  pivotLeft: function () {
	      this.left.cw();
	      this.right.cw();
	      console.log('turnLeft');
	  },
	  pivotRight: function () {
	      this.left.ccw();
	      this.right.ccw();
	      console.log('turnRight');
	  },
	  back: function () {
	      this.left.cw();
	      this.right.ccw();
	  }
	};
}

function initWheels() {
	var leds = getLeds();
	var wheels = getWheels();
    
  wheels.stop();
  console.log('Use the cursor keys or ASWD to move your bot. Hit escape or the spacebar to stop.');
  
  stdin.on('keypress', function(chunk, key) {
    if (!key) return;
    
    //reset
    leds.offBoth();

    switch (key.name) {
	    case 'up':
	    case 'w':
	  		leds.onBoth();
	      wheels.forward();
	      break;
	        
	    case 'down':
	    case 's':
	  		leds.blinkBoth();
	      wheels.back();
	      break;
	        
	    case 'left':
	    case 'a':
	      wheels.pivotLeft();
	      leds.right.off();
	      leds.left.on();
	      break;
	        
	    case 'right':
	    case 'd':
	      wheels.pivotRight();
	      leds.left.off();
	      leds.right.on();
	      break;
	        
	    case 'space':
	    case 'escape':
	  		leds.offBoth();
	      wheels.stop();
	      break;
    }
  });
}