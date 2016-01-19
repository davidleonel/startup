Track = function () {

		var init = function(title, artist, duration){
			var title = title;
			var artist = artist;
			var duration = duration;
			var observable = new Observable(); 
		},

		addObserver = function (observer){
			this.observable.addObserver(observer);
		}; 

		return {
			init: init,
			addObserver: addObserver,

			play : function(){
				console.log("Playing "+this.title);
			},
			stop : function(){0
				console.log(this.title+" Stopped playing");
			},
			set : function(attr, value){
				var temp = attr;
				this[temp] = value;
			},
			get : function(attr){
				var temp = attr;	
				return this[temp];
			},
		
		};		

}();

/*Track = function(title, artist, duration){

	this.title = title;
	this.artist = artist;
	this.duration = duration;
	
	
	var observable = new Observable(); 

	this.addObserver = function addObserver( observer ) {
    observable.addObserver( observer );
  	};
};
Track.prototype.play = function(){
	console.log("Playing "+this.title);
};
Track.prototype.stop = function(){
	console.log(this.title+" Stopped playing");
};
Track.prototype.set = function(attr, value){
	var temp = attr;
	this[temp] = value;
};
Track.prototype.get = function(attr){
	var temp = attr;	
	return this[temp];
};
*/