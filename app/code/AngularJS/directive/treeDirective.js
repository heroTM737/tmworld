(function (angular) {
    'use strict';
    angular.module('com.tientm.tree', []).directive('treeDirective', function () {
        return {
            restrict: 'E',
            templateUrl: 'template/tree_tpl.html',
            scope: {
                openNodeIcon: "@",
                getDataSource: "&"
            },
            controller: function ($scope) {
                console.log($scope.openNodeIcon);
                var processTreeData = function (root, depth, parentid) {
                    root = root || [];
                    depth = depth || 0;
                    parentid = parentid || "root";

                    var recursiveProcess = function (rootR, depthR, parentidR) {
                        for (var i in rootR) {
                            var current = rootR[i];

                            current.depth = depthR;
                            current.directiveid = parentidR + "-" + i;
                            current.expanded = current.expanded !== undefined ? current.expanded : false;
                            current.hidden = current.hidden !== undefined ? current.hidden : false;
                            current.show = current.show !== undefined ? current.show : true;
                            current.isFilted = current.isFilted !== undefined ? current.isFilted : true;
                            current.isShow = function () {
                                return (!current.hidden && current.show && current.isFilted);
                            }

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
                            nodeList.push(rootR[i]);
                            if (rootR[i].children.length > 0) {
                                recursiveBuild(rootR[i].children);
                            }
                        }
                    }

                    recursiveBuild(root);

                    return nodeList;
                };
                var initExpandCollapse = function (root) {

                    var recursiveProcess = function (rootR, show) {
                        for (var i in rootR) {
                            rootR[i].show = show;
                            if (rootR[i].expanded && show) {
                                recursiveProcess(rootR[i].children, true);
                            } else {
                                recursiveProcess(rootR[i].children, false);
                            }
                        }
                    }

                    recursiveProcess(root, true);
                }
                var findNode = function (root, directiveid) {
                    for (var i in root) {
                        var current = root[i];
                        if (current.directiveid === directiveid) {
                            return current;
                        } else {
                            if (current.children.length > 0) {
                                var found = findNode(current.children, directiveid);
                                if (found != null) {
                                    return found;
                                }
                            }
                        }
                    }
                    return null;
                }
                var findNodeInNodeList = function (directiveid) {
                    for (var i in $scope.nodeList) {
                        if ($scope.nodeList[i].directiveid === directiveid) {
                            return $scope.nodeList[i];
                        }
                    }
                    return null;
                }
                var openNode = function (node, isOpen) {

                    var open = isOpen === undefined ? true : isOpen;
                    
                    node.expanded = open;

                    var doChildren = function (nodeR) {
                        for (var i in nodeR.children) {
                            nodeR.children[i].show = open;
                            if (nodeR.children[i].expanded) {
                                doChildren(nodeR.children[i]);
                            }
                        }
                    }

                    doChildren(node, open);
                }

                //initiation data
                $scope.indent = 20;
                $scope.sourceTree = processTreeData($scope.getDataSource(), 0, "root");
                $scope.nodeList = buildTreeList($scope.sourceTree);
                initExpandCollapse($scope.sourceTree);

                //scope function
                $scope.openBranch = function (directiveid) {
                    var node = findNode($scope.sourceTree, directiveid);
                    if (node != null) {
                        openNode(node);
                    }
                };
                $scope.closeBranch = function (directiveid) {
                    var node = findNode($scope.sourceTree, directiveid);
                    if (node != null) {
                        openNode(node, false);
                    }
                };
                $scope.openAllBranch = function () {
                    for (var i in $scope.nodeList) {
                        $scope.nodeList[i].show = true;
                        $scope.nodeList[i].expanded = true;
                    }
                };
                $scope.closeAllBranch = function () {
                    for (var i in $scope.nodeList) {
                        $scope.nodeList[i].show = false;
                        $scope.nodeList[i].expanded = false;
                    }

                    for (var i in $scope.sourceTree) {
                        $scope.sourceTree[i].show = true;
                    }
                };
                $scope.doFilterTree = function (filterKey) {

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
            }
        };
    });
})(window.angular);