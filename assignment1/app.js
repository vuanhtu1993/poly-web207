import data from './db.json' assert {type: 'json'}

var app = angular.module("app", [])

app.controller('myController', function ($scope) {
    $scope.greeting = "Hello world"
})

console.log(data);