import data from './db.json' assert {type: 'json'}

var app = angular.module("app", [])

app.controller('myController', function ($scope) {
    $scope.data = data
    $scope.search = function(e) {
        if(e.keyCode == 13) {
            $scope.data = data.filter(function(item) {
                return item.name.toLowerCase().includes($scope.searchStr.toLowerCase())
            })
        }
    }
    $scope.filterIncrease = function() {
        data.sort(function(a, b) {
            return b.list_price - a.list_price
        })
    }
    $scope.filterDecrease = function() {
        data.sort(function(a, b) {
            return a.list_price - b.list_price
        })
    }
})
