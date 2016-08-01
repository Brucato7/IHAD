"use strict";

angular.module('ihadApp')
    .service('viewProfileService',function($http,$location,$filter,dateService){
        var viewProfile = this;
        this.name;
        this.userGoals = [];
        this.currentGoal;
        this.userLongestCheckInStreak = [];
        this.userCurrentCheckInStreak = [];
        this.userCheckIns = [];
        this.viewUserProfile = function(id,name,fb_id){
            this.userGoals = [];
            this.name = name;
            $http({
                method: 'GET',
                url: '/goal',
                params: {achiever_id: id}
            }).then(function successCallback(data){
                for(var i = 0; i<data.data.rowCount; i++){
                    viewProfile.userGoals.push(data.data.rows[i]);
                }
                viewProfile.checkForAccountabilityPartners(id);
                $location.url('/profile/' + fb_id);
            }, function errorCallback(error){
                console.log(error);
            })
        }

        this.checkForAccountabilityPartners = function(id){
            $http({
                method: 'GET',
                url: '/accountability',
                params: {achiever_id: id}
            }).then(function successCallback(data){
                for(var i = 0; i < data.data.rowCount; i++){
                    for(var j = 0; j < viewProfile.userGoals.length; j++){
                        if(data.data.rows[i].id === viewProfile.userGoals[j].id){
                            viewProfile.userGoals[j] = data.data.rows[i];
                        }
                    }
                }
                viewProfile.currentGoal = $filter('currentGoals')(viewProfile.userGoals);
                viewProfile.getUsersCheckIns(viewProfile.currentGoal[0].id);
            }, function errorCallback(error){
                console.log(error);
            })
        };

        this.getUsersCheckIns = function(goal_id){

            this.userLongestCheckInStreak = [];
            this.userCurrentCheckInStreak = [];
            this.userCheckIns = [];

            $http({
                method: 'GET',
                url: '/checkin',
                params: {goal_id: goal_id}
            }).then(function successCallback(data){
                for(var i=0; i < data.data.rowCount;i++){
                    viewProfile.userCheckIns.push(data.data.rows[i]);
                }
                viewProfile.userCheckIns = $filter('orderBy')(viewProfile.userCheckIns, '-day');
                var d = new Date();
                viewProfile.userCurrentCheckInStreak = viewProfile.calculateStreakByEndDate(d, 0);
                viewProfile.findLongestStreak();
            }, function errorCallback(error){
                console.log(error);
            })
        };

         this.calculateStreakByEndDate = function(dateString,startingIndex){
            var d = new Date(dateString);
            var day = d.getDate();
            var month = d.getMonth();
            var year = d.getFullYear();
            var checkInStreak = [];
                        
            for(var i=startingIndex;i<this.userCheckIns.length; i++){
                var checkDay = new Date(this.userCheckIns[i].day);
                var checkMonth = checkDay.getMonth();
                checkDay = checkDay.getDate();

                if(day <= 0){
                    month--;
                    if(month < 0){
                        month = 11;
                    }
                    switch(month){
                        case 0:
                        case 2:
                        case 4:
                        case 6:
                        case 7:
                        case 9:
                        case 11:
                            day = 31;
                            break;
                        case 3:
                        case 5:
                        case 8:
                        case 10:
                            day = 30;
                            break;
                        case 1:
                            if((year%4 === 0)){
                                day = 29;
                            }else {
                                day = 28;
                            }
                    }
                } //End of if day is less than or equal to 0

                if(checkDay === day && checkMonth === month){
                    checkInStreak.push(this.userCheckIns[i]);
                    day--;
                } else if(i === 0){
                    //do nothing because streak does not have to include current day
                    day--;
                } else {
                    i = 9999999999;
                }
            }
           return checkInStreak; 
        };

        this.findLongestStreak = function(){
            var streakHolder;
            var longest = 0;
           for(var i=0;i < this.userCheckIns.length; i += streakHolder.length){
                streakHolder = this.calculateStreakByEndDate(this.userCheckIns[i].day, i);
                if(streakHolder.length > longest){
                    longest = streakHolder.length;
                    this.userLongestCheckInStreak = streakHolder;
                }                
            }
        };
    })