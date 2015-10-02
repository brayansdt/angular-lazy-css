'use strict';

angular.module('myApp.view2', ['ngRoute', 'lazyCss.module'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl',
    cssGroup: ['view2/view2.css']
  });
}])

.controller('View2Ctrl', [function() {

}]);