"use strict";

angular.module("ihadApp")
    .filter('currentGoals', function(dateService){
        return function(goals){
            var newArray = [];
            var currentDate = dateService.yyyymmddDateFormat(0,0);   
            
            for(var i = 0; i < goals.length; i++){
                var goal_start = dateService.yyyymmddDateFormat(0,0,goals[i].start_date);
                var goal_end = dateService.yyyymmddDateFormat(0,0,goals[i].end_date);
                if(currentDate >= goal_start && currentDate <= goal_end){
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
    .filter('pastGoals', function(dateService){
        return function(goals){
            var newArray = [];
            var currentDate = dateService.yyyymmddDateFormat(0,0);

            for(var i=0; i<goals.length;i++){
                var goal_end = dateService.yyyymmddDateFormat(0,0,goals[i].end_date);
                if(currentDate > goal_end){
                    newArray.push(goals[i]);
                }
            }
            return newArray;
        }
    });


    