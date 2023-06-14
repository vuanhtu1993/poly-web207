var app = angular.module("myApp", ['ngRoute'])
// Bước1: import angular-route
// Bước2: Khai báo router
// Bước3: Khai báo <ng-view></ng-view>

// Router
app.config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix("")
    $routeProvider
        .when('/', {
            // templateUrl
            template: `<h1 class="text-bg-success">Base project</h1>`,
            controller: "myController"
        })
})

app.controller("myController", function () {
    console.log("myController");
})
