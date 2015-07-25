module.controller('navigationController', function($scope, $route) {
	
	var userLoggedIn = false;
	var pageContent  = 'searchForm';
	$scope.$route = $route;

	
	$scope.$on("userLoggedIn", function(event, args) {
		userLoggedIn = true; 
		pageContent  = 'historyForm';
	});
	
	$scope.getContent = function() {
		return pageContent;
	}
	
	$scope.setContent = function(content) {
		if (content == 'historyForm' && !userLoggedIn)
			content = 'loginAdvice';

		pageContent = content;
	}
});
