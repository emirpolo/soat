(function () {
    'use strict';

    angular.module('SoatApp').controller('SoatController', SoatController);

    SoatController.$inject = ['SoatService', '$scope'];

    function SoatController(SoatService, $scope) {
        var vm = this;
        vm.vehicle = {};
        vm.propietario = {};
        vm.subtypes = [];

        vm.searchVehicle = function () {
            if (vm.plate)
                SoatService.findVehicle(vm.plate).then(function (res) {
                    vm.vehicle = {};
                    vm.vehicle.placa = vm.plate;
                    if (res.data) {
                        vm.vehicle = res.data;
                        vm.vehicle.valor = +res.data.valor;
                        vm.subtype = res.data.subtipo.subtipo;
                        vm.vehicle.tipo = vm.class.filter(function (item) {
                            return item.tipo == res.data.tipo.tipo
                        })[0];

                        vm.propietario = res.data.propietario;
                    }
                });
        };

        vm.getClassSufix = function () {
            return vm.vehicle.tipo && ({
                    'CILINDRAJE': 'C.C.',
                    'TONELADAS': 'TON',
                }[vm.vehicle.tipo.clase]) || '#';
        };

        vm.getSubtype = function () {
            if (vm.vehicle && vm.vehicle.tipo.id)
                SoatService.getAllSubtypes(vm.vehicle.tipo.id).then(function (res) {
                    vm.subtypes = res.data;
                    vm.getNameSubtypes();
                });
        };

        vm.getNameSubtypes = function() {
            var f =  vm.subtypes.filter(function (st) {
                console.debug(vm.vehicle.valor, st.min, st.max);
                return vm.vehicle.valor >= st.min && vm.vehicle.valor <= st.max;
            });
            if (f.length) {
                vm.subtype = f[0].subtipo;
                vm.vehicle.subtipo = f[0];
            }
            else {
                vm.subtype = '';
                delete vm.vehicle.subtipo;
            }
        }

        $scope.$watch('vm.vehicle.valor', function(){
            vm.getNameSubtypes();
        });

        /******* WIZARD *******/
        vm.wizard = {
            options: ['Datos del Vehículo', 'Datos Personales', 'Datos de Pago', 'Finalizar'],
            index: 0,
            hasPrev: false,
            hasNext: true,
            prev: '',
            change: function (op) {
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

        /******* INIT *******/
        SoatService.getAllClass().then(function (res) {
            vm.class = res.data
        });
    }


})();