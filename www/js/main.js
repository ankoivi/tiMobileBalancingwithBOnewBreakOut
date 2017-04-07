/*
	main.js file
*/
require(['lib/DependencyLoader',
		'BackgroundRenderer',
		'CharacterRenderer',
		'CollisionMap',
		'Agent',
		'Mob',
		'Tileset'],
function(DependencyLoader,
		BackgroundRenderer,
		CharacterRenderer,
		CollisionMap,
		Agent,
		Mob,
		Tileset){
	'use strict';
	// ORGINAL
	// var map = [
	// 		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	// 		[3,0,0,0,0,2,1,3,0,0,0,0,0,0,0,0,0,2,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
	// 		[3,0,0,0,2,1,3,0,0,0,0,0,0,0,0,0,0,0,2,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
	// 		[3,0,0,0,2,3,0,0,2,1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,0,0,0,0,0,0,0,0,0,2],
	// 		[3,0,0,0,2,3,0,0,2,1,1,1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
	// 		[3,0,0,0,2,3,0,0,0,0,2,1,1,1,1,3,0,0,0,0,0,0,0,0,0,0,2,3,0,0,0,0,0,0,0,2],
	// 		[3,0,0,0,0,0,0,0,0,0,0,2,1,3,0,0,0,0,0,0,0,0,2,3,0,0,0,0,0,0,0,0,0,0,0,2],
	// 		[3,0,0,0,0,0,0,0,0,0,2,1,3,0,0,0,2,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
	// 		[3,0,0,0,0,0,0,0,0,0,2,3,0,0,0,2,1,1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1,1,1],
	// 		[3,0,0,0,2,3,0,0,0,0,2,1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1,1,1,1,1],
	// 		[3,0,0,0,0,0,0,0,0,0,2,3,0,0,2,1,1,1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1,1,1],
	// 		[3,0,0,0,0,0,0,0,0,2,1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,0,0,0,2,1,1,1,1,1],
	// 		[3,0,0,0,0,0,0,0,0,0,2,3,0,0,0,0,0,0,2,1,1,1,3,0,0,0,0,0,2,1,1,1,1,1,1,1],
	// 		[3,0,0,0,0,0,0,0,0,0,0,0,0,2,3,0,0,0,0,0,0,0,0,0,0,0,2,1,1,1,1,1,1,1,1,1],
	// 		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
	// 	],
	// IISA
	// var map = [
	// 		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	// 		[3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
	// 		[3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
	// 		[3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
	// 		[3,0,0,0,0,0,4,0,0,4,0,0,4,4,4,4,0,0,4,4,4,4,0,0,0,0,0,2],
	// 		[3,0,0,0,0,0,4,0,0,4,0,0,4,0,0,0,0,0,4,4,4,4,0,0,0,0,0,2],
	// 		[3,0,0,0,0,0,4,0,0,4,0,0,4,0,0,0,0,0,4,4,4,4,0,0,0,0,0,2],
	// 		[3,0,0,0,0,0,4,0,0,4,0,0,4,4,4,4,0,0,4,4,4,4,0,0,0,0,0,2],
	// 		[3,0,0,0,0,0,4,0,0,4,0,0,0,0,0,4,0,0,4,0,0,4,0,0,0,0,0,2],
	// 		[3,0,0,0,0,0,4,0,0,4,0,0,0,0,0,4,0,0,4,0,0,4,0,0,0,0,0,2],
	// 		[3,0,0,0,0,0,4,0,0,4,0,0,4,4,4,4,0,0,4,0,0,4,0,0,0,0,0,2],
	// 		[3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
	// 		[3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
	// 		[3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
	// 		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
	// 	],
		// 213
		var map = [
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
			[3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
			[3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
			[3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
			[3,0,0,0,4,4,4,4,0,0,4,4,4,4,0,0,4,4,4,4,4,4,4,0,0,4,0,0,4,0,0,0,2],
			[3,0,0,0,4,0,0,0,0,0,4,0,0,4,0,0,4,0,0,4,0,0,4,0,0,4,0,0,4,0,0,0,2],
			[3,0,0,0,4,0,0,0,0,0,4,0,0,4,0,0,4,0,0,4,0,0,4,0,0,4,0,0,4,0,0,0,2],
			[3,0,0,0,4,4,4,4,0,0,4,0,0,4,0,0,4,0,0,0,0,0,4,0,0,4,4,4,0,0,0,0,2],
			[3,0,0,0,0,0,0,4,0,0,4,0,0,4,0,0,4,0,0,0,0,0,4,0,0,4,0,0,4,0,0,0,2],
			[3,0,0,0,0,0,0,4,0,0,4,0,0,4,0,0,4,0,0,0,0,0,4,0,0,4,0,0,4,0,0,0,2],
			[3,0,0,0,4,4,4,4,0,0,4,0,0,4,0,0,4,0,0,0,0,0,4,0,0,4,0,0,4,0,0,0,2],
			[3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
			[3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
			[3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
			[3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
		],
		tileSize = 24,
		$body = $('body'),
		$window = $(window),
		$canvas,
		canvases = [],
		bgRenderer,
		characterRenderer,
		spritesToLoad = 2,
		lastCalledTime,
		fps,

		bgTileset = new Tileset({
			spritePath: 'img/sf2-map2.png',
			specPath: 'spec/sf2-map.json',
			onReady: loadCb
		}),

		player = new Agent({
			position: {x:1,y:1},
			collision: new CollisionMap({
				map: map
			}),
			tileset: new Tileset({
				spritePath: 'img/sf2-characters.png',
				specPath: 'spec/sf2-characters.json',
				onReady: loadCb
			})
		}),
		coin = new Mob({
			position: {x:24,y:1},
			collision: new CollisionMap({
				map: map
			}),
			tileset: new Tileset({
				spritePath: 'img/sf2-characters.png',
				specPath: 'spec/sf2-goblin4.json',
				onReady: loadCb
			}),
			targetAgent: player
		}),
		monster = new Mob({
			position: {x:20,y:10},
			collision: new CollisionMap({
				map: map
			}),
			tileset: new Tileset({
				spritePath: 'img/sf2-characters.png',
				specPath: 'spec/sf2-goblin.json',
				onReady: loadCb
			}),
			targetAgent: coin
		});//,
		// monster2 = new Mob({
		// 	position: {x:24,y:7},
		// 	collision: new CollisionMap({
		// 		map: map
		// 	}),
		// 	tileset: new Tileset({
		// 		spritePath: 'img/sf2-characters.png',
		// 		specPath: 'spec/sf2-goblin2.json',
		// 		onReady: loadCb
		// 	}),
		// 	targetAgent: coin
		// }),
		// monster3 = new Mob({
		// 	position: {x:20,y:4},
		// 	collision: new CollisionMap({
		// 		map: map
		// 	}),
		// 	tileset: new Tileset({
		// 		spritePath: 'img/sf2-characters.png',
		// 		specPath: 'spec/sf2-goblin3.json',
		// 		onReady: loadCb
		// 	}),
		// 	targetAgent: coin
		// });
	var countdownTimer;
	var setTime = 60 * 1;
    var display = document.querySelector('#time');
    startTimer(setTime, display);

	function loadCb(){
		spritesToLoad--;
		if(!spritesToLoad){ run(); }
	}
	
	function startTimer(duration, display) {
		var timer = duration, minutes, seconds;
		countdownTimer = setInterval(function () {
			minutes = parseInt(timer / 60, 10);
			seconds = parseInt(timer % 60, 10);

			minutes = minutes < 10 ? "0" + minutes : minutes;
			seconds = seconds < 10 ? "0" + seconds : seconds;

			display.textContent = minutes + ":" + seconds;

			if (--timer < 0) {
				timer = duration;
				clearInterval(countdownTimer);
				$('#gameOver').css('display', 'block');
				app.gameIsOver = true;
				setTimeout(function() {
					app.disconnect();
				}, 5000);
			}
		}, 1000);
	}

	function run(){

		// build layers
		_(4).times(function(i){
			$canvas = $('<canvas width="'+(map[0].length * tileSize)+'" height="'+(map.length * tileSize)+'" data-index="'+i+'" class="gamecanvas canvas'+i+'"/>');
			$body.append($canvas);
			canvases.push($canvas);
		});


		// start renderers
		bgRenderer = new BackgroundRenderer({
			$el: canvases[1],
			map: map,
			tileSet: bgTileset,
			tileSize: tileSize
		});
		characterRenderer = new CharacterRenderer({
			$el: canvases[2],
			tileSize: tileSize,
			agents: [
				player,
				monster,
				// monster2,
				// monster3,
				coin
			]
		});



		// run game
		function gameLoop(){
			// console.log(app.up +' - '+ app.right +' - '+ app.down +' - '+ app.left);
			if (app.up) {
				player.doMove(0, -0.1, 'player');
			} else if (app.down) {
				player.doMove(0, 0.1, 'player');
			}
			if (app.left) {
				player.doMove(-0.1, 0, 'player');
			} else if (app.right) {
				player.doMove(0.1, 0, 'player');
			}
			
			characterRenderer.draw();
			monster.chooseAction();
			// monster2.chooseAction();
			// monster3.chooseAction();
			coin.chooseAction();
			
			window.requestAnimationFrame(gameLoop);

			// FPS
			if(!lastCalledTime) {
				lastCalledTime = Date.now();
				fps = 0;
				return;
			}
			var delta = (Date.now() - lastCalledTime)/1000;
			lastCalledTime = Date.now();
			fps = 1/delta;
			$('#fps').empty().append(parseInt(fps,10));
		}
		gameLoop();

		centerCanvases();
	}



	// resize
	function centerCanvases(){
		_(canvases).each(function($canvas){
			$canvas.css({
				top: ($window.height() - $canvas.height())/2
			});
		});
	}
	$window.resize(_.throttle(centerCanvases,250));


});