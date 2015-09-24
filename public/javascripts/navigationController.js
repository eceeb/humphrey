module.controller('navigationController', function($scope, $http, $route) {
	
	$scope.$route	 = $route;	// sets tab active
	var pageContent  = 'searchForm';
	
	$scope.$on("userLoggedIn", function(event, args) {
		$scope.setContent('historyForm');
	});
	
	$scope.getContent = function() {
		return pageContent;
	}
	
	$scope.setContent = function(content) {

		if(angular.equals(content, 'historyForm'))
			$http.post('/api/v1/isUserLoggedIn')
				.success(function(data) {
					pageContent = 'historyForm';
				}) // TODO: show result for user
				.error(function(error) {
					pageContent = 'loginAdvice';
				});
		else
			pageContent = content; 
	}
});