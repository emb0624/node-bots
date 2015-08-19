/**
 * 
 * Copyright (c) 2014, 2015 Brian Genisio <briangenisio@gmail.com>

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
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
var five = require("johnny-five");
var board = new five.Board();

var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();

board.on("ready", function () {
    var wheels = {
        left: new five.Servo({ pin: 9, type: 'continuous' }),
        right: new five.Servo({ pin: 10, type: 'continuous' }),
        stop: function () {
            wheels.left.center();
            wheels.right.center();
        },
        forward: function () {
            wheels.left.ccw();
            wheels.right.cw();
            console.log("goForward");
        },
        pivotLeft: function () {
            wheels.left.cw();
            wheels.right.cw();
            console.log("turnLeft");
        },
        pivotRight: function () {
            wheels.left.ccw();
            wheels.right.ccw();
            console.log("turnRight");
        },
        back: function () {
            wheels.left.cw();
            wheels.right.ccw();
        }
    };
    
    wheels.stop();
    console.log("Use the cursor keys or ASWD to move your bot. Hit escape or the spacebar to stop.");
    
    stdin.on("keypress", function(chunk, key) {
        if (!key) return;
        
        switch (key.name) {
        case 'up':
        case 'w':
            wheels.forward();
            break;
            
        case 'down':
        case 's':
            wheels.back();
            break;
            
        case 'left':
        case 'a':
            wheels.pivotLeft();
            break;
            
        case 'right':
        case 'd':
            wheels.pivotRight();
            break;
            
        case 'space':
        case 'escape':
            wheels.stop();
            break;
        }
    });
});