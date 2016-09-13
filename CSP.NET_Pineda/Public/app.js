var app = angular.module("app", [
    'ngRoute',
    'ui.bootstrap'
]);

app.config(function ($routeProvider, $locationProvider) {

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    }).hashPrefix('!');

    $routeProvider

        .when('/Productos', {

            templateUrl: 'Public/Templates/Productos/Index.html',
            controller: 'ProductosController'
        })
        .when('/Productores', {

            templateUrl: 'Public/Templates/Productores/Index.html',
            controller: 'ProductoresController'
        })
        .when('/Compras', {

            templateUrl: 'Public/Templates/Compras/Index.html',
            controller: 'ComprasController'
        })
        .otherwise({

            redirectTo: '/'
        });


});



