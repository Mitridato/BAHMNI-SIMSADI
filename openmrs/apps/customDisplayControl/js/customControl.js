'use strict';
/*
angular.module('bahmni.common.displaycontrol.custom')
    .directive('envioOrdenes', ['$scope', '$stateParams', '$rootScope', '$http', 'appService',
        function ($scope, $stateParams, $rootScope, $http, appService) {
            const orderTypes = {
                lab: 'labOrders',
                radiology: 'radiologyOrders'
            };

            $scope.dashboardConfig = $scope.dashboard.getSectionByType("labOrders").dashboardConfig || {};
            $scope.dashboardConfig.patientUuid = $stateParams.patientUuid;
            $scope.contentUrl = appService.baseUrl + "/customDisplayControl/views/envioOrdenes.html";
            
            $scope.dialogData = {
                "patient": $scope.patient,
                "expandedViewConfig": $scope.dashboard.getSectionByType("labOrders").expandedViewConfig || {}
            };

            $scope.labOrderSections = [];
            $scope.radiologyOrders = [];
            $scope.combinedOrders = [];

            function loadOrders(orderType) {
                const url = `/openmrs/ws/rest/v1/${orderType}/` + $scope.dashboardConfig.patientUuid;
                return $http.get(url).then(function(response) {
                    return response.data;
                });
            }

            function loadLabOrders() {
                loadOrders(orderTypes.lab).then(function(data) {
                    $scope.labOrderSections = data;
                    updateCombinedOrders();
                });
            }

            function loadRadiologyOrders() {
                loadOrders(orderTypes.radiology).then(function(data) {
                    $scope.radiologyOrders = data;
                    updateCombinedOrders();
                });
            }

            function updateCombinedOrders() {
                $scope.combinedOrders = [...$scope.labOrderSections, ...$scope.radiologyOrders];
            }

            loadLabOrders();
            loadRadiologyOrders();

            $scope.isDataPresent = function () {
                if (($scope.radiologyOrders && $scope.radiologyOrders.length === 0) || ($scope.labOrderSections && $scope.labOrderSections.length === 0)) {
                    $scope.$emit("no-data-present-event");
                    return false;
                }
                return true;
            };

            $scope.downloadOrder = function (visitStartDate, visitUuid) {
                $rootScope.$broadcast("event:downloadOrderFromDashboard", visitStartDate, visitUuid);
            };

            $scope.isOtherActiveSection = function (dateString) {
                return dateString === Bahmni.Clinical.Constants.labOrderSection || dateString === Bahmni.Clinical.Constants.radiologyOrderSection;
            };

            $scope.shareOrders = function (visitStartDate, visitUuid) {
                $rootScope.$broadcast("event:shareOrdersViaEmail", visitStartDate, visitUuid);
            };
        }
    ]);
*/
angular.module('bahmni.common.displaycontrol.custom')
    .directive('envioOrdenes', function() {
        return {
            restrict: 'E',
            templateUrl: appService.baseUrl + "/customDisplayControl/views/envioOrdenes.html",
            controller: ['$scope', '$stateParams', '$rootScope', '$http', 'appService', 'orderTypes',
                function ($scope, $stateParams, $rootScope, $http, appService, orderTypes) {
                    $scope.dashboardConfig = $scope.dashboard.getSectionByType("labOrders").dashboardConfig || {};
                    $scope.dashboardConfig.patientUuid = $stateParams.patientUuid;
                    
                    $scope.dialogData = {
                        "patient": $scope.patient,
                        "expandedViewConfig": $scope.dashboard.getSectionByType("labOrders").expandedViewConfig || {}
                    };

                    $scope.labOrderSections = [];
                    $scope.radiologyOrders = [];
                    $scope.combinedOrders = [];

                    function loadOrders(orderType) {
                        const url = `/openmrs/ws/rest/v1/${orderType}/` + $scope.dashboardConfig.patientUuid;
                        return $http.get(url).then(function(response) {
                            return response.data;
                        });
                    }

                    function loadLabOrders() {
                        loadOrders(orderTypes.lab).then(function(data) {
                            $scope.labOrderSections = data;
                            updateCombinedOrders();
                        });
                    }

                    function loadRadiologyOrders() {
                        loadOrders(orderTypes.radiology).then(function(data) {
                            $scope.radiologyOrders = data;
                            updateCombinedOrders();
                        });
                    }

                    function updateCombinedOrders() {
                        $scope.combinedOrders = [...$scope.labOrderSections, ...$scope.radiologyOrders];
                    }

                    loadLabOrders();
                    loadRadiologyOrders();

                    $scope.isDataPresent = function () {
                        if (($scope.radiologyOrders && $scope.radiologyOrders.length === 0) || ($scope.labOrderSections && $scope.labOrderSections.length === 0)) {
                            $scope.$emit("no-data-present-event");
                            return false;
                        }
                        return true;
                    };

                    $scope.downloadOrder = function (visitStartDate, visitUuid) {
                        $rootScope.$broadcast("event:downloadOrderFromDashboard", visitStartDate, visitUuid);
                    };

                    $scope.isOtherActiveSection = function (dateString) {
                        return dateString === Bahmni.Clinical.Constants.labOrderSection || Bahmni.Clinical.Constants.radiologyOrderSection;
                    };

                    $scope.shareOrders = function (visitStartDate, visitUuid) {
                        $rootScope.$broadcast("event:shareOrdersViaEmail", visitStartDate, visitUuid);
                    };
                }
            ]
        };
    });


        
    // Define el nuevo módulo
    /*
    angular.module('bahmni.common.displaycontrol.custom', [])
        .controller('EnvioOrdenes', ['$scope', '$stateParams', '$rootScope', 'labOrderService', 'radiologyOrderService', 
            function ($scope, $stateParams, $rootScope, labOrderService, radiologyOrderService) {
                $scope.dashboardConfig = $scope.dashboard.getSectionByType("labOrders").dashboardConfig || {};
                $scope.dashboardConfig.patientUuid = $stateParams.patientUuid;
                
                $scope.dialogData = {
                    "patient": $scope.patient,
                    "expandedViewConfig": $scope.dashboard.getSectionByType("labOrders").expandedViewConfig || {}
                };

                $scope.labOrderSections = [];
                $scope.radiologyOrders = [];
                $scope.combinedOrders = [];

                function loadLabOrders() {
                    labOrderService.getLabOrdersForPatient($scope.dashboardConfig.patientUuid).then(function(response) {
                        $scope.labOrderSections = response.data;
                        updateCombinedOrders();
                    });
                }

                function loadRadiologyOrders() {
                    radiologyOrderService.getRadiologyOrdersForPatient($scope.dashboardConfig.patientUuid).then(function(response) {
                        $scope.radiologyOrders = response.data;
                        updateCombinedOrders();
                    });
                }

                function updateCombinedOrders() {
                    $scope.combinedOrders = [...$scope.labOrderSections, ...$scope.radiologyOrders];
                }

                loadLabOrders();
                loadRadiologyOrders();

                $scope.isDataPresent = function () {
                    if (($scope.radiologyOrders && $scope.radiologyOrders.length === 0) || ($scope.labOrderSections && $scope.labOrderSections.length === 0)) {
                        $scope.$emit("no-data-present-event");
                        return false;
                    }
                    return true;
                };

                $scope.downloadOrder = function (visitStartDate, visitUuid) {
                    $rootScope.$broadcast("event:downloadOrderFromDashboard", visitStartDate, visitUuid);
                };

                $scope.isOtherActiveSection = function (dateString) {
                    return dateString === Bahmni.Clinical.Constants.labOrderSection || dateString === Bahmni.Clinical.Constants.radiologyOrderSection;
                };

                $scope.shareOrders = function (visitStartDate, visitUuid) {
                    $rootScope.$broadcast("event:shareOrdersViaEmail", visitStartDate, visitUuid);
                };
            }
        ]);
    
    // Define the module
    */