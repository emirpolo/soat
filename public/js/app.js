(function(){
    'use strict';

    var app = angular.module('SoatApp', ['ngRoute']);

    app.config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/form.html',
                controller: 'SoatController',
                controllerAs: 'vm'
            })
            .when('/admin', {
                templateUrl: 'views/list.html',
                controller: 'AdminController',
                controllerAs: 'vm'
            })
            .otherwise({
                redirectTo: '/'
            });
    });

    app.controller('AppController', ['$scope', '$location', function($scope, $location){
        $scope.$on('$locationChangeSuccess', function(){
            $scope.isAdmin = $location.path() == '/admin';
            $scope.isLoaded = true;
        });
    }]);
})();

