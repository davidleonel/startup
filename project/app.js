var project=angular.module("project", ['ui.router', 'angularUtils.directives.dirPagination', 'ngStorage']);

OAuth.initialize('z3ycEkszMlMUbJVTEA9BSNjJrao');
//---------------------VIEWS USING UI-ROUTER------------------------
project.config(function ($urlRouterProvider,$stateProvider){
	$stateProvider
	//this is the view that is going to appear when you first open up the page
	//and dependeing on the links that you click on within the home page 
	//the other views will open
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
	.state("home.createNewPlaylist",{
		url: "/createNewPlaylist",
		templateUrl:"partials/createNewPlaylist.html",
		controller:"createPlaylistController"
	})
	.state("home.createNewPlaylist.listForPlaylistResults",{
		url: "/listForPlaylistResults",
		templateUrl:"partials/listForPlaylistResults.html",
		controller:"homeController"
	})
	.state("home.viewMyPlaylists",{
		url: "/viewMyPlaylists",
		templateUrl:"partials/viewMyPlaylists.html",
		controller:"viewMyPlaylistsController"
	});
	$urlRouterProvider.otherwise("/");
});

//---------------------SERVICE------------------------
project.service("trackService", function(){
	//-----------ACCESS TOKEN-----------------------------------------------
	var accessToken = "";
	this.setAccessToken = function(token){
		accessToken = token;
	};
	this.getAccessToken = function(){
		return accessToken;
	};
	//-----------CURRENT USERS ID-------------------------------------------
	var userId = "";
	this.setUserID = function(id){
		userId = id;
	};
	this.getUserID = function(){
		return userId;
	};
	//-----------CURRENT USER OBJECT----------------------------------------
	var currentUser = [];
	this.setUser = function(user){
		currentUser = user;
	};
	this.getUser = function(){
		return currentUser;
	};
	//-----------USED TO SEE IF THE USER IS LOGGED IN OR NOT-----------------
	var loggedIn = false;
	this.setLoggedIn = function(logged){
		loggedIn = logged;
	};
	this.getLoggedIn = function(){
		return loggedIn;
	};
	//-----------THE NAME OF THE NEW PLAYLIST THAT IS ABOUT TO BE CREATED----
	var newPlaylistName = "";
	this.setNewPlaylistName = function(newName){
		newPlaylistName = newName;
	};
	this.getNewPlaylistName = function(){
		return newPlaylistName;
	};
	//----------THE CURRENT USERS PLAYLIST-----------------------------------
	var currentUserPlaylists = [];
	this.setCurrentUserPlaylists = function(playlists){
		currentUserPlaylists = playlists;
	};
	this.getCurrentUserPlaylists = function(){
		return currentUserPlaylists;
	};
	//-----------THE NEW PLAYLIST OBJECT-------------------------------------
	var newPlaylist = [];
	this.setNewPlaylist = function(playlist){
		newPlaylist = playlist;
	};
	this.getNewPlaylist = function(){
		return newPlaylist;
	};
});

//---------------------CONTROLLERS------------------------
project.controller("homeController", ['$scope', '$http', 'trackService', function($scope, $http, trackService){
	$scope.showloggedIn = false;
	//--------------LOGIN USING OAUTH------------------------
	$scope.login = function() {

		OAuth.popup('spotify').done(function(result) {
			//RESULTS from the Oauth
		    console.log(result);
		    trackService.setAccessToken(result.access_token);
		    //TO GET ALL THE INFO OF THE USER
		    result.me().done(function(data) {
		    	//Data = info from the User
		    	console.log(data);
		    	trackService.setUserID(data.id);
		    	trackService.setUser(data);
		    	if(data){$scope.showloggedIn = true;};
		    	if(!data){$scope.showloggedIn = false;}	    	
			});    
		});

	};

	// $scope.isLoggedIn = function(id){
	// 	console.log("checkea");
	// 	if (id != "") {
	// 		trackService.setLoggedIn(true);
	// 		$scope.loggedIn = trackService.getLoggedIn();
	// 		console.log($scope.loggedIn);

	// 	};
	// };

	$scope.logOut = function(){
		// var user = trackService.getUser();
		// user.logout().done(function() {
		//    //todo when logout
		// });
	};
	//-----------------SEARCH FOR SONGS----------------------
	$scope.show = false;
	$scope.search = function(){
		$http.get("https://api.spotify.com/v1/search?q=" + $scope.toSearch + "&type=track&limit=50").then(function(response) {
	        $scope.searchResult = response.data;
	        console.log(response);
	        if(response.data){	
	        	$scope.searchResults = response.data.tracks.items;
	        	console.log($scope.searchResults);
	        	$scope.show = true;
            };
            if (!response.data){$scope.show = false;};

	    });
	};	
}]);

