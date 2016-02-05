describe("homeController test", function(){
  
  	var $rootScope, $scope, controller;


    beforeEach(function(){
    	angular.mock.module('ui.router');
    	angular.mock.module('angularUtils.directives.dirPagination');
    	angular.mock.module('ngStorage');

    	module('project');

    	inject(function(_$rootScope_, _$controller_){
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $controller = _$controller_;
        $http = _$http_;
       	});

		controller = $controller("homeController", {$scope: $scope, $http: $http, trackService: trackService});
    });

	it("Expect something", function(){
		expect(-----).toBe(-----);
	});

});