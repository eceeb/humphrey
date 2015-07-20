module.controller('historyController', function($scope, $http) {

	$scope.searches;
	$scope.selectedSearch;
	
	var rollback = {}; // TODO: can be done more elegant? // slice or iterate
	
	$http.get('/api/v1/getSearches')
	    .success(function(data) {
	        $scope.searches = data;
	    })
	    .error(function(error) {});

	$scope.updateSearch = function() {
	    $http.post('/api/v1/updateSearch', $scope.selectedSearch)
	        // TODO: show result for user
	        .success(function(data) {
	        })
	}

	$scope.select = function(index) {
	    $scope.selectedSearch = $scope.searches[index];
	    rollback.url      = $scope.selectedSearch.url;
	    rollback.seek     = $scope.selectedSearch.seek;
	    rollback.found    = $scope.selectedSearch.found;
	    rollback.email    = $scope.selectedSearch.email;
	    rollback.interval = $scope.selectedSearch.interval;
	}

	$scope.getSelect = function() {
	    return $scope.selectedSearch;
	}

	$scope.dismiss = function() {
	    $scope.selectedSearch.url      = rollback.url;
	    $scope.selectedSearch.seek     = rollback.seek;
	    $scope.selectedSearch.email    = rollback.email;
	    $scope.selectedSearch.found    = rollback.found;
	    $scope.selectedSearch.interval = rollback.interval;
	}
});