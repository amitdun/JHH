var app;
app = angular.module('EmployeeModule', ['ngRoute', 'ng-bootstrap-datepicker'])
.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
    .when('/List', {
        
        templateUrl: '/Templates/List.html'
    })
    .when('/Add', {
        templateUrl: '/Templates/Add.html'
    })
    .otherwise({
        templateUrl: '/Templates/home.html'
    });

}]);