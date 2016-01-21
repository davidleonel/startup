
var droid = new Track();
var trackObserver = new TrackObserver([{event: 'play', callback: function () {}}, event: 'stop', callback: function () {}}]);

droid.set('artist', 'Jordan Suckley');
droid.set('title', 'Droid');
droid.addObserver(trackObserver);

droid.play(); // console: Playing Droid...

//----------------------------------
var californication = new Track('californication', 'red hot chili peppers', 3);
var californicationObs = new TrackObserver(['play','stop']);
californication.addObserver(californicationObs);


var reptilia = new DownloadableTrack('reptilia', 'the strokes', 4);
var reptiliaObs = new TrackObserver(['play']);
reptilia.addObserver(reptiliaObs);



extend(DownloadableTrack, Track);

mixinAugment(Track, Social, "share");



//Create artist/ band members
var anthony = new Artist('Anthony', 'Kiedis', 53);
var john = new Artist('John', 'Frusciante' , 45);

californication.addMember(anthony);
californication.addMember(john);




