//controller
app.controller('ListingController', ['$scope', '$rootScope', '$state', 'listing', 'getCart', 'getSum', function ($scope, $rootScope, $state, listing, getCart, getSum) {
    listing
        .then(function (res) {
            $scope.listing = res.data;
        }, function (err) {
            console.log(err);
        });
    $scope.state = $state;
    $scope.sum = getSum.sum;
    $scope.user = $rootScope.user;
    $scope.loggedIn = $rootScope.loggedIn;
    $scope.cart = getCart.cart;
    $scope.activeCart = false;
    $scope.addToCart = function (item) {
        if (!getCart.cart.includes(item)) {
            getCart.cart.push(item);
            item.quantity = 1;
        } else {
            item.quantity += 1;
        }
    };
    $scope.displayCart = function () {
        $scope.activeCart = true;
    };
    $scope.closeCart = function () {
        $scope.activeCart = false;
    };
    $scope.toggleCart = function () {
        $scope.activeCart = !$scope.activeCart;
    };
    $scope.removeItem = function (item) {
        var index = getCart.cart.indexOf(item);
        getCart.cart.splice(index, 1);
    };
    $scope.signIn = function () {
        if (!$scope.loggedIn) $state.go('registr.login');
    };
    $scope.signOut = function () {
        $scope.loggedIn = false;
    };
}]);

//services
app.factory('listing', ['$http', function ($http) {
    return $http.get('/api/listing')
        .then(function (res) {
            return res;
        }, function (err) {
            console.log(err);
        });
}]);

app.service('getCart', function () {
    this.cart = [];
});

app.service('getSum', ['getCart', function (getCart) {
    this.sum = function () {
        var sum = 0;
        var cart = getCart.cart;
        for (var i = 0; i < cart.length; i++) {
            var item = cart[i];
            sum += item.price * item.quantity;
        }
        return sum;
    };
}]);