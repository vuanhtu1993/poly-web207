var students = [
    "Pham Quang Du",
    "Chu Van Tram",
    "Dinh Anh Tuan",
]

var myApp = angular.module('myApp', []) //Services
myApp
    .controller('myController', function ($scope) {
        $scope.students = students
        $scope.logging = function () {
            console.log("Logging service");
        }
    })
    .directive('ngGreeting', function () {
        return {
            template: "<h1>Hello world</h1>"
        }
    })