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
	.state("home.opening",{
		url: "/opening",
		templateUrl:"partials/opening.html",
		controller:"homeController"
	})
	.state("home.userLoggedIn",{
		url: "/userLoggedIn",
		templateUrl:"partials/userLoggedIn.html",
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
		controller:"homeController"
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
	//-----------CONVERT MILISECONDS TO MINUTES-------------------------------------
	this.millisToMinutes = function(millis) {
	  var minutes = Math.floor(millis / 60000);
	  var seconds = ((millis % 60000) / 1000).toFixed(0);
	  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
	}
});

//---------------------CONTROLLERS------------------------
project.controller("homeController", ['$scope', '$http', 'trackService', function($scope, $http, trackService){
	//$scope.isloggedIn is for the login button
	//$scope.showloggedIn is for the create new playlist, view my playlist and logout buttons
	//$scope.show is for the button on the table
	$scope.isloggedIn = false;
	$scope.showloggedIn = false;
	$scope.show = false;
	$scope.currentUserId = trackService.getUserID();
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
		    	if(data){
		    		$scope.showloggedIn = true;
		    		$scope.isloggedIn = true;
		    		};
		    	if(!data){$scope.showloggedIn = false;}	
		    	$scope.$apply();    	
			});    
		});
	};
	$scope.logOut = function(){
		$scope.isloggedIn = false;
		$scope.showloggedIn = false;
	};
	//-----------------SEARCH FOR SONGS----------------------
	$scope.search = function(){
		$http.get("https://api.spotify.com/v1/search?q=" + $scope.toSearch + "&type=track&limit=50").then(function(response) {
	        $scope.searchResult = response.data;
	        console.log(response);
	        if(response.data){	
	        	$scope.searchResults = response.data.tracks.items;
	        	console.log($scope.show);
	        	$scope.show = true;
	        	//-----------TO CONVERT TO MINUTES----------
	        	var mins = "";
	        	for(var index = 0; index < $scope.searchResults.length; index++){
	        		mins = trackService.millisToMinutes($scope.searchResults[index].duration_ms);
	        		$scope.searchResults[index].duration_ms = mins;
	        	};
	        	//-----------------------------------------
            };
            if (!response.data){$scope.show = false;console.log($scope.show);};
	    });
	};	
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
        	},
		    error: function(data) {
		      console.log("ko");
		    }
	     }).done(function (data) {
	     	$scope.currentUserPlaylists = trackService.getCurrentUserPlaylists();
    		console.log($scope.currentUserPlaylists);
    		$scope.$apply();
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
			alert("New Playlist Created!");
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
        	alert("Tracks added to the new Playlist!");
  		},
	    error: function(data) {
	      alert("Error: Please check your track selection, if you wish to add the same tracks again please reselect them.");
	    }
     	}).done(function (data) {
     		tracksToPlaylist = [];
		});

	};
}]);

