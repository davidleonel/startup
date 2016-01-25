var Track = require('./Track.js');
var Artist = require('./Artist.js');
var $ = require('jQuery');

var droid = new Track();
var jordanSuckley = new Artist('Jordan Suckley');

jordanSuckley.set('awards', ['X', 'Y', 'Z']);
droid.set('artist', jordanSuckley);

droid.get('artist').recognice(); //console: Jordan Suckley has the following awards: ...*/


showAwards = function () {
    var $container = $(".content");
    var $awards = $("<awards>");
    var $a = droid.get("artist").recognice();

    $awards.append($p);
    $container.append($awards);
};

$(document).on("ready", showAwards);