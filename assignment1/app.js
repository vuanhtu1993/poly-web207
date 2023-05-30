import data from './db.json' assert {type: 'json'}

var app = angular.module("myApp", ['ngRoute'])
// Bước1: import angular-route
// Bước2: Khai báo router
// Bước3: Khai báo <ng-view></ng-view>

// Router
app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: "./pages/home.html",
            controller: "myController"
        })
        .when('/product/:id', {
            templateUrl: "./pages/product.html",
            controller: "myController"
        })
        .otherwise({
            redirectTo: "/"
        })
})

app.controller('myController', function ($scope) {
    $scope.data = data
    $scope.orderProduct = function (type) {
        $scope.orderType = type
    }
})

