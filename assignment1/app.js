import data from './db.json' assert {type: 'json'}

// "//ajax.googleapis.com/ajax/libs/angularjs/X.Y.Z/angular-route.js"

var app = angular.module("app", ['ngRoute'])

// Router
app.config(function ($routeProvider) {
    $routeProvider
        .when('/product', {
            templateUrl: './pages/product.html',
            controller: "myController"
        })
        .when('/', {
            templateUrl: './pages/home.html',
            controller: "myController"
        })
        .otherwise({
            redirectTo: '/'
        })
})


app.controller('myController', function ($scope) {
    $scope.data = data
    $scope.limitBook = data.length
    $scope.orderType = "rating_average"
    $scope.search = function (e) {
        if (e.keyCode == 13) {
            $scope.data = data.filter(function (item) {
                return item.name.toLowerCase().includes($scope.searchStr.toLowerCase())
            })
        }
    }
    $scope.filterIncrease = function () {
        data.sort(function (a, b) {
            return b.list_price - a.list_price
        })
    }
    $scope.filterDecrease = function () {
        data.sort(function (a, b) {
            return a.list_price - b.list_price
        })
    }
    $scope.filter = function (type) {
        switch (type) {
            case "increase":
                $scope.orderType = "-list_price"
                break;
            case "decrease":
                $scope.orderType = "list_price"
                break;
            default:
                $scope.orderType = "rating_average"
                break;
        }
    }
})
