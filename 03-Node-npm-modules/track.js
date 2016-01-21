var Artist = require('./artist');
var Track = function (title, artist, duration, artists){
		
		this.title = title;
		this.artist = artist;
		this.duration = duration;
		this.artists = artists || [];
		//this.observable = new Observable(); 
};
	
Track.prototype.addObserver = function (observer){
	this.observable.addObserver(observer)
};
Track.prototype.play = function(){
	console.log("Playing "+this.title);
};
Track.prototype.stop = function(){0
	console.log(this.title+" Stopped playing");
},
Track.prototype.set = function(attr, value){
	var temp = attr;
	this[temp] = value;
};
Track.prototype.get = function(attr){
	var temp = attr;	
	return this[temp];
};
Track.prototype.addMember = function (artist) {
    this.artists.push(artist);
};
		

};

module.exports = Track;
