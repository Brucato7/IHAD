"use strict";

angular.module('ihadApp')
    .component("profile", {
        templateUrl: "profile/profile-template.html",
        controller: ['userData','$scope', 'dateService','$http','goalService','$filter','checkInService',
            function(userData, $scope, dateService, $http, goalService, $filter, checkInService){
                $scope.currentCheckInStreak = function(){ return checkInService.currentStreak;};
                $scope.longestCheckInStreak = function(){ return checkInService.longestStreak;};
                $scope.currentCheckIns = function(){return checkInService.currentCheckIns;};
                $scope.userGoals = function(){return goalService.userGoalsArray;};
                $scope.currentGoal = function(){return goalService.currentGoal;};
                $scope.title;
                $scope.goal;
                $scope.startDate;
                $scope.months = "1";
                $scope.currentDate = dateService.yyyymmddDateFormat(0,0);
                $scope.maxStartDate = dateService.yyyymmddDateFormat(1,0);
                $scope.profilePic = function(){return userData.picURL};
                $scope.name = function(){return userData.name};
                $scope.showGoalForm = false;
                $scope.toggleGoalForm = function(){
                    $scope.showGoalForm = !$scope.showGoalForm;
                };
               
                $scope.saveGoal = function(){
                    var start = dateService.yyyymmddDateFormat(0,0,$scope.startDate);
                    var end = dateService.yyyymmddDateFormat(0,$scope.months,$scope.startDate);

                    $http({
                        method: 'POST',
                        url: '/goal',
                        params: {
                            name: $scope.title,
                            description: $scope.goal,
                            start_date: start,
                            end_date: end,
                            achiever_id: userData.id
                        }
                    }).then(function successCallback(data){
                        console.log(data);
                    }, function errorCallback(error){
                        console.log(error);
                    })

                };

                $scope.saveCheckIn = function(){
                    var date = dateService.yyyymmddDateFormat(0,0);
                    var goal_id = goalService.currentGoal[0].id;
                    $http({
                        method: 'POST',
                        url: '/checkin',
                        params: {day: date, goal_id: goal_id}
                    }).then(function successCallback(data){
                        console.log(data);
                    }, function errorCallback(error){
                        console.log(error);
                    })
                };
              }
        ]
    });