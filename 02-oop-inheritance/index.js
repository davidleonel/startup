//----------------------------------

var californication = new Track('californication', 'red hot chili peppers', 3);
californication.addObserver(trackObserver);


//Create artist/ band members
var anthony = new Artist('Anthony', 'Kiedis', 53);
var john = new Artist('John', 'Frusciante' , 45);

californication.addMember(anthony);
californication.addMember(john);