project.controller("createPlaylistController", ['$scope', '$http', '$localStorage', 'trackService', function($scope, $http, $localStorage, trackService){

	var tracksToPlaylist = [];

	$scope.trackPrivacy = false;

	//-----------------CREATE PLAYLIST-----------------
	$scope.createNewPlaylist = function(){

		//*******************CREATE THE NEW PLAYLIST LOCALLY**************************
		$localStorage.localPlaylist = [];
		$localStorage.localPlaylist.name = $scope.newPlaylistName;
		$localStorage.localPlaylist.public = $scope.trackPrivacy;
		console.log($localStorage.localPlaylist);

		//*******************CREATE THE NEW PLAYLIST ON SPOTIFY**************************
		$.ajax({
        url: "https://api.spotify.com/v1/users/" + trackService.getUserID() + "/playlists",
        data: JSON.stringify({
             'name': $scope.newPlaylistName,
             'public': $scope.trackPrivacy
         }),
        dataType:'json',
        type:'post',
        headers: {
            'Authorization': 'Bearer ' + trackService.getAccessToken(),
            'Content-Type': 'application/json',
        },
        success: function(data) {
        	trackService.setNewPlaylist(data);
        	console.log(trackService.getNewPlaylist());
  		},
	    error: function(data) {
	      console.log("ko");
	    }
     	}).done(function (data) {
			console.log("DONE");
		});    
	};	


	//------------ADD SELECTED SONGS TO NEW ARRAY TO ADD TO THE NEW PLAYLIST------------

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

	//-------------ADD TRACK TO PLAYLIST----------------
	$scope.addTracksToPlaylist = function(){

		//*******************ADD THE SONGS TO THE LOCAL PLAYLIST**************************
		$localStorage.localPlaylist.trackList = tracksToPlaylist;
		console.log($localStorage.localPlaylist);

		$scope.getSelectedTracksURIS = function(tracks){
			var uriList = [];
			for (var index = 0; index < tracks.length; index++) {
					uriList.push(tracks[index].uri);
			};
			return uriList;
		};
		var uriList = $scope.getSelectedTracksURIS(tracksToPlaylist);
		console.log(uriList);

		//*******************ADD THE SONGS TO THE SPOTIFY PLAYLIST**************************
		var newPlaylist = trackService.getNewPlaylist();
		$.ajax({
        url: "https://api.spotify.com/v1/users/" + trackService.getUserID() + "/playlists/" + newPlaylist.id + "/tracks",
        data: JSON.stringify({
             'uris': uriList
         }),
        dataType:'json',
        type: 'post',
        headers: {
            'Authorization': 'Bearer ' + trackService.getAccessToken(),
            'Content-Type': 'application/json',
        },
        success: function(data) {
        	console.log("TRACKS ADDED TO THE NEW PLAYLIST");
  		},
	    error: function(data) {
	      console.log("k.o");
	    }
     	}).done(function (data) {
			console.log("DONE");
		});

	};
}]);

project.controller("viewMyPlaylistsController", ['$scope', '$http', 'trackService', function($scope, $http, trackService){
	
	//aca falta ver por que carga primero la view antes que los datos

	$scope.getMyPlaylists = function(){

	    $.ajax({
	        url: 'https://api.spotify.com/v1/me/playlists',
	        dataType:'json',
	        type: 'get',
	        headers: {
	            'Authorization': 'Bearer ' + trackService.getAccessToken(),
	            'Content-Type': 'application/json',
	        },
	        success: function(data) {
        		trackService.setCurrentUserPlaylists(data.items);
        		console.log(data);
      		},
		    error: function(data) {
		      console.log("ko");
		    }
	     }).done(function (data) {
    		$scope.currentUserPlaylists = trackService.getCurrentUserPlaylists();
    		console.log($scope.currentUserPlaylists);
    	});    
	};
}]);