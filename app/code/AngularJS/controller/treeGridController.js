(function (angular) {
    'use strict';
    angular
        .module('treegridApp', [])
        .controller('treeGridController', ['$scope', function ($scope) {
            var processTreeData = function (root, depth, parentid) {
                root = root || [];
                depth = depth || 0;
                parentid = parentid || "root";

                var recursiveProcess = function (rootR, depthR, parentidR) {
                    for (var i in rootR) {
                        var current = rootR[i];

                        current.depth = depthR;
                        current.directiveid = parentidR + "-" + i;
                        current.expanded = current.expanded ? current.expanded : false;
                        current.show = current.show ? current.show : true;
                        current.isFilted = current.isFilted ? current.isFilted : true;

                        if (current.children) {
                            if (current.children.length > 0) {
                                recursiveProcess(current.children, depthR + 1, current.directiveid);
                            }
                        } else {
                            current.children = [];
                        }
                    }
                }

                recursiveProcess(root, Number(depth), parentid);

                return root;
            }
            var buildTreeList = function (root) {
                var nodeList = new Array();
                var recursiveBuild = function (rootR) {
                    for (var i in rootR) {
                        var current = rootR[i];
                        nodeList.push(current);
                        if (current.expanded && current.children.length > 0) {
                            recursiveBuild(current.children);
                        }
                    }
                }

                recursiveBuild(root);

                return nodeList;
            };
            var findNode = function (root, directiveid) {
                for (var i in root) {
                    var current = root[i];
                    if (current.directiveid == directiveid) {
                        return current;
                    } else {
                        if (current.children && current.children.length > 0) {
                            var found = findNode(current.children, directiveid);
                            if (found != null) {
                                return found;
                            }
                        }
                    }
                }
                return null;
            };
            $scope.indent = 20;
            $scope.filter_visible = true;
            $scope.col_defs = fetchColumnDefinition();
            $scope.sourceTree = processTreeData(fetchTreeGridData(), 0, "root");
            $scope.nodeList = buildTreeList($scope.sourceTree);
            $scope.openBranch = function (directiveid) {
                //find node index in current nodeList
                var i = 0;
                while (i < $scope.nodeList.length) {
                    if ($scope.nodeList[i].directiveid == directiveid) {
                        if ($scope.nodeList[i].expanded == false) {
                            var node = $scope.nodeList[i];
                            if (node.children.length > 0) {
                                node.expanded = true;

                                //build insert list
                                var insert = buildTreeList(node.children);

                                //inject insert at index i+1
                                var tem1 = $scope.nodeList.slice(0);
                                var tem2 = $scope.nodeList.slice(0);
                                tem1.splice(i + 1);
                                tem2.splice(0, i + 1);
                                $scope.nodeList = tem1.concat(insert);
                                $scope.nodeList = $scope.nodeList.concat(tem2);

                            }
                        }
                        break;
                    }
                    i++;
                }
            };
            $scope.closeBranch = function (directiveid) {
                var i = 0;
                while (i < $scope.nodeList.length) {
                    if ($scope.nodeList[i].directiveid == directiveid) {
                        var marked = $scope.nodeList[i];
                        marked.expanded = false;
                        i++;
                        while (i < $scope.nodeList.length && $scope.nodeList[i].depth > marked.depth) {
                            $scope.nodeList.splice(i, 1);
                        }
                        break;
                    }
                    i++;
                }
            };
            $scope.openAllBranch = function () {

                var i = 0;
                while (i < $scope.nodeList.length) {
                    $scope.openBranch($scope.nodeList[i].directiveid);
                    i++;
                }
            };
            $scope.closeAllBranch = function () {
                var i = 0;
                while (i < $scope.nodeList.length) {
                    $scope.closeBranch($scope.nodeList[i].directiveid);
                    i++;
                }

            };
            $scope.doFilterTree = function (filterKey) {
                console.log(filterKey);

                var recursiveMark = function (rootR) {
                    var filted = false;
                    for (var i in rootR) {
                        var current = rootR[i];

                        if (current.name.indexOf(filterKey) > -1) {
                            current.isFilted = true;
                        } else {
                            current.isFilted = false;
                        }

                        if (current.children.length > 0) {
                            if (recursiveMark(current.children)) {
                                current.isFilted = true;
                            }
                        }

                        if (current.isFilted) {
                            filted = true;
                        }
                    }

                    return filted;
                }

                recursiveMark($scope.sourceTree);
            }
            $scope.toogleFilter = function () {
                $scope.filter_visible = !$scope.filter_visible;
            }
            $scope.clearAllFilter = function () {

            }
            $scope.filterColumn = function (filter_key, filter_name) {
                console.log(filter_name + " - " + filter_key);

                var recursiveMark = function (rootR) {
                    var filted = false;
                    for (var i in rootR) {
                        var current = rootR[i];
//                        console.log(current[filter_name] + " - " + current[filter_name].indexOf(filter_key));
                        
                        if (current[filter_name].indexOf(filter_key) < 0) {
                            current.isFilted = false;
                        }

                        if (current.children.length > 0) {
                            if (recursiveMark(current.children)) {
                                current.isFilted = true;
                            }
                        }

                        if (current.isFilted) {
                            filted = true;
                        }
                    }

                    return filted;
                }

                recursiveMark($scope.sourceTree);
            }
            $scope.removeFilter = function (field_name) {
                $.each($(".grid_tool input"), function (index, object) {
                    if ($(object).attr("filter-name") == field_name) {
                        $(object).val("");
                        return false;
                    }
                });

                $scope.filterColumn("", field_name);
            }
        }])
        .directive('treegridDirective', function () {
            return {
                restrict: 'E',
                templateUrl: 'template/treegrid_tpl.html'
            };
        });


})(window.angular);