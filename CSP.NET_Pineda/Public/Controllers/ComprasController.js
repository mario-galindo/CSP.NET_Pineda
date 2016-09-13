app.controller("ComprasController", function ($scope, $http, $uibModal) {

    $scope.open = function () {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'Public/Templates/Compras/Create.html',
            controller: 'ModalInstanceNuevaCompraController',
            size: 'lg',
            resolve: {
                items: function () {
                    return $scope.listadoProductos;
                }
            }
        });
    };

    $scope.openModalList = function () {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'Public/Templates/Productores/Lista.html',
            controller: 'ModalInstanceNuevoProductorController',
            size: 'lg',
            resolve: {
                items: function () {
                    return $scope.listadoProductos;
                }
            }
        });
    };




});

//Controller del Modal que se Abrio
app.controller('ModalInstanceNuevaCompraController', function ($scope, $uibModal, items, $rootScope, $filter, $http, $uibModalInstance, ProductoresServicios) {

    //$scope.listadoProductos = items;
    $scope.ListaProductores = [];

    //Obtener lista de Productos
    $scope.getProductores = function () {
        $http.post('Productores/GetProductores')
            .success(function (data) {
                //console.log(data);
                ProductoresServicios.ListaProductores = data;
                $scope.ListaProductores = ProductoresServicios.ListaProductores;

            })
            .error(function (error) {
                console.log(error);
            })
    }


})