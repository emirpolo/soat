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
            vm.wizard.index = 0;
            vm.wizard.change('START');
            if (vm.plate)
                SoatService.findVehicle(vm.plate).then(function (res) {
                    vm.vehicle = {};
                    vm.propietario = {};
                    vm.vehicle.placa = vm.plate;
                    if (res.data) {
                        vm.vehicle = res.data;
                        vm.vehicle.valor = +res.data.valor;
                        vm.vehicle.tipo = vm.class.filter(function (item) {
                            return item.tipo == res.data.tipo.tipo
                        })[0];

                        vm.propietario = res.data.propietario;
                        vm.subtype = res.data.subtipo.subtipo;
                        vm.getSubtype();
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

        vm.getNameSubtypes = function () {
            if (!vm.subtypes.length) return;
            var f = vm.subtypes.filter(function (st) {
                if (vm.isMotocarro)
                    return st.subtipo == 'MOTOCARROS';
                return vm.vehicle.valor >= st.min && vm.vehicle.valor <= st.max;
            });
            if (f.length) {
                vm.subtype = f[0].subtipo;
                vm.vehicle.subtipo = f[0];
                if (vm.isMotocarro) vm.vehicle.valor = 0;
            }
            else
                vm.subtype = '';
        }

        vm.buySoat = function () {
            var data = {};
            data.propietario = angular.copy(vm.propietario);
            data.vehiculo = angular.copy(vm.vehicle);
            data.vehiculo.tipo = data.vehiculo.tipo.id;
            data.vehiculo.subtipo = data.vehiculo.subtipo.id;

            if (data.vehiculo.active) {
                data.vehiculo.fecha_vigencia = new DateTools(data.vehiculo.fecha_vencimiento).plus1year().plus1day().toString();
                data.vehiculo.fecha_vencimiento = new DateTools(data.vehiculo.fecha_vigencia).plus1year().toString();
            }
            else {
                data.vehiculo.fecha_vigencia = new DateTools(new Date()).toString()
                data.vehiculo.fecha_vencimiento = new DateTools(data.vehiculo.fecha_vigencia).plus1year().toString();
            }

            ['propietario', 'tarifa', 'id', 'active'].forEach(function (item) {
                delete data.vehiculo[item];
            });
            delete data.propietario.id;

            SoatService.buySoat(data).then(function (res) {
                vm.vehicle = res.data;
                vm.wizard.index++;
                vm.wizard.hasPrev = false;
                vm.wizard.current = 'Compra Exitosa !!'
            });
        }

        var DateTools = function (date) {
            var day = 86400000,
                d = date.constructor.name == 'Date' ? date.getTime() : Date.parse(date),
                current = new Date(d);
            this.plus1day = function () {
                current = new Date(d + day);
                return this;
            }
            this.plus1year = function () {
                current.setFullYear(current.getFullYear() + 1);
                return this;
            }
            this.toString = function () {
                return (current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate()).replace(/-(\d)(?!\d)/g, '-0$1');
            }
            return this;
        }

        /******* WIZARD *******/
        vm.wizard = {
            options: ['Datos del Vehículo', 'Datos Personales', 'Datos de Pago', 'Finalizar'],
            index: 0,
            hasPrev: false,
            hasNext: true,
            prev: '',
            change: function (op) {
                if(op != 'START' && !vm.vehicle.placa) {
                    alert('para continuar, primero consulte su placa!');
                    $('#placa').focus();
                    return;
                }
                if (op == 'NEXT' && !validate(this.index))
                    return;
                if(op != 'START')
                    this.index += op == 'NEXT' ? 1 : -1;
                this.prev = this.index ? this.options[this.index - 1] : '';
                this.next = this.options[this.index + 1];
                this.current = this.options[this.index];
                this.hasPrev = !!this.index;
                this.hasNext = this.index != this.options.length - 1;

                if (this.index == 3) {
                    var edad = vm.vehicle.tipo.require_edad ? vm.vehicle.edad : -1;
                    SoatService.getTarifas(vm.vehicle.tipo.id, vm.vehicle.subtipo.id, edad).then(function (res) {
                        vm.tarifas = res.data;
                        vm.tarifas.fosyga = +vm.tarifas.valor_prima / 2;
                        vm.tarifas.total = +vm.tarifas.valor_prima + vm.tarifas.fosyga + +vm.tarifas.tasa_runt;
                        vm.tarifas.ages = !vm.vehicle.tipo.require_edad ? 'N/A' :
                        ( vm.tarifas.edad.hasta == 9999 ? 'Mayor de ' + vm.tarifas.edad.de :
                        'De ' + vm.tarifas.edad.de + ' a ' + vm.tarifas.edad.hasta ) + ' Años';
                    });
                }
            }
        };
        vm.wizard.next = vm.wizard.options[1];
        vm.wizard.current = vm.wizard.options[0];

        function validate(index) {
            var formName = ['vehicleForm', 'propietarioForm', 'tarjetaForm'];
            var form = $scope[formName[index]];
            form.valid = true;
            if(index == 2) {
                var d  = Date.parse(vm.tarjeta.fecha_vencimeinto);
                if(d){
                    if(d < Date.parse(new DateTools(new Date()).toString())){
                        form.$valid = false;
                        form.fecha.$invalid = true;
                        form.fecha.message = 'La fecha de vencimiento debe se mayor o igual a la fecha actual';
                    }
                }
                else{
                    form.fecha.$invalid = true;
                    form.$valid = false;
                }
            }
            return form.$valid;
        }


        /******* INIT *******/
        SoatService.getAllClass().then(function (res) {
            vm.class = res.data
        });
    }


})();