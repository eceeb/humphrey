angular.module('search', [])

.controller('searchController', function($scope, $http) {

    $scope.formData = {};
    $scope.todoData = {};
    $scope.formData.interval = 10;
	var alertBadge = 'collapse';
	var alertMessage = '';
		
	// Create a new search entry
	$scope.insertSearch = function(todoID) {
	
		// some clients don't allow client side validation
		var search = $scope.formData;
		if (!search.url || !search.seek || !search.email)
			return;
		
		$http.post('/api/v1/todos', $scope.formData)
			.success(function(data) {
				var s = $scope.formData;
				alertMessage = 'Successfully inserted search: ' + s.seek + ' on: ' + s.url;
				alertBadge  = 'alert-success';
				$scope.formData.url = '';
				$scope.formData.seek = '';
				$scope.todoData = data;
				console.log(data);
			})
			.error(function(error) {
				alertBadge  = 'alert-danger';
				alertMessage = 'Sorry something went wrong please try again';
		});
	};
	
	$scope.getAlertBadge = function() {
		return alertBadge;
	}
	
	$scope.getAlertMessage = function() {
		return alertMessage;
	}

});
