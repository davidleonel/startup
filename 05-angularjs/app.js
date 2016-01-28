var topic5 = angular.module("topic5", ['ui.router']);


//---------------------VIEWS USING UI-ROUTER------------------------

topic5.config(function ($urlRouterProvider,$stateProvider){
	$stateProvider
	
	.state("home",{
		url: "/",
		templateUrl:"partials/trackList.html",
		controller:"trackController"
	})

	.state("home.trackDetails",{
		url: "/trackDetails",
		templateUrl:"partials/trackDetails.html",
		controller:"trackDetailsController"
	})

	.state("home.addTrack",{
		url: "/addTrack",
		templateUrl: "partials/addTrack.html",
		controller:"addNewTrackController"
	})

	.state("home.editTrack",{
		url: "/editTrack",
		templateUrl:"partials/editSelectedTrack.html",
		controller:"editTrackController"
	});

	$urlRouterProvider.otherwise("/");
	
});


//---------------------FACTORY------------------------
//topic5.service("trackService", function(){
topic5.factory("trackFactory", function(){
	var tracks = [
		{title: "Californication", artist: "Red Hot Chili Peppers", duration:"3:20"},
		{title: "Reptilia", artist: "The Strokes", duration:"3:00"},
		{title: "Bitter End", artist: "Placebo", duration:"4:30"},
		{title: "By the Way", artist: "Red Hot Chili Peppers", duration:"3:45"}
	];

	var factory = {};
	var sTrack= null;
	
	factory.getTracks = function(){
		return tracks;
	};

	factory.addTrack = function(newTrack){
		tracks.push(newTrack)
	};
	factory.deleteTrack = function(selectedTrack){
		for(var i =0; i < tracks.length; i++) {
    		if(tracks[i] === selectedTrack) {
       			tracks.splice(i, 1);
    		}
		}
	};

	//selectedTrack is the track that the user wishes to edit
	//editedTrack is the new info
	factory.editTrack = function(selectedTrack, editedTrack){
		
		for(var i =0; i < tracks.length; i++) {
    		if(tracks[i] === selectedTrack) {
       			tracks.splice(i, 1, editedTrack);
    		}
		}

		tracks.push(selectedTrack)
	};

	//these two method are for passing the selected track, for viewing details
	factory.setSelectedTrack = function(selectedTrack){
		sTrack = selectedTrack;
	};
	factory.getSelectedTrack = function(){
		return sTrack;
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

	$scope.viewDetail = function (selectedTrack){
		trackFactory.setSelectedTrack(selectedTrack);
	};
	$scope.editTrack = function(selectedTrack){
		trackFactory.setSelectedTrack(selectedTrack);
	};
	$scope.deleteTrack = function(selectedTrack){
		trackFactory.deleteTrack(selectedTrack);
	};

});

topic5.controller("trackDetailsController", function($scope, trackFactory){
	
	$scope.selectedTrack = trackFactory.getSelectedTrack();

});

topic5.controller("addNewTrackController", function($scope, trackFactory){

	$scope.addNewTrack = function(){
		trackFactory.addTrack({
			title: $scope.newTrack.title, 
			artist: $scope.newTrack.artist, 
			duration: $scope.newTrack.duration 
		});
	};

});

topic5.controller("editTrackController", function($scope, trackFactory){

	$scope.selectedTrack = trackFactory.getSelectedTrack();
	
	$scope.editSelectedTrack = function(){
		trackFactory.editTrack($scope.selectedTrack,{
			title: $scope.editedTitle, 
			artist: $scope.editedArtist, 
			duration: $scope.editedDuration
		});
	trackFactory.deleteTrack($scope.selectedTrack);

		$scope.editedTitle=""; 
		$scope.editedArtist=""; 
		$scope.editedDuration="";
	};
});



/*
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


HTML
    <div ng-include=" 'addTrack.html' "></div>
  	<div ng-include=" 'trackList.html' "></div>
    <div ng-include=" 'trackDetails.html' "></div>

*/