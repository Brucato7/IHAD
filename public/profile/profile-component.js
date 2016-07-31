"use strict";

angular.module('ihadApp')
    .component('profile', {
        templateUrl: 'profile/profile-template.html',
        controller: ['$http','$routeParams', '$scope','userData','viewProfileService',
            function($http, $routeParams, $scope, userData,viewProfileService){
                $scope.viewProfile = viewProfileService;
                $scope.fb_id = $routeParams.fb_id;
                $scope.user = userData;
            }]
    })