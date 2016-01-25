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