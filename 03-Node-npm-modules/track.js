var Artist = require('./artist');
var Track = function (title, artist, duration, artists){
		
		this.title = title;
		this.artist = artist;
		this.duration = duration;
		this.artists = null;
};
	
Track.prototype.set = function(attr, value){
	var temp = attr;
	this[temp] = value;
};
Track.prototype.get = function(attr){
	var temp = attr;	
	return this[temp];
};
	
module.exports = Track;
