"use strict";

angular.module('ihadApp')
    .service('goalService', function($http, dateService, checkInService, $filter){
        var goal = this;
        this.currentGoal = [];
        this.userGoalsArray = [];
        this.partnersGoals = [];


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
            this.currentGoal = [];
            var currentDate = dateService.yyyymmddDateFormat(0,0);
                       
            for(var i = 0; i < this.userGoalsArray.length; i++){

                var goal_start = dateService.yyyymmddDateFormat(0,0,this.userGoalsArray[i].start_date);
                var goal_end = dateService.yyyymmddDateFormat(0,0,this.userGoalsArray[i].end_date);

                if(currentDate >= goal_start && currentDate <= goal_end){
                   this.currentGoal.push(this.userGoalsArray[i]);
                }
            }
            checkInService.getCheckIns(this.currentGoal[0].id);
        };


        this.verifyNoGoalTimeOverlap = function(start, end){     

            for(var i = 0; i < this.userGoalsArray.length; i++){

                var goal_start = dateService.yyyymmddDateFormat(0,0,this.userGoalsArray[i].start_date);
                var goal_end = dateService.yyyymmddDateFormat(0,0,this.userGoalsArray[i].end_date);

                if(start >= goal_start && start <= goal_end){
                   //this goal overlaps time goal[i]
                   return false;
                } else {
                    if(end >= goal_start && end <= goal_end){
                        //this goal overlaps time goal[i]
                        return false;
                    }
                }
            }
            return true;
        };

        this.getPartnersGoals = function(user_id){
            $http({
                mehtod: 'GET',
                url: '/encourage',
                params: {accountability_id: user_id}
            }).then(function successCallback(data){
                goal.partnersGoals = $filter('currentAndFutureGoals')(data.data.rows);
            }, function errorCallback(error){
                console.log(error);
            })
        };


    });