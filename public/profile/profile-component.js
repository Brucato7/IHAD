"use strict";

angular.module('ihadApp')
    .component('profile', {
        templateUrl: 'profile/profile-template.html',
        controller: ['$http','$routeParams', '$scope','userData','viewProfileService',
            function($http, $routeParams, $scope, userData,viewProfileService){
                $scope.viewProfile = viewProfileService;
                $scope.fb_id = $routeParams.fb_id;
                $scope.user = userData;

                $scope.addAccountabilityPartner = function(goal){
                    goal.name = userData.name;
                    goal.accountability_partner_id = userData.id;
                    goal.fb_id = userData.fb_id;
                    $http({
                        method: 'PUT',
                        url: '/accountability',
                        params: {goal_id: goal.id, accountability_id: userData.id}
                    }).then(function successCallback(data){
                        console.log(data);
                    }, function errorCallback(error){
                        console.log(error);
                    })
                };
            }]
    })