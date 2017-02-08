(function () {
    'use strict';

    angular.module('SoatApp')
        .factory('ModalService', ModalService)
        .factory('SoatService', SoatService);

    SoatService.$inject = ['$http'];

    var SERVER = '/api/'

    function SoatService($http) {
        return {
            findVehicle: findVehicle,
            getAllClass: getAllClass,
            getAllSubtypes: getAllSubtypes,
            getTarifas: getTarifas,
            buySoat: buySoat,
            getAllPolizas: getAllPolizas
        }

        function findVehicle(plate) {
            return $http.get(SERVER + 'vehiculo/' + plate);
        }

        function getAllClass() {
            return $http.get(SERVER + 'tipo');
        }

        function getAllSubtypes(type) {
            return $http.get(SERVER + 'tipo/' + type + '/subtipo');
        }

        function getTarifas(type, subtype, edad) {
            return $http.get(SERVER + 'tipo/' + type + '/subtipo/' + subtype + '/tarifas/' + edad);
        }

        function buySoat(data) {
            return $http.post(SERVER + 'vehiculo', data);
        }

        function getAllPolizas() {
            return $http.get(SERVER + 'vehiculo');
        }
    }

    function ModalService() {
        return {
            alert: alert
        }

        function alert(options) {
            var $modal = $('<div>');
            $modal.load('../views/modal.html', function(){
                $('body').append($modal);
                $modal.modal();
                $modal.find('.modal-title').text(options.title || 'Info');
                $modal.find('.modal-body').text(options.msg || 'Not Info');
                $modal.on('hidden.bs.modal', function(){
                    $modal.remove();
                });
                $modal.find('.btnClose').on('click', function(){
                    $modal.modal('hide');
                });
                $modal.find('.modal.fade').addClass('in');
            });
        }
    }
})();