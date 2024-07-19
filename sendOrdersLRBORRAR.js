'use strict';

angular.module('bahmni.clinical')
    .directive('pacsOrders','labOrders','Sendorders', function (orderService, labOrders, Sendorders, pacsOrders) {
        var controller = function ($scope, $rootScope, ngDialog, visitActionsService) {
            $scope.isOtherActiveSection = function (dateString) {
                return dateString === Bahmni.Clinical.Constants.labOrderSection || dateString === Bahmni.Clinical.Constants.radiologyOrderSection;
            };

            $scope.isDataPresent = function () {
                if (($scope.pacsOrders && $scope.pacsOrders.length == 0) || ($scope.labOrderSections && $scope.labOrderSections.length == 0)) {
                    return $scope.$emit("no-data-present-event") && false;
                }
                return true;
            };

            $scope.downloadOrder = function (visitStartDate, visitUuid) {
                $rootScope.$broadcast("event:downloadOrderFromDashboard", visitStartDate, visitUuid);
            };
            $scope.shareOrders = function (visitStartDate, visitUuid) {
                $rootScope.$broadcast("event:shareOrdersViaEmail", visitStartDate, visitUuid);
            };
        };

        return {
            templateUrl: "customDisplayControl/views/Emailtemplate.html",
            scope: {
                OrderSections: "=",
                params: "="
            },
            controller: controller
        };
    });
