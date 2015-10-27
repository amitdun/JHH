var sampleApp = angular.module('sampleApp', []);

sampleApp.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/AddNewOrder', {
            templateUrl: 'templates/add_order.html',
            controller: 'AddOrderController'
        }).
        when('/ShowOrders', {
            templateUrl: 'templates/show_orders.html',
            controller: 'ShowOrdersController'
        }).
        otherwise({
            redirectTo: '/AddNewOrder'
        });
  }]);

sampleApp.controller('ShowOrderController', function($scope, $routeParams) {
 
    $scope.order_id = $routeParams.orderId;
 
});
sampleApp.controller('AddOrderController', function ($scope) {

    $scope.message = 'This is Add new order screen';

});