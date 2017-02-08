(function () {
    'use strict';

    angular.module('SoatApp').controller('AdminController', AdminController);

    AdminController.$inject = ['SoatService', 'ModalService'];

    function AdminController(SoatService, ModalService) {
        var vm = this;

        vm.isPolizaActive = function(date) {
            var d = new Date(), t = (d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()).replace(/-(\d)(?!\d)/g, '-0$1');
            return Date.parse(date) >= Date.parse(t);
        }

        vm.seeDetail = function(id) {
            ModalService.alert({
                title: 'TEST',
                msg:'my message'
            });
        }

        /******* INIT *******/
        SoatService.getAllPolizas().then(function (res) {
            vm.list = res.data
        });
    }
})();