"use strict";

angular.module('ihadApp')
    .component("activeuser", {
        templateUrl: "active-user/active-user-template.html",
        controller: ['userData','$scope', 'dateService','$http','goalService','$filter','checkInService','$location','$window','viewProfileService','logoutService',
            function(userData, $scope, dateService, $http, goalService, $filter, checkInService,$location,$window,viewProfileService,logoutService){
                $scope.logout = logoutService.logout;
                $scope.viewProfile = viewProfileService;
                $scope.checkInService = checkInService;
                $scope.goalService = goalService;
                $scope.user = userData;
                $scope.title;
                $scope.goal;
                $scope.startDate;
                $scope.months = "1";
                $scope.currentDate = dateService.yyyymmddDateFormat(0,0);
                $scope.maxStartDate = dateService.yyyymmddDateFormat(1,0);
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
                        goalService.getCurrentGoal();
                        $scope.title = '';
                        $scope.goal = '';
                        $scope.startDate = '';
                        $scope.months = "1";
                        $scope.toggleGoalForm();
                    }, function errorCallback(error){
                        console.log(error);
                    })

                    } else {
                        $scope.goalTimeError = 'Error: You can only have one goal at a time.';
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
                        checkInService.getCheckIns(goal_id);
                    }, function errorCallback(error){
                        console.log(error);
                    })
                };

            }
        ]
    });
