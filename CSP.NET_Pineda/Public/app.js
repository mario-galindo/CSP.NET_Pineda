var app = angular.module("app", [
    'ngRoute'
]);

app.config(function ($routeProvider, $locationProvider) {

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    }).hashPrefix('!');

    $routeProvider

        .when('/Productos', {

            templateUrl: 'Public/Templates/Productos.html',
            controller: 'MainController'
        })
        .when('/Compras', {

            templateUrl: 'Public/Templates/Compras.html',
            controller: 'MainController'
        })
        .otherwise({

            redirectTo: '/'
        });


});

app.controller("MainController", function ($scope, $http) {
    $scope.Nombre = "Cafe";
    $scope.Cantidad = "200";
    $scope.Categoria = "1";

    $scope.agregarProducto = function () {
        $http.post('Productos/addProductos', { _nombreProducto: $scope.Nombre, _cantidadStock: $scope.Cantidad, _categoria: $scope.Categoria })
            .success(function (data) {
                console.log(data);
            })
            .error(function (error) {
                console.log(error);
            })
    }
});

