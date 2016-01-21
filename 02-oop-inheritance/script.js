//------------------------OBSERVABLE--------------
var Observable = function(){

	this.observers = [];

};


Observable.prototype.addObserver = function(observer){
	this.observers.push(observer);
};
Observable.prototype.notify = function(event){
	
	for(var i = 0; i < this.observers.lenght; i++){
		this.observers[i].update(event);
	}
    for (var i = 0; i < this.observers.length ; i++) {  
        for (j = 0; j < this.observers[i].eventCallback.length; j++) {
            
            if (this.observers[i].eventCallback[j] === event) {
                if (event === 'play') {
                    this.observers[i].play(this);
                } else if (event === 'stop') {
                    this.observers[i].stop(this);
                } else if (event === 'download') {
                    this.observers[i].download(this);
                }
            }
        }
    }
};


//------------------------OBSERVER-------------------
var TrackObserver  = function(eventCallback){
    this.eventCallback = eventCallback || [] ;
};

TrackObserver.prototype.play = function (track) {
    console.log('Playing: ' + track.title + '.');
};

TrackObserver.prototype.stop = function (track) {
    console.log('Stopped: ' + track.title + '.');
};

TrackObserver.prototype.download = function (track) {
    console.log('Downloading: ' + track.title + '.');
};

//-------------------------------------------------------


//----------------------------TRACK----------------------
var Track = (function () {

	function Track (title, artist, duration, artists){
		this.title = title;
		this.artist = artist;
		this.duration = duration;
		this.artists = artists || [];
		this.observable = new Observable(); 
	}
	
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
	
	return Track;		

})();


//----------------------DownloadableTrack------------

var DownloadableTrack = function(title, artist, duration){
	Track.call(this, title, artist, duration);
};
DownloadableTrack.prototype.download = function(){
	console.log("Track available to download!!");
	};


//$.extend(Track, DownloadableTrack);
var extend = function (child, parent){
	var copyOfParent = Object.create(parent.prototype);
	copyOfParent.constructor = child;
    child.prototype = copyOfParent;
}

//extend(DownloadableTrack, Track);

//----------------------SOCIAL------------

var Social = function(){
};

Social.prototype.share = function(friendName){
	console.log("Sharing " + this.title + " with " + friendName);
};
Social.prototype.like = function(){
	console.log("Liked");
};

var mixinAugment = function (target, source){
    if (arguments[2]) {
        var index = 2;
        for (index; index < arguments.length; index += 1 ) {
            target.prototype[arguments[index]] = source.prototype[arguments[index]];
        }
    }
    else {
        for (var prop in givingClass.prototype) {
            if ( !Object.hasOwnProperty.call(receivingClass.prototype, prop) ) {
                receivingClass.prototype[prop] = givingClass.prototype[prop];
            }
        }
    }
}

//mixinAugment(Track, Social, "share");

//----------------------Artist------------
var Artist = function (firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
};





