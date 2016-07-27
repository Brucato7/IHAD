"use strict";

angular.module('ihadProfile')
    .component("profile", {
        templateUrl: "profile/profile-template.html",
        controller: ['userData','$scope', 'dateService','$http',
            function(userData, $scope, dateService, $http){
                $scope.title;
                $scope.goal;
                $scope.startDate;
                $scope.months = "1";
                $scope.minStartDate = dateService.yyyymmddDateFormat(0,0);
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
            }]
    });