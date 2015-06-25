module.controller('historyController', function($scope, $http) {

	$scope.searches;
	$scope.selectedSearch;

	var temp = {};
	
	
	$http.get('/api/v1/getSearches')
		.success(function(data) {
			$scope.searches = data;
			console.log($scope.searches[0]._id);
		})
		.error(function(error) {});
		
	$scope.updateSearch = function() {	
		$http.post('/api/v1/updateSearch', $scope.selectedSearch)
				// TODO: show result for user
				.success(function(data) {
					console.log('update search: ' + $scope.selectedSearch);		
				})
	}	
	
	$scope.select = function (index) {
		$scope.selectedSearch = $scope.searches[index];
		temp.url = $scope.selectedSearch.url;
		temp.seek = $scope.selectedSearch.seek;
		temp.found = $scope.selectedSearch.found;
		temp.email = $scope.selectedSearch.email;
		temp.interval = $scope.selectedSearch.interval;
	}
	
	$scope.getSelect = function () {
		return $scope.selectedSearch;
	}
	
	$scope.dismiss = function () {
		$scope.selectedSearch.url = temp.url;
		$scope.selectedSearch.seek = temp.seek;
		$scope.selectedSearch.email = temp.email;
		$scope.selectedSearch.found = temp.found;
		$scope.selectedSearch.interval = temp.interval;
	}
	
});