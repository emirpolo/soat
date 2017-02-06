(function () {
    'use strict';

    angular.module('SoatApp').directive('plate', plate);

    function plate() {
        return {
            restrict : 'A',
            require : 'ngModel',
            link: function(scope, element, attrs, modelCtrl) {
                var capitalize = function(inputValue) {
                    var capitalized = (inputValue || '').toUpperCase().replace(/\W|_/g,'');
                    if (capitalized !== inputValue) {
                        modelCtrl.$setViewValue(capitalized);
                        modelCtrl.$render();
                    }
                    return capitalized;
                }
                modelCtrl.$parsers.push(capitalize);
                capitalize(scope[attrs.ngModel]); // capitalize initial value
            }
        };
    }
})();