define(function(){
	
	return Toolbox.Base.extend({
		constructor: function(options){
			this.position = options.position || {x:0,y:0};
			this.collision = options.collision;
			this.tileset = options.tileset;
		},
		doMove: function(moveX,moveY,character){
			curr = this.tileset.sprite.src;
			if (this.tileset.tileSpec.name == 'monster1') {
				moveX *= 0.3;
				moveY *= 0.3;
			} else if (this.tileset.tileSpec.name == 'monster2') {
				moveX *= 0.4;
				moveY *= 0.4;
			} else if (this.tileset.tileSpec.name == 'monster3') {
				moveX *= 0.5;
				moveY *= 0.5;
			} else if (this.tileset.tileSpec.name == 'coin') {
				moveX *= 0;
				moveY *= 0;
			} else { // player
				moveX *= 0.6;
				moveY *= 0.6;
			}
			if (app.gameIsOver) {
				moveX *= 0;
				moveY *= 0;
			}
			// console.log(this.tileset.sprite.src);
			this.position.x = this.collision.getPosition(0, this.position.x, this.position.y, moveX);
			this.position.y = this.collision.getPosition(1, this.position.x, this.position.y, moveY);
		},
		setPosition: function(pos){
			pos = pos || {};
			this.position.x = pos.x || 0;
			this.position.y = pos.y || 0;
		},
		getSprite: function(){
			return this.tileset.sprite;
		},
		getTileId: function(){
			return (Math.floor(new Date().getTime()/500)%2) ? 'standing' : 'standing_alt';
		},
		getTileSpec: function(){
			return this.tileset.tileSpec;
		}
	});

});