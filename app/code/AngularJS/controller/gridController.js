(function (angular) {
    'use strict';
    angular
        .module('docsTemplateUrlDirective', [])
        .controller('Controller', ['$scope', function ($scope) {
            $scope.col_defs = fetchColumnDefinition();
            $scope.customerList = fetchGridData();
            $scope.customerListFilter = $scope.customerList;
            $scope.filter_visible = true;
            $scope.toogleFilter = function () {
                $scope.filter_visible = !$scope.filter_visible;
            };
            $scope.filterColumn = function (filter_key, filter_field) {
                console.log(filter_key);
                console.log(filter_field);
                var temp = $scope.customerList.slice(0);
                $.each($(".grid_tool input"), function (index, object) {
                    var input = $(object);
                    var value = input.val();
                    var filter_name = input.attr("filter-name");

                    if (value.length > 0) {
                        var i = 0;
                        while (i < temp.length) {
                            var current_value = temp[i][filter_name];
                            if (!(current_value.indexOf(value) > -1)) {
                                temp.splice(i, 1);;
                            } else {
                                i++;
                            }
                        }
                    }
                });
                $scope.customerListFilter = temp;
            };
            $scope.removeFilter = function (field_name) {
                $.each($(".grid_tool input"), function (index, object) {
                    if ($(object).attr("filter-name") == field_name) {
                        $(object).val("");
                        return false;
                    }
                });

                $scope.filterColumn("", field_name);
            };
            $scope.clearAllFilter = function () {
                $.each($(".grid_tool input"), function (index, object) {
                    $(object).val("");
                });

                $scope.customerListFilter = $scope.customerList;
            };
            $scope.sortColumn = function (field_name, index) {
                if (!$scope.col_defs[index].sortable) {
                    console.log("column index " + index + " is not sortable")
                    return false;
                }
                for (var i in $scope.col_defs) {
                    var current = $scope.col_defs[i];
                    if (current.field_name == field_name) {
                        if (current.apply_sort) {
                            current.sort_direction = !current.sort_direction;
                        } else {
                            current.apply_sort = true;
                            current.sort_direction = true;
                        }

                        bubbleSort($scope.customerListFilter, field_name, current.sort_direction);

                    } else {
                        current.apply_sort = false;
                    }
                }
            };
        }])
        .directive('myCustomer', function () {
            return {
                restrict: 'E',
                templateUrl: 'template/grid_tpl.html'
            };
        });
})(window.angular);

function bubbleSort(array, field_name, direction) {
    var swap = function (i, j) {
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    };

    var length = array.length;
    for (var i = 0; i < length - 1; i++) {
        for (var j = i + 1; j < length; j++) {
            if (direction) {
                if (array[i][field_name].localeCompare(array[j][field_name]) > 0) {
                    swap(i, j);
                }
            } else {
                if (array[i][field_name].localeCompare(array[j][field_name]) < 0) {
                    swap(i, j);
                }
            }
        }
    }


}