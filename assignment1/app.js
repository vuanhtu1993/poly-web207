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
        .when('/dashboard', {
            templateUrl: "./pages/dashboard.html",
            controller: "dashboardController"
        })
        .when('/dashboard/add', {
            templateUrl: "./pages/add-product.html",
            controller: "addProductController"
        })
        .otherwise({
            redirectTo: "/"
        })
})

app.controller('myController', function ($rootScope, $scope, $http) {
    $http.get('http://localhost:3000/books')
        .then(function (data) {
            $rootScope.data = data.data
        })
    $rootScope.books = $rootScope.data
    $scope.orderProduct = function (type) {
        $scope.orderType = type
    }
    $scope.search = function (event) {
        if (event.keyCode == 13) {
            $rootScope.books = $rootScope.data.filter(function (book) {
                return book.name.toLowerCase().includes($scope.searchStr.toLowerCase())
            })
        }
    }
})

app.controller('dashboardController', function ($scope, $http, $rootScope) {
    $http.get('http://localhost:3000/books')
        .then(function (data) {
            $scope.books = data.data
        })
    $scope.delete = function (id) {
        console.log(id);
        $http.delete('http://localhost:3000/books/' + id)
            .then(function (res) {
                alert("Xoá sản phẩm thành công")
            })
    }
})

app.controller('addProductController', function ($scope, $http, $rootScope, $location) {
    $scope.submit = function (event) {
        event.preventDefault()
        console.log($scope.product);
        $http.post('http://localhost:3000/books', $scope.product)
            .then(function () {
                alert('Thêm sản phẩm thành công')
                window.location('#dashboard')
            })
    }
})

app.controller("productController", function ($scope, $routeParams) {
    $scope.id = $routeParams.id
    $scope.book = data.find(function (item) {
        return $routeParams.id == item.id
    })
})

