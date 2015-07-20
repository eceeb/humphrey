module.controller('searchController', function($scope, $http) {

	var alertBadge   = 'collapse';
	var alertMessage = '';
	
    $scope.formData = {};
    $scope.formData.interval = "10";
		
	$scope.insertSearch = function() {
		
		// some clients don't allow client side validation
		var search = $scope.formData;
		if (!search.url || !search.seek || !search.email)
			return;
		
		$http.post('/api/v1/addSearch', $scope.formData)
			.success(function(data) {
				var s        = $scope.formData;
				alertBadge   = 'alert-success';
				alertMessage = 'Successfully inserted search: ' + s.seek + ' on: ' + s.url;
				$scope.formData.url  = '';
				$scope.formData.seek = '';
			})
			.error(function(error) {
				alertBadge   = 'alert-danger';
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