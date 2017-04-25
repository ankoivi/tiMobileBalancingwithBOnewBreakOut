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
				if (pp == 5) {
					app.mapToUse = "map2";
					console.log("can move to next level");
					app.moveToNextLevel = true;
					localStorage.setItem("enemies_2", 1);
					localStorage.setItem("points", pp);
				}
				if (pp == 10) {
					app.mapToUse = "map3";
					console.log("can move to next level");
					app.moveToNextLevel = true;
					localStorage.setItem("enemies_2", 2);
					localStorage.setItem("points", pp);
				}
				if (pp == 15) {
					app.mapToUse = "map4";
					app.moveToNextLevel = true;
					localStorage.setItem("enemies_2", 3);
					localStorage.setItem("points", pp);
				}
				if (pp == 20) {
					app.mapToUse = "map5";
					app.moveToNextLevel = true;
					localStorage.setItem("enemies_2", 3);
					localStorage.setItem("points", pp);
				}
				if (pp == 25) {
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
					$('#gameOver').css('display', 'block');
					app.gameIsOver = true;
					localStorage.setItem("enemies_2", 0);
					localStorage.setItem("points", 0);
					setTimeout(function() {
						app.disconnect();
					}, 5000);
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