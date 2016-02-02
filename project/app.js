var project=angular.module("project", ['ui.router', 'angularUtils.directives.dirPagination', 'ngStorage']);

OAuth.initialize('z3ycEkszMlMUbJVTEA9BSNjJrao');
//---------------------VIEWS USING UI-ROUTER------------------------

project.config(function ($urlRouterProvider,$stateProvider){
	$stateProvider
	//this is the view that is going to appear when you first open up the page
	.state("home",{
		url: "/",
		templateUrl:"partials/home.html",
		controller:"homeController"
	})

	.state("home.listResults",{
		url: "/listResults",
		templateUrl:"partials/listResults.html",
		controller:"homeController"
	})

	.state("home.createNewPlaylist.listForPlaylistResults",{
		url: "/listForPlaylistResults",
		templateUrl:"partials/listForPlaylistResults.html",
		controller:"homeController"
	})

	.state("home.createNewPlaylist",{
		url: "/createNewPlaylist",
		templateUrl:"partials/createNewPlaylist.html",
		controller:"homeController"
	});

	$urlRouterProvider.otherwise("/");
	
});

//---------------------SERVICE------------------------
project.service("trackService", function(){
	
	//-------------------------------------------
	var accessToken = "";
	this.setAccessToken = function(token){
		accessToken = token;
	};
	this.getAccessToken = function(){
		return accessToken;
	};

	//-------------------------------------------
	var userId = "";
	this.setUserID = function(id){
		userId = id;
	};
	this.getUserID = function(){
		return userId;
	};
	//-------------------------------------------
	var newPlaylistName = "";
	this.setNewPlaylistName = function(newName){
		newPlaylistName = newName;
	};
	this.getNewPlaylistName = function(){
		return newPlaylistName;
	};


});
//---------------------CONTROLLERS------------------------
project.controller("homeController", function($scope, $http, $log, $localStorage, trackService){

	//--------------LOGIN USING OAUTH------------------------
	$scope.login = function(callback) {

		OAuth.popup('spotify').done(function(result) {
			//RESULTS from the Oauth
		    console.log(result);

		    trackService.setAccessToken(result.access_token);

		    //TO GET ALL THE INFO OF THE USER
		    result.me().done(function(data) {
		    	//Data = info from the User
		    	console.log(data);
		    	trackService.setUserID(data.id);
			});    
		});

		var spotify = OAuth.create('spotify');
		//`spotify` is a request object.
		//`spotify` can be `null` if the request object has not been created yet
	};



	//-----------------SEARCH FOR SONGS----------------------

	//FALTA SABER COMO MANDARL LA VARIABLE EN EL STRING VVV
	$scope.search = function(){
		$http.get("https://api.spotify.com/v1/search?q=" + $scope.toSearch + "&type=track&limit=50").then(function(response) {
	        $scope.searchResult = response.data;
	        console.log(response);
	        if(response.data){	
	        	$scope.searchResults = response.data.tracks.items;
	        	console.log($scope.searchResults);
            };

	    });
	};
	


	//------------ADD SELECTED SONGS TO NEW ARRAY TO CREATE THE NEW PLAYLIST------------
	var tracksToPlaylist = [];
	//this method is called on everytime the state of the checkbox in changed
	$scope.selectTrack = function(track){
		//here it checkes if the checkbox value is true then the track is added to the list
		if(track.selected == true){
			tracksToPlaylist.push(track);
		};
		//here it checks if the value of the checkbox is false then the track is eliminated from the list
		if (track.selected == false) {
			for (var index = 0; index < tracksToPlaylist.length; index++) {
				if (tracksToPlaylist[index] == track) {
					tracksToPlaylist.splice(index, 1);
				};				
			};
		};
		console.log(tracksToPlaylist);
	};


	//-----------------CREATE PLAYLIST-----------------
	//ACA SE VAN A USER newPlaylistName y trackPrivacy que las saco de la vista con ng-model
 	
	$scope.createNewPlaylist = function(){

		if($scope.trackLocal == true){
			$localStorage.localPlaylist = [];
			$localStorage.localPlaylist.name = $scope.newPlaylistName;
			$localStorage.localPlaylist.public = $scope.trackPrivacy;

			console.log($localStorage.localPlaylist);

		};

		if ($scope.trackLocal == false) {

			var auth = "Bearer " + trackService.getAccessToken();
	 		var newPlaylistConfig = {
				data: {"name": $scope.newPlaylistName,
						"public": $scope.trackPrivacy},
	        	headers: {"Authorization": auth,
	        				"Content-Type": "application/json"  }
			};

			$http.post("https://api.spotify.com/v1/users/" + trackService.getUserID() + "/playlists", newPlaylistConfig).then(function(response) {
				console.log("IT WORKED!!")
			});
		};
	};	

	//-------------ADD TRACK TO PLAYLIST----------------

	$scope.addTracksToPlaylist = function(){
		if ($scope.trackLocal == true) {
			$localStorage.localPlaylist.trackList = tracksToPlaylist;
			console.log($localStorage.localPlaylist);
		};
	//se va a usar la lista de tracks seleccionadas tracksToPlaylist
	// $scope.addTracksToPlaylist = function(){
	// 	$http.post("https://api.spotify.com/v1/users/{user_id}/playlists/{playlist_id}/tracks").then(function(response) {
	//         $scope.myWelcome = response.data;
	// 	});
	// };


	// $scope.addSongsToPlaylist = function (){
	// 	$( "li" ).each(function() {
	// 		//var songToAdd = {name: , artist:};
	// 		if (document.getelementsbyclassname('selected').checked ) {
	// 			alert("checked");
	// 		};
				
	// 	});
	// };
	};
});

project.controller("loginCallbackController", function($scope, $http, $log){
	res.redirect('/');
});