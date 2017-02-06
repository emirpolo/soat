(function () {
    'use strict';

    angular.module('SoatApp').factory('SoatService', SoatService);

    SoatService.$inject = ['$http'];

    var SERVER = '/api/'

    function SoatService($http) {
        return {
            findVehicle: findVehicle,
            getAllClass: getAllClass,
            getAllSubtypes : getAllSubtypes
        }

        function findVehicle (plate) {
            return $http.get(SERVER + 'vehiculo/' + plate);
        }

        function getAllClass(){
            return $http.get(SERVER + 'tipo');
        }

        function getAllSubtypes(type) {
            return $http.get(SERVER + 'tipo/' + type + '/subtipo');
        }

    }
})();