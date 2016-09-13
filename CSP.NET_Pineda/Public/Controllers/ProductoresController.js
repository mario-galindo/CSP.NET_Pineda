app.controller("ProductoresController", function ($scope, $http, $uibModal) {

    $scope.open = function () {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'Public/Templates/Productores/Create.html',
            controller: 'ModalInstanceNuevoProductorController',
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
app.controller('ModalInstanceNuevoProductorController', function ($scope, $uibModal, items, $rootScope, $filter, $http, $uibModalInstance, ProductoresServicios) {

    //$scope.listadoProductos = items;
    $scope.ListaProductores = [];
   

    $scope.Nombre = "Mario";
    $scope.Apellido = "Galindo";
    $scope.Identidad = "0501199411366";
    $scope.RTN = "05011994113667";
    $scope.IHCAFE = "HN1234";
    $scope.Domicilio = "Col. San Carlos Choloma";
    $scope.Telefono = "98260415";

    $scope.agregarProductor = function () {

        console.log($scope.Nombre);
        console.log($scope.Apellido);
        console.log($scope.Identidad);
        console.log($scope.RTN);
        console.log($scope.IHCAFE);
        console.log($scope.Domicilio);
        console.log($scope.Telefono);


        $http.post('Productores/addProductor', {
            _Nombre: $scope.Nombre,
            _Apellido: $scope.Apellido,
            _Id: $scope.Identidad,
            _Telefono: $scope.Telefono,
            _RTN: $scope.RTN,
            _IHCAFE: $scope.IHCAFE,
            _Domicilio: $scope.Domicilio
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


    //Obtener lista de Productos
    $scope.getProductores = function () {
        $http.post('Productores/GetProductores')
            .success(function (data) {
                console.log(data);
                ProductoresServicios.ListaProductores = data;
                $scope.ListaProductores = ProductoresServicios.ListaProductores;
               
            })
            .error(function (error) {
                console.log(error);
            })
    }

    
})