//Constructor Function
TrackObserver  = function(callback){
	for (var i = 0; i < callback.lenght; i++) {
		callback[i]();
	}
};


TrackObserver.prototype.update = function(event){};