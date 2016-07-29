"use strict";

angular.module('ihadApp')
    .component("profile", {
        templateUrl: "profile/profile-template.html",
        controller: ['userData','$scope', 'dateService','$http','goalService','$filter','checkInService','$location',
            function(userData, $scope, dateService, $http, goalService, $filter, checkInService,$location){
                $scope.checkInService = checkInService;
                $scope.goalService = goalService;
                $scope.title;
                $scope.goal;
                $scope.startDate;
                $scope.months = "1";
                $scope.currentDate = dateService.yyyymmddDateFormat(0,0);
                $scope.maxStartDate = dateService.yyyymmddDateFormat(1,0);
                $scope.profilePic = function(){return userData.picURL};
                $scope.name = function(){return userData.name};
                $scope.showGoalForm = false;
                $scope.goalTimeError = '';

                $scope.toggleGoalForm = function(){
                    $scope.showGoalForm = !$scope.showGoalForm;
                };
               
                $scope.saveGoal = function(){
                    var start = dateService.yyyymmddDateFormat(0,0,$scope.startDate);
                    var end = dateService.yyyymmddDateFormat(0,$scope.months,$scope.startDate);
                    $scope.goalTimeError = '';

                    if(goalService.verifyNoGoalTimeOverlap(start, end)){

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
                        goalService.userGoalsArray.push(data.data.rows[0]);
                    }, function errorCallback(error){
                        console.log(error);
                    })

                    } else {
                        $scope.goalTimeError = 'You can only have one goal at a time.';
                    }

                };

                $scope.saveCheckIn = function(){
                    var date = dateService.yyyymmddDateFormat(0,0);
                    var goal_id = goalService.currentGoal[0].id;
                    $http({
                        method: 'POST',
                        url: '/checkin',
                        params: {day: date, goal_id: goal_id}
                    }).then(function successCallback(data){
                        checkInService.currentCheckIns.push(data.data.rows[0]);
                        checkInService.currentCheckIns = $filter('orderBy')(checkInService.currentCheckIns, '-day');
                        checkInService.currentStreak = checkInService.calculateStreakByEndDate(checkInService.currentCheckIns[0].day, 0);
                        checkInService.findLongestStreak();
                        checkInService.hideCheckInBtn = checkInService.displayCheckInBtn();
                    }, function errorCallback(error){
                        console.log(error);
                    })
                };
            }
        ]
    });