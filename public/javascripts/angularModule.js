// TODO: http://stackoverflow.com/questions/24316355/multiple-controllers-with-angularjs-in-single-page-app
var module = angular.module('myapp', ['ngRoute']);

module.config(function($routeProvider, $locationProvider) {
		$routeProvider.                                                              
		when('/login', {                                            
			activeTab: 'login',                                
        }).
		when('/history', {                                            
			activeTab: 'history',                                
        }).
		otherwise({
			activeTab: 'home',
		});
});

module.run(function ($rootScope, $http, $location) {
	// Note 'home' is only loaded, because navigation controller 
	// loads initially (and reload) content for home
	$location.path( 'home' );
	$http.post('/api/v1/isUserLoggedIn')
		.success(function(data) {
			$rootScope.loggedIn = true;
		}).error(function(error) {});
});
