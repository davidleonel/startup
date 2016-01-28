var Artist = require('./artist');
var Track = function (title, artist, duration, artists){
		
		this.title = title;
		this.artist = artist;
		this.duration = duration;
		this.artists = null;
};
	
Track.prototype.set = function(attr, value){
	this[attr] = value;
};
Track.prototype.get = function(attr){
	return this[attr];
};
	
module.exports = Track;
