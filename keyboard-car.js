var five = require("johnny-five");
var keypress = require("keypress");

keypress(process.stdin);

board = new five.Board({port: "COM3"});

board.on("ready", function() {
	console.log("Use as setas para cima e para baixo para CW e CCW respectivamente. Espaço para parar.");

	process.stdin.resume();
	process.stdin.setEncoding("utf8");
	process.stdin.setRawMode(true);	
	
   	var motors = new five.Motors([
    	{ pins: { dir: 10, pwm: 9 }, invertPWM: true },
     	{ pins: { dir: 7, pwm: 6 }, invertPWM: true }
   	]);
	
	board.repl.inject({
    	motors: motors
  	});
  
  	process.stdin.on("keypress", function(ch, key) {

    if (!key) {return;}
     if (key.name === "up") {
		console.log("Frente");
		motors[0].reverse(255);
		motors[1].forward(255);
    } else if (key.name === "down") {
		console.log("Atrás");
	  	motors[0].forward(255);
		motors[1].reverse(255);
	} else if (key.name === "left") {
		console.log("Direita");
	  	motors[0].stop();
		motors[1].forward(255);
	} else if (key.name === "right") {
		console.log("Esquerda");
	  	motors[0].reverse(255);
		motors[1].stop();		
    } else if (key.name === "space") {
      	console.log("Parado");
      	motors[0].stop();
		motors[1].stop();
    }
  });
});
