describe("homeController test", function(){
  
  	var $rootScope, $scope, controller, trackService;

    beforeEach(function(){

    	angular.mock.module('ui.router');
    	angular.mock.module('angularUtils.directives.dirPagination');
    	module('project');

      inject(function(_$injector_, _$controller_, _$rootScope_, _$http_){
          trackService = _$injector_.get("trackService");
          $rootScope = _$rootScope_;
          $scope = $rootScope.$new();
          $controller = _$controller_;
          $http = _$http_;
       });

      controller = $controller("homeController", {$scope: $scope, $http: $http, trackService: trackService});
    });
    


	it("Expect variable to be defined", function(){
      expect(controller).not.toBe(undefined);
      expect($scope.showloggedIn).toBe(false);
      expect($scope.show).toBe(false);
      expect($scope.currentUserId).not.toBe(undefined);
	});

  it("Expect all methods to be defined", function(){
    expect($scope.login).not.toBe(undefined);
    expect($scope.logOut).not.toBe(undefined);
    expect($scope.search).not.toBe(undefined);
    expect($scope.getMyPlaylists).not.toBe(undefined);
      
  });

  describe("UserID is returned to the homeController", function() { 
    beforeEach(function() {
      trackService.setUserID("David");
      controller = $controller("homeController", {$scope: $scope, $http: $http, trackService: trackService});
    });
    it("Expect currentUserID from homeController to be David ", function(){
      expect($scope.currentUserId).toBe("David");
      });
      
  });

  describe("Search method does not return null if search parameter is defined ", function() { 
    beforeEach(function() {

      controller = $controller("homeController", {$scope: $scope, $http: $http, trackService: trackService});

      $scope.toSearch = "Nirvana";
    });
    it("Expect the function search to not be null", function(){
      expect($scope.search()).not.toBe(null);
      });
      
  });

});