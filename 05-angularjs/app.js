var topic5 = angular.module("topic5", ['ngRoute']);

//---------------------TEMPLATE-CACHE------------------------
topic5.run(function($templateCache) {
	$templateCache.put('addTrack.html', '<div ng-controller="addNewTrackController"><h1>Add New Track</h1><label>Title: </label><input type="text" ng-model="newTrack.title" /></br><label>Artist: </label><input type="text" ng-model="newTrack.artist" /></br><label>Duration: </label><input type="text" ng-model="newTrack.duration" /></br><button ng-click="addNewSong()">Add Song</button></div>');
});

topic5.run(function($templateCache) {
	$templateCache.put('trackList.html', '<div ng-controller="trackController"><ul><li ng-repeat = "track in tracks"> {{ track.title }}<button ng-click="viewSongDetails()">Show Details</button></li></ul></div>');
});


topic5.run(function($templateCache) {
	$templateCache.put('trackDetails.html', '<div ng-controller="trackDetailsController"><h1>Track Details</h1><label>Title: </label>{{ track.title }}</br><label>Artist: </label>{{ track.artist }}</br><label>Duration: </label>{{ track.duration }}</br></div>');
});


//---------------------FACTORY------------------------
topic5.factory("trackFactory", function(){
	var tracks = [
		{title: "Californication", artist: "Red Hot Chili Peppers", duration:"3:20"},
		{title: "Reptilia", artist: "The Strokes", duration:"3:00"},
		{title: "Bitter End", artist: "Placebo", duration:"4:30"},
		{title: "By the Way", artist: "Red Hot Chili Peppers", duration:"3:45"}
	];

	var factory = {};

	factory.getTracks = function(){
		return tracks;
	};

	factory.addTrack = function(newTrack){
		tracks.push(newTrack)
	};

	return factory;
});


//---------------------CONTROLLERS------------------------

//what is the difference between 
//topic5.controller("trackController", function($scope, trackFactory){
// and									VVVV
//topic5.controller("trackController", ["$scope", function($scope){
topic5.controller("trackController", function($scope, trackFactory){
	
	$scope.tracks = trackFactory.getTracks();

	$scope.viewSongDetails = function(){
		

	};

});

topic5.controller("addNewTrackController", function($scope, trackFactory){

	$scope.addNewSong = function(){
		trackFactory.addTrack({
			title: $scope.newTrack.title, 
			artist: $scope.newTrack.artist, 
			duration: $scope.newTrack.duration 
		});
	};

});

topic5.controller("trackDetailsController", ["$scope", function($scope){



}]);

/*
topic5.config(function ($routeProvider){
	$routeProvider
	.when("/",
		{
			controller:"trackController",
			templateUrl: "trackList.html"
		})		
	.otherwise({
    	redirectTo: '/'
  	});

});

*/