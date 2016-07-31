"use strict";
angular.module('ihadApp')
    .config(["$routeProvider", function($routeProvider){
        $routeProvider
            .when("/", {
                template: '<home></home>'
            })
            .when('/activeuser',{
                template: '<activeuser></activeuser>'
            })
            .when('/search', {
                template: '<search></search>'
            })
            .otherwise('/', {
                template: '<home></home>'
            });
    }]);