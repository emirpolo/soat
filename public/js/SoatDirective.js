(function () {
    'use strict';

    angular.module('SoatApp')
        .directive('plate', plate)
        .directive('maxLength', maxLength);

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

    function maxLength() {
        return {
            restrict : 'A',
            require : 'ngModel',
            link: function(scope, element, attrs, modelCtrl) {
                var maxlength = +(attrs.maxLength || 11);
                var fn = function(inputValue) {
                    if(inputValue !== null){
                        var val = +(inputValue + '').slice(0, maxlength);
                        if (val !== inputValue) {
                            modelCtrl.$setViewValue(val);
                            modelCtrl.$render();
                        }
                        return val;
                    }
                }
                modelCtrl.$parsers.push(fn);
                fn(scope[attrs.ngModel]);
            }
        };
    }
})();