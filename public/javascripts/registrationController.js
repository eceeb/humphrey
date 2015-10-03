module.controller('registrationController', function($scope, $http, $location) {

	$scope.formData     = {};
	$scope.hideBage     = true;
	$scope.alertMessage = '';

	$scope.registerUser = function() {

		var user = $scope.formData;
		if(!user.email || !user.pwd)
			return;

		if(!angular.equals(user.pwd, user.pwdRepeat)){
			$scope.hideBage     = false;
			$scope.alertMessage = 'Passwords do not match';
			return;
		}

		$http.post('/api/v1/registerUser', $scope.formData)
			// TODO: show result for user
			.success(function(data) {
				$scope.$emit('userRegistered');
				$location.path( 'home' );
			})
			.error(function(error) {
				$scope.hideBage     = false;
				$scope.alertMessage = 'Email address already registered';
				console.log(error)
			});
	}

	$scope.dismissAlert = function() {
		$scope.hideBage = true;
	}

});