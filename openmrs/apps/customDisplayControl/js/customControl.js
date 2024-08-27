'use strict';

angular.module('bahmni.common.displaycontrol.custom')
    .directive('envioOrdenes', function() {
        return {     
            restrict: 'E',
            templateUrl: appService.baseUrl + "/customDisplayControl/views/envioOrdenes.html",  //referencia template archivo hmtl
            controller: ['$scope', '$stateParams', '$rootScope', '$http', 'appService', 'orderTypes',
                function ($scope, $stateParams, $rootScope, $http, appService, orderTypes) {
                    $scope.dashboardConfig = $scope.dashboard.getSectionByType("labOrders").dashboardConfig || {};
                    $scope.dashboardConfig.patientUuid = $stateParams.patientUuid;
                    
                    $scope.dialogData = {
                        "patient": $scope.patient,
                        "expandedViewConfig": $scope.dashboard.getSectionByType("labOrders").expandedViewConfig || {}
                    };

                    $scope.labOrders = [];   //lista que guarda las ordenes de laboratorio
                    $scope.radiologyOrders = [];    //lista que guarda las ordenes de radiologia
                    $scope.combinedOrders = [];     //lista que guarda ambos tipos de ordenes

                    function loadOrders(orderType) {     
                        const url = `/openmrs/ws/rest/v1/${orderType}/` + $scope.dashboardConfig.patientUuid;
                        return $http.get(url).then(function(response) {
                            return response.data;
                        });
                    }

                    function loadLabOrders() {   //función que invoca las ordenes de laboratorio 
                        loadOrders(orderTypes.lab).then(function(data) {
                            $scope.labOrders = data;
                            updateCombinedOrders();
                        });
                    }

                    function loadRadiologyOrders() {   //función que invoca las ordenes de radiología 
                        loadOrders(orderTypes.radiology).then(function(data) {
                            $scope.radiologyOrders = data;
                            updateCombinedOrders();  //se cargan las ordenes en la lista combinada
                        });
                    }

                    function updateCombinedOrders() {           //se actualiza la lista combinada con ambos tipos de ordenes cargadas en la misma
                        $scope.combinedOrders = [...$scope.labOrders, ...$scope.radiologyOrders];
                    }

                    loadLabOrders();
                    loadRadiologyOrders();

                    $scope.isDataPresent = function () {   //función para dar aviso en caso de que no hayan ordenes de ningun tipo asociadas al paciente
                        if (($scope.radiologyOrders && $scope.radiologyOrders.length === 0) || ($scope.labOrders && $scope.labOrders.length === 0)) {
                            $scope.$emit("no-data-present-event");
                            return false;
                        }
                        return true;
                    };

                    $scope.downloadOrder = function (visitStartDate, visitUuid) {   //función de descarga de las ordenes
                        $rootScope.$broadcast("event:downloadOrderFromDashboard", visitStartDate, visitUuid);
                    };

                    $scope.isOtherActiveSection = function (dateString) {   
                        return dateString === Bahmni.Clinical.Constants.labOrders || Bahmni.Clinical.Constants.radiologyOrders;
                    };

                    $scope.shareOrders = function (visitStartDate, visitUuid) {  //función de envio de las ordenes
                        $rootScope.$broadcast("event:shareOrdersViaEmail", visitStartDate, visitUuid);
                    };
                }
            ]
        };
    });


        
   
