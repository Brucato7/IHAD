"use strict";

angular.module('ihadApp')
    .service('dateService', function(){
        this.yyyymmddDateFormat = function(yearOffset, monthOffset, startingDate){
            if(startingDate === undefined){
                var d = new Date();
            }else{
                var d = new Date(startingDate);
            }
            var year = d.getFullYear() + Number(yearOffset);
            var day = d.getDate();
            var month = d.getMonth() + 1 + Number(monthOffset);
            if(month > 12){
                month = month - 12;
                year++;
            }
            if(month < 10){
                month = "0"+month;
            }
            return year + "-" + month + "-" + day;
        };
    });