"use strict";

angular.module("ihadApp")
    .filter('currentGoal', function(dateService){
        return function(goals){
            var newArray = [];
            var currentDate = dateService.yyyymmddDateFormat(0,0);   
            
            for(var i = 0; i < goals.length; i++){
                if(currentDate >= goals[i].start_date && currentDate <= goals[i].end_date){
                    newArray.push(goals[i]);
                }
            }
            return newArray;
        }
    })
    .filter('futureGoals', function(dateService){
        return function(goals){
            var newArray = [];
            var currentDate = dateService.yyyymmddDateFormat(0,0);

            for(var i=0; i<goals.length;i++){
                var goal_start = dateService.yyyymmddDateFormat(0,0,goals[i].start_date)
                if(goal_start > currentDate){
                    newArray.push(goals[i]);
                }
            }
            return newArray;
        }
    })