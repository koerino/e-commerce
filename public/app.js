var app = angular.module('App', ['ui.router']);
app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('listing', {
            url: '/listing',
            templateUrl: 'listing/listing.html',
            controller: 'ListingController'
        })
        .state('listing.item', {
            url: '/:itemId',
            views: {
                detail: {
                    templateUrl: 'listing/listing.item.html'
                }
            }
        })
        .state('checkout', {
            url: '/checkout',
            templateUrl: 'checkout/checkout.html',
            controller: 'CheckoutController'
        })
        .state('checkout.info', {
            url: '/basic-info',
            templateUrl: 'checkout/checkout.info.html'
        })
        .state('checkout.payment', {
            url: '/payment',
            templateUrl: 'checkout/checkout.payment.html'
        })
        .state('checkout.summary', {
            url: '/summary',
            templateUrl: 'checkout/checkout.summary.html'
        })
        .state('checkout.success', {
            url: '/confirmation',
            templateUrl: 'checkout/checkout.success.html'
        })
        .state('registr', {
            url: '/registr',
            templateUrl: 'registr/registr.html',
            controller: 'RegistrController'
        })
        .state('registr.login', {
            url: '/login',
            templateUrl: 'registr/registr.login.html'
        })
        .state('registr.signup', {
            url: '/signup' ,
            templateUrl: 'registr/registr.signup.html'
        });
    $urlRouterProvider.otherwise('/listing');
});