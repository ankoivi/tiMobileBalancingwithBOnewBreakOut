define(function(){
	
	function CollisionMap(options){
		this.map = options.map;
	}

	CollisionMap.prototype.getPosition = function(isY, x, y, intent){
		// if (app.logging%100 == 0)
		// 	console.log(isY,", ",x,", ",y,", ",intent);
		var newPosition = isY ? y : x,
			tryPosition = isY ? Math.floor(y+intent) : Math.floor(x+intent),
			tryPosition2 = isY ? Math.ceil(eval(y+intent)) : Math.ceil(eval(x+intent)),
			old_position = newPosition
			canmove = false;
		/*if(isY && !this.map[tryPosition+1][Math.floor(x)+1]){
			newPosition = y+intent;
			// pos_change = true;
		} else if(!isY && !this.map[Math.floor(y)+1][tryPosition+1]){
			newPosition = x+intent;
			// pos_change = true;
		}*/
		if(isY && !this.map[tryPosition+1][Math.floor(x)+1]){
			// canmove = true;
			if(this.map[tryPosition2-1][Math.ceil(x)-1] && intent!=0) {
				console.log("wall hit Y");
				// canmove = false;
			} else if(this.map[tryPosition][Math.floor(x)+1] && intent!=0) {
				console.log("wall hit Y");
				// canmove = false;
			} else if (this.map[tryPosition2][Math.ceil(x)-1] && intent!=0) {
				console.log("wall hit Y");
				// canmove = false;
			} else if (this.map[tryPosition2][Math.floor(x)] && intent!=0) {
				console.log("wall hit Y");
				// canmove = false;
			} else {
				newPosition = y+intent;
			}
		} else if(!isY && !this.map[Math.floor(y)+1][tryPosition+1]){
			// canmove = true;
			if (this.map[Math.ceil(y)-1][tryPosition2-1] && intent!=0) {
				console.log("wall hit X");
				// canmove = false;
			} else if (this.map[Math.floor(y)+1][tryPosition] && intent!=0) {
				console.log("wall hit X");
				// canmove = false;
			} else if (this.map[Math.ceil(y)-1][tryPosition2] && intent!=0){
				console.log("wall hit X");
				// canmove = false;
			} else if (this.map[Math.floor(y)][tryPosition2] && intent!=0){
				console.log("wall hit X");
				// canmove = false;
			} else {
				newPosition = x+intent;
			}
			
		} else {
			// hit the wall in floor dir _|
		}


		/*if (pos_change) {
			// console.log('-');
			if(isY && !this.map[tryPosition2-1][Math.ceil(x)-1]){
				newPosition = y-(intent);
			} else if(!isY && !this.map[Math.ceil(y)-1][tryPosition2-1]){
				newPosition = x-(intent);
			}
		}*/
		app.logging++;
		return newPosition;
	};


	return CollisionMap;

});
