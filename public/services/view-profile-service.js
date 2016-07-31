"use strict";

angular.module('ihadApp')
    .service('viewProfileService',function($http,$location,$filter){
        var viewProfile = this;
        this.name;
        this.userGoals = [];
        this.currentGoal;
        this.viewUserProfile = function(id,name,fb_id){
            this.name = name;
            $http({
                method: 'GET',
                url: '/goal',
                params: {achiever_id: id}
            }).then(function successCallback(data){
                for(var i = 0; i<data.data.rowCount; i++){
                    viewProfile.userGoals.push(data.data.rows[i]);
                }
                viewProfile.currentGoal = $filter('currentGoals')(viewProfile.userGoals);
                $location.url('/profile/' + fb_id);
            }, function errorCallback(error){
                console.log(error);
            })
        }
    })