(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Artist = function(name, awards){
	this.name = name;
	this.awards = awards || [];
};

Artist.prototype.recognice = function(){
	console.log(this.name + " has the following awards: ");
	for(i = 0; i < this.awards.length; i++){
		console.log(this.awards[i]);
	};
};

Artist.prototype.set = function (attr, value) {
    var temp = attr;
	this[temp] = value;
	
};

Artist.prototype.setAwards = function(values){

	for (i = 0; i < values.length; i++){
		this.awards.push(values[i]);
	};


};

module.exports = Artist;


/*
var a = new Artist("David");
a.setAwards(["XX", "ZZ"]);
a.recognice();*/
},{}],2:[function(require,module,exports){
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

},{"./artist":1}]},{},[1,2]);
