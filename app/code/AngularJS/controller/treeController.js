(function (angular) {
    'use strict';
    angular
        .module('treeApp', ['com.tientm.tree'])
        .controller('treeController', ['$scope', function ($scope) {
            $scope.fetchTreeData = function(){
                return fetchTreeData();
            }
        }]);
})(window.angular);