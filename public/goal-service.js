"use strict";

angular.module('ihadApp')
    .service('goalService', function($http, dateService){
        var goal = this;
        this.currentGoal = [];
        this.userGoalsArray;
        this.getUserGoals = function(userID){
            $http({
                method: 'GET',
                url: '/goal',
                params: {achiever_id: userID}
            }).then(function successCallback(data){
                goal.userGoalsArray = data.data.rows;
                goal.getCurrentGoal();
            }, function errorCallback(error){
                console.log(error);
            })
        };
        this.getCurrentGoal = function(){
            var currentDate = dateService.yyyymmddDateFormat(0,0);
            
            for(var i = 0; i < this.userGoalsArray.length; i++){
                if(currentDate >= this.userGoalsArray[i].start_date && currentDate <= this.userGoalsArray[i].end_date){
                   this.currentGoal.push(this.userGoalsArray[i]);
                }
            }
        }
    });