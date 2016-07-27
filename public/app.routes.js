"use strict";
angular.module('ihadApp')
    .config(["$routeProvider", function($routeProvider){
        $routeProvider
            .when("/", {
                template: '<home></home>'
            })
            .when('/profile',{
                template: '<profile></profile>'
            })
            .otherwise('/', {
                template: '<home></home>'
            });
    }]);