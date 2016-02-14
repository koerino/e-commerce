app.controller('CheckoutController', ['$scope', 'getCart', 'getSum', function ($scope, getCart, getSum) {
    $scope.client = {};
    $scope.billing = {};
    $scope.payment = {};
    $scope.cart = getCart.cart;
    $scope.sum = getSum.sum;
    $scope.copyAddress = false;
    $scope.toggleCopy = function () {
        $scope.copyAddress = !$scope.copyAddress;
    }
    $scope.sync = function () {
        if ($scope.copyAddress === true) {
            $scope.billing = angular.copy($scope.client);
        }
    }
}]);