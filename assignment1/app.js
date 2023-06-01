import data from './db.json' assert {type: 'json'}

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
        .otherwise({
            redirectTo: "/"
        })
})

app.controller('myController', function ($rootScope, $scope) {
    $rootScope.data = data
    $scope.orderProduct = function (type) {
        $scope.orderType = type
    }
    $scope.search = function () {
        console.log($scope.searchStr);
        var newData = data.filter(function (book) {
            return book.name.toLowerCase().includes($scope.searchStr.toLowerCase())
        })
        $rootScope.data = newData
    }
})

app.controller("productController", function ($scope, $routeParams) {
    console.log("productController", $routeParams.id);
    $scope.id = $routeParams.id
    $scope.book = data.find(function (item) {
        return $routeParams.id == item.id
    })
})

