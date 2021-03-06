module.controller('historyController', function($scope, $http) {

	$scope.searches;
	$scope.selectedSearch;
	
	var searchIndex;
	var rollback = {};
	
	$http.get('/api/v1/getSearches')
	    .success(function(data) {
	        $scope.searches = data;
	    })
	    .error(function(error) {});

	$scope.editSearch = function() {
		if($scope.selectedSearch.remove)
			$http.delete('/api/v1/removeSearch/' +  $scope.selectedSearch._id)
	        .success(function(data) {
	        	$scope.searches.splice(searchIndex, 1);
	        })
	    else    
	    	$http.put('/api/v1/updateSearch', $scope.selectedSearch)
	        // TODO: show result for user
	        .success(function(data) {
	        })
	}

	$scope.select = function(index) {
		searchIndex = index;
	    $scope.selectedSearch = $scope.searches[index];
	    angular.copy($scope.selectedSearch, rollback);
	}

	$scope.getSelect = function() {
	    return $scope.selectedSearch;
	}

	$scope.dismiss = function() {
		angular.copy(rollback, $scope.selectedSearch);
	}
});