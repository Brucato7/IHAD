"use strict";

angular.module('ihadApp')
    .service('logoutService', function($location, $window){
        this.logout = function(){
            
            FB.logout(function(response) {
                alert('You are now logged out!');
            });         
                    
            $location.url('/');
            $window.location.reload();
        }
    });