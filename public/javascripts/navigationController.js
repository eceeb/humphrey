module.controller('navigationController', function($scope, $route) {
	
	$scope.$route = $route;
	
	var loggedIn    = false;
	var pageContent = 'searchForm';
	
	$scope.$on("userLoggedIn", function(event,args) {
		loggedIn    = true;
		pageContent = 'historyForm';
	});
	
	$scope.getContent = function() {
		return pageContent;
	}
	
	$scope.setContent = function(content) {
		if (content == 'historyForm' && !loggedIn)
			content = 'loginForm';
			
		pageContent = content;
	}
});
