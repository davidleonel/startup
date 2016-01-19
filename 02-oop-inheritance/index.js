
var droid = new Track();
var trackObserver = new TrackObserver();

droid.set('artist', 'Jordan Suckley');
droid.set('title', 'Droid');
droid.addObserver(trackObserver);

droid.play(); // console: Playing Droid...

function extend(target, source){
    for(var prop in source)
        if(source.hasOwnProperty(prop))
            target[prop] = source[prop];
    return target;
}

var newExtendedTrack = extend(Track, DownloadableTrack);

newExtendedTrack.download(); // console: Track available to download!!



//$.extend(TrackModule, DownloadableTrack);





