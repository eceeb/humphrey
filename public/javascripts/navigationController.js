module.controller('navigationController', function($scope, $route) {
	
	$scope.$route = $route;
	
	var pageContent = 'searchForm';
	
	// TODO: consider just a setter
	$scope.$on("userLoggedIn", function(event,args) {
		pageContent = 'historyForm';
	});
	
	$scope.getContent = function() {
		return pageContent;
	}
	
	$scope.setContent = function(content) {
		pageContent = content;
	}
});
