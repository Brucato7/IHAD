"use strict";

angular.module('ihadApp')
    .service('checkInService', function($http, dateService, $filter){
        var checkin = this;
        this.currentCheckIns = [];
        this.longestStreak = [];
        this.currentStreak = [];
        this.hideCheckInBtn;

        this.getCheckIns = function(goal_id){
            $http({
                method: 'GET',
                url: '/checkin',
                params: {goal_id: goal_id}
            }).then(function successCallback(data){
                for(var i=0; i < data.data.rowCount;i++){
                    checkin.currentCheckIns.push(data.data.rows[i]);
                }
                checkin.currentCheckIns = $filter('orderBy')(checkin.currentCheckIns, '-day');
                checkin.currentStreak = checkin.calculateStreakByEndDate(checkin.currentCheckIns[0].day, 0);
                checkin.findLongestStreak();
                checkin.hideCheckInBtn = checkin.displayCheckInBtn();
            }, function errorCallback(error){
                console.log(error);
            })
        };

        this.displayCheckInBtn = function(){
            var today = $filter('date')(dateService.yyyymmddDateFormat(0,0), 'shortDate');
            var lastCheckInDate = $filter('date')(this.currentCheckIns[0].day, 'shortDate');
            if(today === lastCheckInDate){
                return true;
            } else {
                return false;
            }
        };
        
        this.calculateStreakByEndDate = function(dateString,startingIndex){
            var d = new Date(dateString);
            var day = d.getDate();
            var month = d.getMonth();
            var year = d.getFullYear();
            var checkInStreak = [];
                        
            for(var i=startingIndex;i<this.currentCheckIns.length; i++){
                var checkDay = new Date(this.currentCheckIns[i].day);
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

                if(checkDay === day){
                    checkInStreak.push(this.currentCheckIns[i]);
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
           for(var i=0;i < this.currentCheckIns.length; i += streakHolder.length){
                streakHolder = this.calculateStreakByEndDate(this.currentCheckIns[i].day, i);
                if(streakHolder.length > longest){
                    longest = streakHolder.length;
                    this.longestStreak = streakHolder;
                }                
            }
        };


    })