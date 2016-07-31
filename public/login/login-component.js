"use strict";
angular.module('ihadApp')
    .component('login',{
        templateUrl: 'login/login-template.html',
        controller: ['$scope', '$http', 'userData','$location','goalService',
            function($scope, $http, userData, $location, goalService){
                var ctrl = this;
                this.loginError = '';
                this.username = '';
                this.profilePicURL = '';
                $scope.FBLogin = function() {
                    FB.login(function(response) {
                        var token = response.authResponse.accessToken;
                        var uid = response.authResponse.userID;
                        if (response.authResponse) {
                        FB.api('/me',"get",{access_token: token, fields:'name,picture'}, function(response) {
                        userData.name = response.name;
                        userData.picURL = response.picture.data.url;
                        ctrl.checkLogin(userData.name, response.id);
                        });
                        } else {
                        console.log('User cancelled login or did not fully authorize.');
                        }
                    }, {scope:'public_profile', return_scopes: true});
                };

                this.checkLogin = function(name, fbID){
                    $http({
                        method: 'GET',
                        url: '/login',
                        params: {fb_id: fbID}
                    }).then(function successCallback(data){
                        if(data.data.rowCount > 0){
                            userData.id = data.data.rows[0].id;
                            goalService.getUserGoals(userData.id);
                            $location.url('/activeuser');
                        } else {
                            ctrl.saveProfile(name, fbID);
                        }
                    },function errorCallback(error){
                        console.log(error);
                    })
                };

                this.saveProfile = function(name,fbID){
                    $http({
                        method: 'POST',
                        url: '/login',
                        params: {name: name, fb_id: fbID}
                    }).then(function successCallback(data){
                        userData.id = data.data.rows[0].id;
                        goalService.getUserGoals(userData.id);
                        $location.url('/activeuser');
                    },function errorCallback(error){
                        console.log(error);
                    })
                };
                
            }
        ]
    });