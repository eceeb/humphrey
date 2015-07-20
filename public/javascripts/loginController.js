module.controller('loginController', function($scope, $http) {

	$scope.tryLogin = function() {
		
		$http.post('/api/v1/tryLogin', $scope.formData)
			// TODO: show result for user
			.success(function(data) {
				$scope.$emit('userLoggedIn', data);
			})
			.error(function(error) {
				console.log('error')
			});
	}
});
