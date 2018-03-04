define(['Agent',
		'lib/astar'],
function(Agent,
		astar){
	
	return Agent.extend({
		constructor: function(options){
			options = options || {};
			this.targetAgent = options.targetAgent;

			Agent.prototype.constructor.call(this,options);

			this.walkableMap = _(this.collision.map).map(function(row){
				return _(row).map(function(tileId){
					return tileId === 0 ? 'w' : 'u'
				});
			});
		},
		getWalkableMap: function(){
			return _(this.walkableMap).map(function(row){
					return _(row).map(function(tile){
						return tile;
					});
				});
		},
		getAStarMovement: function(){
			var map = this.getWalkableMap(),
				path;

			map[~~(this.position.y)][~~(this.position.x)] = 's';
			map[~~(this.targetAgent.position.y)][~~(this.targetAgent.position.x)] = 'g';
			
			path = astar(map,'manhattan',true);

			if(path && path.length>1){
				return {
						x: path[1].col,
						y: path[1].row
					};
			}
			return this.position;
		},
		moveToTarget: function(){
			var nextMove = this.getAStarMovement(),
				dx = nextMove.x - this.position.x,
				dy = nextMove.y - this.position.y,
				moveX = dx*0.03,
				moveY = dy*0.03;

			if(moveX){
				moveX = Math.abs(moveX)/moveX * Math.max(moveX,0.05);
			}
			if(moveY){
				moveY = Math.abs(moveY)/moveY * Math.max(moveY,0.05);
			}

			this.doMove(moveX,moveY);
		},
		atTarget: function(){
			console.log(this);
			// monster2 - player
			console.log(this.tileset.tileSpec.name+' - '+this.targetAgent.tileset.tileSpec.name);
			var newX = 0;
			var newY = 0;
			isOK = false;

			while (!isOK) {
				newY = Math.floor((Math.random() * this.collision.map.length));
				newX = Math.floor((Math.random() * this.collision.map[0].length));
				console.log(this.collision.map.length+', '+this.collision.map[0].length);
				console.log(this.collision.map[newY][newX]);
				if (this.collision.map[newY][newX] === 0) {
					isOK = true;
				}
			}
			if (this.tileset.tileSpec.name == 'coin' && this.targetAgent.tileset.tileSpec.name == 'player') {
				this.position.x = newX;
				this.position.y = newY;
				var pp = $('#player_cvsm').text();
				$('#player_cvsm').empty();
				pp = parseInt(pp ,10)+1;
				// if (pp%5 == 0 && pp!=0) {
				// 	console.log("Change level");
				// }
				/*if (pp%5 == 0 && pp!=0) {
					if (app.mapNro == 6) {
						app.mapNro = 0;
					}
					if (app.enemies_counter == 3) {
						app.enemies_counter = 2;
					}
					if (app.mapNro == 0) {
						app.mapToUse = "map";
						app.mapNro++;
					} else {
						app.mapToUse = "map"+app.mapNro++;
					}
					console.log("can move to next level");
					app.moveToNextLevel = true;
					localStorage.setItem("enemies_2", app.enemies_counter++);
					localStorage.setItem("points", pp);
				}*/
				if (pp == 5) {
					app.mapToUse = "map2";
					console.log("can move to next level");
					app.moveToNextLevel = true;
					localStorage.setItem("enemies_2", 1);
					localStorage.setItem("points", pp);
				} else if (pp == 10) {
					app.mapToUse = "map3";
					console.log("can move to next level");
					app.moveToNextLevel = true;
					localStorage.setItem("enemies_2", 2);
					localStorage.setItem("points", pp);
				} else if (pp == 15) {
					app.mapToUse = "map4";
					app.moveToNextLevel = true;
					localStorage.setItem("enemies_2", 3);
					localStorage.setItem("points", pp);
				} else if (pp == 20) {
					app.mapToUse = "map5";
					app.moveToNextLevel = true;
					localStorage.setItem("enemies_2", 3);
					localStorage.setItem("points", pp);
				} else if (pp == 25) {
					app.mapToUse = "map6";
					app.moveToNextLevel = true;
					localStorage.setItem("enemies_2", 3);
					localStorage.setItem("points", pp);
				}
				$('#player_cvsm').append(pp);
				// this.targetAgent.position.x = newX;
				// this.targetAgent.position.y = newY;
				// var pm = $('#monster').text();
				// $('#monster').empty();
				// pm = parseInt(pm ,10)+1;
				// $('#monster').append(pm);
				// document.getElementById('monster').innerText = parseInt(document.getElementById('monster').innerText, 10)++;
			} else {
				if (this.targetAgent.tileset.tileSpec.name == "player" && this.tileset.tileSpec.name.includes("monster")) {
					timer = sessionStorage.getItem("duration");
					clearInterval(app.countdownTimer);
					app.gameIsOver = true;
					if (app.use_top_list) {
						// HANDLE TOP LISTS
						$('#add_nick_to_top_list').css('display', 'block');
						var player_points = $('#player_cvsm').text();
						player_points = parseInt(player_points, 10);
						var player_position = 0;
						localStorage.setItem("enemies_2", 0);
						localStorage.setItem("points", 0);
						var top_list = JSON.parse(localStorage.getItem('catvsmouse_data'));
						if (localStorage.getItem('catvsmouse_data') !== null) {
							top_list.sort(function(a, b) {
				                return parseFloat(b.points) - parseFloat(a.points);
				            });
							for (var i = 0; i < top_list.length; i++) {
				                if (top_list[i].points < player_points) {
				                	// if (i == 0)
				                	// 	i = 1;
				                    player_position = i + 1;
				                    break;
				                } else if (top_list[i].points == player_points) {
				                	if (i == 0) {
				                		player_position = i + 1;
				                	} else {
				                		player_position = i + 1;
				                	}
				                	break;
				                } else if (i == top_list.length-1) {
				                	player_position = top_list.length + 1;
				                }
				            }
				        } else {
				        	player_position = 1;
				        }
						document.getElementById("player_points").innerHTML = player_points;
						document.getElementById("player_position").innerHTML = player_position;
					} else {
						$('#gameOver').css('display', 'block');
						localStorage.setItem("enemies_2", 0);
						localStorage.setItem("points", 0);
						setTimeout(function() {
							app.disconnect();
						}, 5000);
					}
					// $('#gameOver').css('display', 'block');
					// app.gameIsOver = true;
					// localStorage.setItem("enemies_2", 0);
					// localStorage.setItem("points", 0);
					// setTimeout(function() {
					// 	app.disconnect();
					// }, 5000);
				} else {
					console.log("// SOME ERROR?");
				}
				// document.getElementById('player').innerText = parseInt(document.getElementById('player').innerText, 10)++;
			}
			
		},
		chooseAction: function(){
			if(
				Math.abs(this.position.y - this.targetAgent.position.y) < 1
				&&
				Math.abs(this.position.x - this.targetAgent.position.x) < 1
			){
				this.atTarget();
			}else{
				this.moveToTarget();
			}
		}
	});

});