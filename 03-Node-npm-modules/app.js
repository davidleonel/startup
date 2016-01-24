(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Artist = function(name, awards){
	this.name = name;
	this.awards = awards || [];
};

Artist.prototype.recognice = function(){
	console.log(this.name + "has the following awards: ");
	for(award in this.awards){
		console.log(award);
	};
};

Artist.prototype.set = function(attr, values){

	for (i = 0; i < values.length; i++){
		this[attr].push(values[i]);
	};

	/*var temp = attr;
	this[temp] = value;
	*/
};

module.exports = Artist;

},{}],2:[function(require,module,exports){
var Artist = require('./artist');
var Track = function (title, artist, duration, artists){
		
		this.title = title;
		this.artist = artist;
		this.duration = duration;
		this.artists = null;
		//this.observable = new Observable(); 
};
	
Track.prototype.addObserver = function (observer){
	this.observable.addObserver(observer)
};
Track.prototype.play = function(){
	console.log("Playing "+this.title);
};
Track.prototype.stop = function(){
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
		

module.exports = Track;

},{"./artist":1}]},{},[2,1]);
