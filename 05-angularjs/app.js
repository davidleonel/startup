var topic5 = angular.module("topic5", []);

topic5.controller("trackController", ["$scope", function($scope){
	$scope.tracks = [
		{title: "Californication", artist: "Red Hot", duration:"3:20"},
		{title: "Reptilia", artist: "The Strokes", duration:"3:00"},
		{title: "Bitter End", artist: "Placebo", duration:"4:30"},
		{title: "By the Way", artist: "Red Hot", duration:"3:45"}
	];
}]);
/*
topic5.controller("trackDetailController", function($scope){
	$scope.details={};
}):

topic5.controller("trackAbmController", function($scope){

});*/