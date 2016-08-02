"use strict";

angular.module('ihadApp')
    .component('search', {
        templateUrl: 'search/search-template.html',
        controller:  ['userData','$scope', 'dateService','$http','goalService','$filter','checkInService','$location','$window','viewProfileService','logoutService',
            function(userData, $scope, dateService, $http, goalService, $filter, checkInService,$location,$window,viewProfileService,logoutService){
                $scope.logout = logoutService.logout;
                $scope.viewProfile = viewProfileService;
                $scope.checkInService = checkInService;
                $scope.goalService = goalService;
                $scope.user = userData;
                $scope.allGoals;
                $scope.currentDate = dateService.yyyymmddDateFormat(0,0);
                $scope.viewGoals = '';
                $scope.sortBy = 'start_date';
                $scope.searchBy = 'all';
                $scope.searchByAll = true;
                $scope.searchByName = false;
                $scope.searchByGoal = false;
                $scope.searchByDescription = false;

                $scope.showSearchBy = function(){
                    $scope.search.$ = "";
                    $scope.search.name = "";
                    $scope.search.title = "";
                    $scope.search.description = "";
                    switch($scope.searchBy){
                        case 'all':
                            $scope.searchByAll = true;
                            $scope.searchByName = false;
                            $scope.searchByGoal = false;
                            $scope.searchByDescription = false;
                            break;

                        case 'name':
                            $scope.searchByAll = false;
                            $scope.searchByName = true;
                            $scope.searchByGoal = false;
                            $scope.searchByDescription = false;
                            break;

                        case 'goal':
                            $scope.searchByAll = false;
                            $scope.searchByName = false;
                            $scope.searchByGoal = true;
                            $scope.searchByDescription = false;
                            break;

                        case 'description':
                            $scope.searchByAll = false;
                            $scope.searchByName = false;
                            $scope.searchByGoal = false;
                            $scope.searchByDescription = true;
                            break;
                    }
                };

                $scope.getAllGoals = function(){
                    $http({
                        method: 'GET',
                        url: '/searchgoals'
                    }).then(function successCallback(data){
                        $scope.allGoals = data.data.rows;
                    },function errorCallback(error){
                        console.log(error);
                    })
                };

                $scope.getGoalView = function(){
                    var goals = $scope.allGoals;
                    switch($scope.viewGoals){
                        case 'past':
                            goals = $filter('pastGoals')(goals);
                            break;
                        case 'present':
                            goals = $filter('currentGoals')(goals);
                            break;
                        case 'future':
                            goals = $filter('futureGoals')(goals);
                            break;
                    }
                    return goals;
                }
                
                $scope.getAllGoals();
            }
        ]
    });