app.controller("ProductosController", function ($scope, $http, $uibModal) {

    $scope.open = function () {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'Public/Templates/Productos/Create.html',
            controller: 'ModalInstanceNuevoProductoController',
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
            templateUrl: 'Public/Templates/Productos/Lista.html',
            controller: 'ModalInstanceNuevoProductoController',
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
app.controller('ModalInstanceNuevoProductoController', function ($scope, $uibModal, items, $rootScope, $filter, $http, $uibModalInstance, ProductosServicios) {

    //$scope.listadoProductos = items;
    $scope.ListaProductos = [];
   

    $scope.Nombre = "";
    $scope.Cantidad = "";
    $scope.Categoria = "";

    $scope.agregarProducto = function () {
        $http.post('Productos/addProductos', { _nombreProducto: $scope.Nombre, _cantidadStock: $scope.Cantidad, _categoria: $scope.Categoria })
            .success(function (data) {
                console.log(data);
                if (data == 'true') {
                    $uibModalInstance.dismiss('cancel');
                }
            })
            .error(function (error) {
                console.log(error);
            })
    }


    //Obtener lista de Productos
    $scope.getProducts = function () {
        $http.post('Productos/GetProducts')
            .success(function (data) {
                console.log(data);
                ProductosServicios.listadoProductos = data;
                $scope.ListaProductos = ProductosServicios.listadoProductos;

            })
            .error(function (error) {
                console.log(error);
            })
    }

    
})