var project=angular.module("project", ['ui.router']);


//---------------------VIEWS USING UI-ROUTER------------------------

project.config(function ($urlRouterProvider,$stateProvider){
	$stateProvider
	//this is the view that is going to appear when you first open up the page
	.state("home",{
		url: "/",
		templateUrl:"partials/home.html",
		controller:"homeController"
	})

	.state("home.createPlaylist",{
		url: "/createPlaylist",
		templateUrl:"partials/createPlaylist.html",
		controller:"createPlaylistController"
	})

	.state("home.addTrack",{
		url: "/addTrack",
		templateUrl: "partials/addTrack.html",
		controller:"addNewTrackController"
	})

	.state("home.editTrack",{
		url: "/trackDetails",
		templateUrl:"partials/editTrack.html",
		controller:"trackList"
	});

	$urlRouterProvider.otherwise("/");
	

});

//---------------------FACTORY------------------------
project.factory("trackFactory", function(){
	var tracks = {};

	var factory = {};
	var sTrack= null;

	factory.getResults = function(artistToSearch){
		$('li').fadeOut("slow", function(){$(this).remove();});
		var searchType = "track";
		$.ajax({
			url: "https://api.spotify.com/v1/search",			
			data: {q: artistToSearch, type: searchType},
			success: function(result){
				console.log(result);

				if(result){	
	                var len = result.tracks.items.length;
	                if(len > 0){
	                    for(var i=0;i<len;i++){
	                        $(".tracks").append("<li> <input type='checkbox' name='track' value=''>Track Name: "+result.tracks.items[i].name+"</br>Duration: "+result.tracks.items[i].duration_ms+"</li>");
	                    }
	                }
	                $('.tracks').fadeIn("slow");
            	}
			},
			error: function(){
				$(".answer").html("ERROR!!!");

			},

		});

		return searchResult;
	};

	factory.addTrackToPlaylist = function(newTrack){
		tracks.push(newTrack)
	};


	/*
	factory.deleteTrack = function(selectedTrack){
		for(var i =0; i < tracks.length; i++) {
    		if(tracks[i] === selectedTrack) {
       			tracks.splice(i, 1);
    		}
		}
	};
	factory.editTrack = function(selectedTrack){
		tracks.push(newTrack)
	};
	factory.setSelectedTrack = function(selectedTrack){
		sTrack = selectedTrack
	};
	factory.getSelectedTrack = function(){
		return sTrack;
	};
*/
	return factory;
});


//---------------------CONTROLLERS------------------------
project.controller("homeController", function($scope, trackFactory){

	$scope.search = function (artistToSearch){
		trackFactory.getResults(artistToSearch);
	};


	//$scope.searchResult = trackFactory.getResults(search);


	/*
	$scope.editTrack = function(selectedTrack){
		trackFactory.editTrack({
			title: $scope.newTrack.title, 
			artist: $scope.newTrack.artist, 
			duration: $scope.newTrack.duration 
		});
	};
	$scope.deleteTrack = function(selectedTrack){
		trackFactory.deleteTrack(selectedTrack);
	};
	*/
});

project.controller("createPlaylistController", function($scope, trackFactory){
/*
	$scope.search = function (artistToSearch){
		trackFactory.getResults(artistToSearch);
	};


	//$scope.searchResult = trackFactory.getResults(search);


	/*
	$scope.editTrack = function(selectedTrack){
		trackFactory.editTrack({
			title: $scope.newTrack.title, 
			artist: $scope.newTrack.artist, 
			duration: $scope.newTrack.duration 
		});
	};
	$scope.deleteTrack = function(selectedTrack){
		trackFactory.deleteTrack(selectedTrack);
	};
	*/
});