Observable = function(){

	this.observers = [];

};


Observable.prototype.addObserver = function(observer){
	this.observers.push(observer);
};
Observable.prototype.notify = function(event){
	
	for(var i = 0; i < this.observers.lenght; i++){
		this.observers[i].update("some data -- event");
	}
};