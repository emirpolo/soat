(function () {
    'use strict';

    angular.module('SoatApp').controller('AdminController', AdminController);

    AdminController.$inject = ['SoatService', 'ModalService', '$scope'];

    function AdminController(SoatService, ModalService, $scope) {
        var vm = this;

        vm.isPolizaActive = function (date) {
            var d = new Date(), t = (d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()).replace(/-(\d)(?!\d)/g, '-0$1');
            return Date.parse(date) >= Date.parse(t);
        }

        vm.seeDetail = function (id) {
            SoatService.findVehicleById(id).then(function (res) {
                vm.vehicle = res.data;
                vm.vehicle.tarifa.fosyga = vm.vehicle.tarifa.valor_prima / 2;
                vm.vehicle.tarifa.total = vm.vehicle.tarifa.valor_prima * 1.5 + +vm.vehicle.tarifa.tasa_runt;
                ModalService.alert({
                    title: 'TEST',
                    templateUrl: '../views/modal.html',
                    controller: 'AdminController',
                    controllerAS: 'vm',
                    scope: $scope
                });
            });
        }

        /******* INIT *******/
        SoatService.getAllPolizas().then(function (res) {
            vm.list = res.data
        });
    }
})();