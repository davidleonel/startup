//------------------------OBSERVABLE--------------
var Observable = function(){
	this.observers = [];
};
Observable.prototype.addObserver = function(observer){
	this.observers.push(observer);
};
Observable.prototype.notify = function(event, track){
	
    for (var i = 0; i < this.observers.length ; i++) { 

        for (j = 0; j < this.observers[i].eventCallback.length; j++) {
            
        	if(this.observers[i].eventCallback[j].method === event){
    		this.observers[i].eventCallback[j].callback(track);
    		}

        }
    }
};

//------------------------OBSERVER-------------------
var Observer  = function Observer(eventCallback){
    
    this.eventCallback = eventCallback || [] ;
};

//------------------------TRACKOBSERVER-------------------
var trackObserver  = new Observer ([

    {
		method: "play", 
		callback: function(track) {
		 	console.log("Playing " + track.title); 
		}
	},
	{
		method: "stop", 
		callback: function(track) {
		 	console.log("Stopped " + track.title); 
		}
	},
	{
		method: "download",
		callback: function(track) {
		 	console.log("Downloading " + track.title); 
		}
	},
		{
		method: "share", 
		callback: function(message) {
		 	console.log("Sharing with: " + message); 
		}
	}
]);


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
		this.observable.notify("play", this);
	};
	Track.prototype.stop = function(){
		this.observable.notify("stop", this);
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

var DownloadableTrack = function DownloadableTrack (title, artist, duration){
	Track.call(this, title, artist, duration);
};
DownloadableTrack.prototype.download = function(){
	this.notify("download", this);
	};


//$.extend(Track, DownloadableTrack);
var extend = function (child, parent){
	var copyOfParent = Object.create(parent.prototype);
	copyOfParent.constructor = child;
    child.prototype = copyOfParent;
}



//----------------------SOCIAL------------

var Social = function(){
};

Social.prototype.share = function(friendName){
	this.observable.notify("share", friendName);
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

//----------------------Artist------------
var Artist = function (firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
};
