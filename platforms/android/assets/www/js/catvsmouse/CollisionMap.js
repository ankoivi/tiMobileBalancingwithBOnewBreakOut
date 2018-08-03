define(function(){
	
	function CollisionMap(options){
		this.map = options.map;
	}

	CollisionMap.prototype.getPosition = function(isY, x, y, intent){
		// console.log(isY,", ",x,", ",y,", ",intent);
		var newPosition = isY ? y : x,
			tryPosition = isY ? Math.floor(y+intent) : Math.floor(x+intent),
			tryPosition2 = isY ? Math.ceil(y-intent) : Math.ceil(x-intent),
			pos_change = false;
		if(isY && !this.map[tryPosition+1][Math.floor(x)+1]){
			newPosition = y+intent;
			pos_change = true;
		} else if(!isY && !this.map[Math.floor(y)+1][tryPosition+1]){
			newPosition = x+intent;
			pos_change = true;
		}
		// if (pos_change) {
		// 	// console.log('-');
		// 	if(isY && !this.map[tryPosition2-1][Math.ceil(x)-1]){
		// 		newPosition = y-(intent);
		// 	} else if(!isY && !this.map[Math.ceil(y)-1][tryPosition2-1]){
		// 		newPosition = x-(intent);
		// 	}
		// }
		return newPosition;
	};


	return CollisionMap;

});
