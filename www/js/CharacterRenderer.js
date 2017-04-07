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
				
				self.tileSpec = agent.getTileSpec();
				if (self.tileSpec.name == 'player' && app.charCount === 0) {
					console.log('player');
					self.tileSpec.standing.y = app.charItem*24;
					self.tileSpec.standing_alt.y = app.charItem*24;
					app.charCount++;
				} else if (self.tileSpec.name == 'monster1' && app.goblinCount === 0) {
					console.log('player');
					self.tileSpec.standing.y = app.goblinItem*24;
					self.tileSpec.standing_alt.y = app.goblinItem*24;
					app.goblinCount++;
				}
				self.drawTile(agent.getSprite(), agent.getTileId(), agent.position.x, agent.position.y);
			});
		}
	});

});