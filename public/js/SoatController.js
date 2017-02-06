(function () {
    'use strict';

    angular.module('SoatApp').controller('SoatController', SoatController);

    SoatController.$inject = ['SoatService'];

    function SoatController(SoatService) {
        var vm = this;
        vm.vehicle = {};
        vm.wizard = {
            options : ['Datos del Vehículo', 'Datos Personales', 'Datos de Pago', 'Finalizar'],
            index : 0,
            hasPrev : false,
            hasNext : true,
            prev : '',
            change : function(op) {
               this.index += op == 'NEXT' ? 1 : -1;
               this.prev = this.index ? this.options[this.index - 1] : '';
               this.next = this.options[this.index + 1];
               this.current = this.options[this.index];
               this.hasPrev = !!this.index;
               this.hasNext = this.index != this.options.length - 1;
            }
        };
        vm.wizard.next = vm.wizard.options[1];
        vm.wizard.current = vm.wizard.options[0];

        vm.searchVehicle = function() {
            vm.vehicle.placa = vm.plate;
        }

        vm.getClassSufix = function () {
            return vm.vehicle.tipo && ({
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