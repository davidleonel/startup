var Track = require('./Track.js');
var Artist = require('./Artist.js');
var $ = require('jQuery');

var droid = new Track();
var jordanSuckley = new Artist('Jordan Suckley');

jordanSuckley.set('awards', ['X', 'Y', 'Z']);
droid.set('artist', jordanSuckley);

console.log(droid.get('artist').recognice()); //console: Jordan Suckley has the following awards: ...*/


showAwards = function () {
    var $content = $(".content");
    var a = droid.get("artist").recognice();
    $content.append(a);  
};

$(document).on("ready", showAwards);