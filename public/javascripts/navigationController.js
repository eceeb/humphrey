module.controller('navigationController', function($scope, $route) {
	
	$scope.$route = $route;
	console.log($scope.$route);
	var loggedIn = false;
	var pageContent = 'searchForm';
	
	$scope.$on("userLoggedIn", function(event,args) {
		loggedIn = true;
		pageContent = 'historyForm';
	});
	
	$scope.getContent = function() {
		return pageContent;
	}
	
	$scope.setContent = function(content) {
		console.log(content + " :" + loggedIn)
		if (content == 'historyForm' && !loggedIn)
			content = 'loginForm';
		pageContent = content;
	}
});
