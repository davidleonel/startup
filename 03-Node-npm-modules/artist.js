var Artist = function(name, awards){
	this.name = name;
	this.awards = awards || [];
};

Artist.prototype.recognice = function(){
	console.log(this.name + "has the following awards: ");
	for(award in this.awards){
		console.log(award.);
	};
};

module.exports = Artist;
