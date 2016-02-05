describe("homeController test", function(){
  
  	var $rootScope, $scope, controller;


    beforeEach(function(){
    	angular.mock.module('ui.router');
    	angular.mock.module('angularUtils.directives.dirPagination');
    	angular.mock.module('ngStorage');

    	module('project');

        inject(function(_$rootScope_, _$controller_, _$http_){
            $rootScope = _$rootScope_;
            $scope = $rootScope.$new();
            $controller = _$controller_;
            $http = _$http_;
         });

        controller = $controller("homeController", {$scope: $scope, $http: $http, trackService: trackService});

    });
    


	it("Expect variable to be defined", function(){
      expect($scope.showloggedIn).toBe(false);
      expect($scope.show).toBe(false);
      //expect($scope.currentUserId).not.toBe(undefined);
	});

    // it("Expect all methods to be defined", function(){
    //   expect($scope.login).toBe(false);
    //   expect($scope.logOut).toBe(false);
    //   expect($scope.search).not.toBe(undefined);
    //   expect($scope.getMyPlaylists).not.toBe(undefined);
        
    // });

});