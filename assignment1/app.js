var app = angular.module("myApp", ['ngRoute'])
// Bước1: import angular-route
// Bước2: Khai báo router
// Bước3: Khai báo <ng-view></ng-view>

// Router
app.config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix("")
    $routeProvider
        .when('/', {
            templateUrl: "./pages/home.html",
            controller: "myController"
        })
        .when('/product/:id', {
            templateUrl: "./pages/product.html",
            controller: "productController"
        })
        .when('/admin', {
            templateUrl: "./pages/dashboard.html",
            controller: "dashboardController"
        })
        .when('/admin/add', {
            templateUrl: "./pages/add-product.html",
            controller: "addProductController"
        })
        .when('/admin/product/:id', {
            templateUrl: "./pages/update-product.html",
            controller: "updateProductController"
        })
        .otherwise({
            redirectTo: "/"
        })
})

app.controller('myController', function ($rootScope, $scope, $http) {
    $http.get('http://localhost:3000/books')
        .then(function (res) {
            $rootScope.books = res.data
        }) //Promise

    $scope.orderProduct = function (type) {
        $scope.orderType = type
    }
    $scope.search = function (event) {
        if (event.keyCode == 13) {
            $rootScope.books = data.books.filter(function (book) {
                return book.name.toLowerCase().includes($scope.searchStr.toLowerCase())
            })
        }
    }
})

app.controller("productController", function ($scope, $routeParams, $http) {
    $scope.id = $routeParams.id
    // $scope.book = data.find(function (item) {
    //     return $routeParams.id == item.id
    // })
    $http.get('http://localhost:3000/books/' + $scope.id)
        .then(function (res) {
            $scope.book = res.data
        })
})


app.controller('dashboardController', function ($scope, $rootScope, $http) {
    // $scope.books = $rootScope.books
    $http.get('http://localhost:3000/books')
        .then(function (res) {
            $scope.books = res.data
        })
    $scope.delete = function (id) {
        console.log(id);
        $http.delete('http://localhost:3000/books/' + id)
            .then(function () {
                alert("Xoá thành công")
            })
    }
})

app.controller("addProductController", function ($scope, $routeParams, $http) {
    $scope.submit = function (event) {
        if ($scope.product) {
            $http.post("http://localhost:3000/books", $scope.product)
                .then(function () {
                    alert("Thêm mới thành công")
                })
        }
    }
})

app.controller("updateProductController", function ($scope, $routeParams, $http) {
    $scope.id = $routeParams.id
    $http.get("http://localhost:3000/books/" + $scope.id)
        .then(function (res) {
            $scope.product = res.data
        })
    $scope.submit = function () {
        $http.put("http://localhost:3000/books/" + $scope.id, $scope.product)
            .then(function () {
                alert("Sửa sản phẩm thành công")
            })
    }
})
