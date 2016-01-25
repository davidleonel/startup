var Artist = function(name, awards){
	this.name = name;
	this.awards = awards || [];
};

Artist.prototype.recognice = function(){
	var msg = this.name + " has the following awards: ";
	for(i = 0; i < this.awards.length; i++){
		msg += this.awards[i] + ' ';
	};
    return msg;
};

Artist.prototype.set = function (attr, value) {
    var temp = attr;
	this[temp] = value;
	
};

module.exports = Artist;
