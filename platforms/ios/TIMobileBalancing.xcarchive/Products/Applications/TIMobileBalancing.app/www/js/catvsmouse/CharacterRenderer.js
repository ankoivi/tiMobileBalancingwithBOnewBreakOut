define(['Renderer'],function(Renderer){

	return Renderer.extend({
		constructor: function(options){
			this.agents = options.agents;

			Renderer.prototype.constructor.call(this,options);
		},
		draw: function(){
			var self = this;

			this.context.clearRect(0, 0, this.w, this.h);

			_(this.agents).each(function(agent){
				console.log(agent);
				if (agent === undefined || agent.length <= 0 || agent === null) {
					console.log("undefined");
				} else {
					console.log("valid parameters to draw");
					self.tileSpec = agent.getTileSpec();
					console.log(self.tileSpec);
					if (self.tileSpec.name == 'player' && app.charCount === 0) {
						console.log('player');
						// self.tileSpec.standing.y = eval(app.charItem)*24;
						// self.tileSpec.standing_alt.y = eval(app.charItem)*24;
						self.tileSpec.standing.y = 0;
						self.tileSpec.standing_alt.y = 0;
						app.charCount++;
					} else if (self.tileSpec.name == 'monster1' && app.goblinCount === 0) {
						console.log('monster1');
						self.tileSpec.standing.y = 24;
						self.tileSpec.standing_alt.y = 24;
						// self.tileSpec.standing.y = eval(app.goblinItem)*24;
						// self.tileSpec.standing_alt.y = eval(app.goblinItem)*24;
						app.goblinCount++;
					} else if (self.tileSpec.name == 'monster2' && app.goblinCount === 1) {
						console.log('monster2');
						self.tileSpec.standing.y = 24;
						self.tileSpec.standing_alt.y = 24;
						// self.tileSpec.standing.y = eval(app.goblinItem)*24;
						// self.tileSpec.standing_alt.y = eval(app.goblinItem)*24;
						app.goblinCount++;
					} else if (self.tileSpec.name == 'monster3' && app.goblinCount === 2) {
						console.log('monster3');
						self.tileSpec.standing.y = 24;
						self.tileSpec.standing_alt.y = 24;
						// self.tileSpec.standing.y = eval(app.goblinItem)*24;
						// self.tileSpec.standing_alt.y = eval(app.goblinItem)*24;
						app.goblinCount++;
					}
					self.drawTile(agent.getSprite(), agent.getTileId(), agent.position.x, agent.position.y);
				}
			});
		}
	});

});
