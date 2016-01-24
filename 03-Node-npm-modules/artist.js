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
