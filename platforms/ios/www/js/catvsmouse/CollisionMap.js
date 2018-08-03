define(function(){
	
	function CollisionMap(options){
		this.map = options.map;
	}

	CollisionMap.prototype.getPosition = function(isY, x, y, intent){
		var newPosition = isY ? y : x,
			tryPosition = isY ? Math.floor(y+intent) : Math.floor(x+intent);
		/*if(isY && !this.map[tryPosition+1][Math.floor(x)+1]){
			newPosition = y+intent;
			// pos_change = true;
		} else if(!isY && !this.map[Math.floor(y)+1][tryPosition+1]){
			newPosition = x+intent;
			// pos_change = true;
		}*/
		/* Detect y (first) and x (second) movement */
		if(isY){
			if (!this.map[tryPosition+1][Math.floor(x)+1] && !this.map[tryPosition+1][Math.floor(x)]) {
				if (!this.map[tryPosition][Math.floor(x)+1] && !this.map[tryPosition][Math.floor(x)]) {
					newPosition = y+intent;
				}
			}
		} else if(!isY){
			if (!this.map[Math.floor(y)+1][tryPosition+1] && !this.map[Math.floor(y)][tryPosition+1]) {
				if (!this.map[Math.floor(y)+1][tryPosition] && !this.map[Math.floor(y)][tryPosition]) {
					newPosition = x+intent;
				}
			}
		}


		// app.logging++;
		return newPosition;
	};


	return CollisionMap;

});
