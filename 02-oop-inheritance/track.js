Track = function(title, artist, duration){

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
