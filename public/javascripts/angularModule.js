// TODO: http://stackoverflow.com/questions/24316355/multiple-controllers-with-angularjs-in-single-page-app
var module = angular.module('myapp', ['ngRoute']);

module.config(function($routeProvider, $locationProvider) {
		$routeProvider.                                                              
		when('/login', {                                            
        	templateUrl: "#/index",                                               
         	controller:'navigationController',
			activeTab: 'login',                                
        }).
		when('/history', {                                            
        	templateUrl: "#/index",                                               
         	controller:'navigationController',
			activeTab: 'history',                                
        }).
		when('/about', {                                            
        	templateUrl: "#/index",                                               
         	controller:'navigationController',
			activeTab: 'about',                                
        }).
		otherwise({
			templateUrl: "#/index", 
			//controller:'navigationController',
			activeTab: 'index',
		});
		
});

