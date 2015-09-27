module.controller('navigationController', function($scope, $http, $route) {
	
	$scope.$route	 = $route;	// sets tab active
	var pageContent  = 'searchForm';
	
	$scope.$on("userLoggedIn", function(event, args) {
		$scope.loggedIn = true;
		$scope.setContent('historyForm');
	});
	
	$scope.getContent = function() {
		return pageContent;
	}
	
	$scope.setContent = function(content) {
		if(angular.equals(content, 'historyForm'))
			pageContent = $scope.loggedIn ? 'historyForm' : 'loginAdvice';
		else
			pageContent = content; 
	}

	$scope.isUserLoggedIn = function() {
		return $scope.loggedIn;
	}

	$scope.loggOut = function() {
		$scope.loggedIn = null;
		$http.post('/api/v1/loggOut', $scope.formData)
			.success(function(data) {
				$scope.setContent('searchForm');
			})
			.error(function(error) {
				console.log(error)
			});
	}
});