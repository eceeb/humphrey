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
		when('/about', {                                            
			activeTab: 'about',                                
        }).
		otherwise({
			activeTab: 'home',
		});
});

