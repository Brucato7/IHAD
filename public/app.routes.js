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
            .when('/search', {
                template: '<search></search>'
            })
            .otherwise('/', {
                template: '<home></home>'
            });
    }]);