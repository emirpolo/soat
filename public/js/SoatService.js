(function () {
    'use strict';

    angular.module('SoatApp')
        .factory('ModalService', ModalService)
        .factory('SoatService', SoatService);

    SoatService.$inject = ['$http'];
    ModalService.$inject = ['$compile'];

    var SERVER = '/api/'

    function SoatService($http) {
        return {
            findVehicle: findVehicle,
            getAllClass: getAllClass,
            getAllSubtypes: getAllSubtypes,
            getTarifas: getTarifas,
            buySoat: buySoat,
            getAllPolizas: getAllPolizas,
            findVehicleById: findVehicleById
        }

        function findVehicle(plate) {
            return $http.get(SERVER + 'vehiculo/' + plate);
        }

        function findVehicleById(id) {
            return $http.get(SERVER + 'vehiculo/byid/' + id);
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

    function ModalService($compile) {
        var tmpl = '<div class="modal fade show out"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><button type="button" class="close btnClose" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title"></h4></div><div class="modal-body"></div><div class="modal-footer"><button type="button" class="btn btn-default btnClose" data-dismiss="modal">Cerrar</button></div></div></div></div>';

        return {
            alert: alert
        }

        function alert(options) {
            var $modal = $(tmpl).attr('ng-controller', options.controller + (options.controllerAs ? ' as ' + options.controllerAs : ''));
            $('body').append($modal);
            $modal.modal();
            $modal.find('.modal-title').text(options.title || 'Info');

            if(options.body)
                $modal.find('.modal-body').text(options.body);
            else if(options.templateUrl)
                $.get(options.templateUrl, function(data){
                    $modal.find('.modal-body').html(data);
                    setTimeout(function () {
                        $compile($modal)(options.scope);
                    });
                });

            $modal.on('hidden.bs.modal', function () {
                $modal.remove();
            });
            $modal.find('.btnClose').on('click', function () {
                $modal.modal('hide');
            });
            $modal.addClass('in');

            return $modal
        }
    }
})();