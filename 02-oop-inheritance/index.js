var droid = new Track();
var trackObserver = new TrackObserver([...]);

droid.set('artist', 'Jordan Suckley');
droid.set('title', 'Droid');
droid.addObserver(trackObserver);

droid.play(); // console: Playing Droid...