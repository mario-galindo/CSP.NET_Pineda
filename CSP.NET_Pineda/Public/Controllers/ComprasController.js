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
            templateUrl: 'Public/Templates/Compras/Lista.html',
            controller: 'ModalInstanceNuevaCompraController',
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
app.controller('ModalInstanceNuevaCompraController', function ($scope, $uibModal, items, $rootScope, $filter, $http, $uibModalInstance, ProductoresServicios, ProductosServicios, ComprasServicios) {

    //$scope.listadoProductos = items;
    $scope.ListaCompras = [];
    $scope.ListaProductores = ProductoresServicios.ListaProductores;
    $scope.ListaProductos = ProductosServicios.ListaProductos;

    //Varibles de la Vista
    $scope.IdProductor;
    $scope.IdProducto;
    $scope.Peso;
    $scope.Tara;
    $scope.SubTotal;
    $scope.Descuento;
    $scope.Total;
    $scope.FactorCambioDolar = 21;
    $scope.PrecioCafe;
    $scope.FechaCompra;

    $scope.Calcular = function () {

        $scope.SubTotal = ($scope.Peso - $scope.Tara)* $scope.PrecioCafe;
        //$scope.SubTotal = $scope.SubTotal * $scope.Descuento;
        $scope.SubTotal = $scope.SubTotal.toFixed(2);

        $scope.Total = $scope.SubTotal - ($scope.SubTotal * $scope.Descuento);
        $scope.Total = $scope.Total.toFixed(2);
        
    }

    $scope.Guardar = function () {
        $http.post('Compras/addCompra',
            {
                _IdProductor: $scope.IdProductor,
                _IdProducto: $scope.IdProducto,
                _Peso: $scope.Peso,
                _Tara: $scope.Tara,
                _SubTotal: $scope.SubTotal,
                _Desc: $scope.Descuento,
                _Total: $scope.Total,
                _FCambio: $scope.FactorCambioDolar,
                _PrecioCafe: $scope.PrecioCafe,
                _FechaCompra: $scope.FechaCompra
            })
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

    //Obtener lista de Compras Con Proveedor
    $scope.getCompras = function () {
        $http.post('Compras/GetCompras')
            .success(function (data) {
                console.log(data);
                ComprasServicios.ListaCompras = data;
                $scope.ListadoCompras = ComprasServicios.ListaCompras;

            })
            .error(function (error) {
                console.log(error);
            })
    }
    


})