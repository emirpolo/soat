(function () {
    'use strict';

    angular.module('SoatApp').controller('SoatController', SoatController);

    SoatController.$inject = ['SoatService'];

    function SoatController(SoatService) {
        var vm = this;

        vm.getClassSufix = function () {
            return vm.vehicle && ({
                    'CILINDRAJE': 'C.C.',
                    'TONELADAS': 'TON',
                }[vm.vehicle.tipo.clase]) || '#';
        };

        vm.setSubtype = function () {
            if (vm.vehicle && vm.vehicle.tipo.id)
                SoatService.getAllSubtypes(vm.vehicle.tipo.id).then(function (res) {
                    var f  = res.data.filter(function (st) {
                        return vm.vehicle.subtype >= st.min && vm.vehicle.subtype <= st.max;
                    });

                    if(f.length) {
                        vm.subtype = f[0].subtipo;
                        vm.vehicle.subtipo  = f[0].id;
                    }
                    else {
                        vm.subtype = '';
                        delete vm.vehicle.subtipo;
                    }

                });
        };


        /******* INIT *******/
        SoatService.getAllClass().then(function (res) {
            vm.class = res.data
        });
    }


})();