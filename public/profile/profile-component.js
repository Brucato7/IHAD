"use strict";

angular.module('ihadApp')
    .component("profile", {
        templateUrl: "profile/profile-template.html",
        controller: ['userData','$scope', 'dateService','$http','goalService','$filter',
            function(userData, $scope, dateService, $http, goalService, $filter){
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

                $scope.test = function(){
                    console.log(goalService.userGoalsArray);
                    console.log(goalService.currentGoal);
                    console.log($scope.userGoals());
                    console.log($scope.currentGoal());
                }
            }
        ]
    });