(function (){
var droid = new Track();
var trackObserver = new TrackObserver();

droid.set('artist', 'Jordan Suckley');
droid.set('title', 'Droid');
droid.addObserver(trackObserver);

droid.play(); // console: Playing Droid...

// I dont understand why i have to set the correct prototype to DownloadableTrack.
//doing this works, but may be i didnt understand what it is that the exercise is asking for :S haha
$.extend(TrackModule, DownloadableTrack);

var t = TrackModule;
tt.download(); // console: Track available to download!!

}());