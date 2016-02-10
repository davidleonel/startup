describe("Controller test", function(){
  
  	var $rootScope, $scope, controller, trackService;

    beforeEach(function(){

    	module('topic5');

      inject(function(_$injector_, _$controller_, _$rootScope_){
          trackService = _$injector_.get("trackService");
          $rootScope = _$rootScope_;
          $scope = $rootScope.$new();
          $controller = _$controller_;
       });

      controller = $controller("trackController", {$scope: $scope, trackService: trackService});
    });
    

    // check for all the methods to be defined
	it("Expect methods to be defined", function(){
      expect($scope.viewDetail).not.toBe(undefined);
      expect($scope.editTrack).not.toBe(undefined);
      expect($scope.deleteTrack).not.toBe(undefined);
	});


  //****************trackDetailsController***********************************
  describe("trackDetailsController test", function() { 
    
    beforeEach(function() {

      controller = $controller("trackDetailsController", {$scope: $scope, trackService: trackService});

      var newTrack = {title: "Californication", 
                    artist: "Red Hot Chili Peppers", 
                    duration:"3:20"};
      
      trackService.setSelectedTrack(newTrack);
    });

    it("Expect the variable to equal to the data passed with the SET method ", function(){
      expect(trackService.getSelectedTrack()).toEqual(
        {title: "Californication", 
        artist: "Red Hot Chili Peppers", 
        duration:"3:20"});
      });
      
  });
  //***************addNewTrackController*********************************
  describe("addNewTrackController test", function() { 
    beforeEach(function() {

      controller = $controller("addNewTrackController", {$scope: $scope, trackService: trackService});

      $scope.newTrack = [];
      $scope.newTrack.title =  "Under the Bridge";
      $scope.newTrack.artist = "Red Hot Chili Peppers";
      $scope.newTrack.duration = "3:20";

      $scope.addNewTrack();

    });
    it("Expect the tracks array to contain the new track ", function(){
      expect(trackService.getTracks()).toContain(
        {title: "Under the Bridge", 
         artist: "Red Hot Chili Peppers", 
         duration:"3:20"});
      });
      
  });

   //**************editTrackController***********************************
  describe("editTrackController test", function() { 
    beforeEach(function() {

      controller = $controller("editTrackController", {$scope: $scope, trackService: trackService});

      var selectedTrack = {title: "Californication", 
                    artist: "Red Hot Chili Peppers", 
                    duration:"3:20"};
      trackService.setSelectedTrack(selectedTrack);  


      $scope.selectedTrack = trackService.getSelectedTrack();
      $scope.editedTitle = "Under the Bridge";
      $scope.editedArtist = "Red Hot Chili Peppers";
      $scope.editedDuration = "3:20";
      
      $scope.editSelectedTrack();

    });

    it("Expect the tracks data to reflect the changes ", function(){

       expect(trackService.getTracks()).toContain(
        {title: "Under the Bridge",
         artist: "Red Hot Chili Peppers",
         duration:"3:20"});

       expect(trackService.getTracks()).not.toContain(
        {title: "Californication", 
         artist: "Red Hot Chili Peppers", 
         duration:"3:20"});

      });
  });


});