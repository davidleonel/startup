var project=angular.module("project", ['ui.router', 'angularUtils.directives.dirPagination']);

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

	.state("home.loginCallback",{
		url: "/loginCallback",
		templateUrl:"partials/loginCallback.html",
		controller:"homeController"
	});

	$urlRouterProvider.otherwise("/");
	
});


//---------------------CONTROLLERS------------------------
project.controller("homeController", function($scope, $http, $log){
	
	//--------------LOGIN USING OAUTH------------------------
	$scope.login = function(callback) {
		OAuth.initialize('z3ycEkszMlMUbJVTEA9BSNjJrao');
		OAuth.popup('spotify').done(function(result) {
			//RESULTS from the Oauth
		    console.log(result);
		    $scope.access_token = result.access_token;
		    //TO GET ALL THE INFO OF THE USER
		    result.me().done(function(data) {
		    	//Data = info from the User
		    	console.log(data);
		    	$scope.userId = data.id;

			}).redirect('/');    
		});

		var spotify = OAuth.create('spotify');
		//`spotify` is a request object.
		//`spotify` can be `null` if the request object has not been created yet

	};


	//-----------------SEARCH FOR SONGS----------------------

	//FALTA SABER COMO MANDARL LA VARIABLE EN EL STRING VVV
	var config = {
        headers: {'Authorization': 'Bearer ' + $scope.access_token +'' }
		};

	$scope.search = function(){
		$http.get("https://api.spotify.com/v1/search?q=" + $scope.toSearch + "&type=track").then(function(response) {
	        $scope.searchResult = response.data;
	        console.log(response);
	        if(response.data){	
	        	$scope.searchResults = response.data.tracks.items;
	        	console.log($scope.searchResults);

	                // var len = response.data.tracks.items.length;
	                // if(len > 0){
	                //     for(var i=0;i<len;i++){	      
	                //         $(".tracks").append('<li class="list-group-item"><div class="row"><div class="col-lg-6"><div class="input-group"<span class="input-group-addon"><input type="checkbox"></span> Track Name: '+response.data.tracks.items[i].name+'</div></div></div></li>');
	                //     }
	                // }
	              //$('.tracks').fadeIn("slow");
            };

	    });

	};
	
	//------------ADD SELECTED SONGS TO NEW ARRAY------------
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


	//-----------------USED FOR PAGINATION-----------------
	$scope.totalItems = 64;
	$scope.currentPage = 4;

	$scope.setPage = function (pageNo) {
	$scope.currentPage = pageNo;
	};

	$scope.pageChanged = function() {
	  $log.log('Page changed to: ' + $scope.currentPage);
	};

	$scope.maxSize = 5;
	$scope.bigTotalItems = 175;
	$scope.bigCurrentPage = 1;



	//-----------------CREATE PLAYLIST-----------------
	//ACA SE VAN A USER newPlaylistName y trackPrivacy que las saco de la vista con ng-model

	var newPlaylistConfig = {
			data: {'name': $scope.newPlaylistName,
					'public': $scope.trackPrivacy},
        	headers: {'Authorization': 'Bearer ' + $scope.access_token +'',
        				'Content-Type': 'application/json' }
		};
	$scope.createNewPlaylist = function(){
		$http.post("https://api.spotify.com/v1/users/" + $scope.userId + "/playlists",newPlaylistConfig).then(function(response) {
	        console.log(response);
		});
	};	

	//-------------ADD TRACK TO PLAYLIST----------------
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

});

project.controller("loginCallbackController", function($scope, $http, $log){
	res.redirect('/');
});