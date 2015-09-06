angular.module('myDirective').directive('myIsolatedScope', function () {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            customers: '=',
            action: '&'
        },
        controller: function ($scope) {
            var counter = 0;
            $scope.addMyCustomer = function () {

                counter++;
                $scope.customers.push({
                    name: 'My New Customer' + counter,
                    street: counter + ' Tran Phu'
                });

            };
        },
        templateUrl: 'template/mydirective_tpl.html'
    };
});