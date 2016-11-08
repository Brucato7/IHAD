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
            switch(month){
              case 4:
              case 6:
              case 9:
              case 11:
                if(day > 30){
                  day = day - 30;
                };
                break;
              case 2:
              if(year%4 === 0){
                if(day > 29){
                  day = day - 29;
                }
              }else if(day > 28){
                day = day - 28;
              };
              break;



            }
            if(day < 10){
                day = "0"+day;
            }
            return year + "-" + month + "-" + day;
        };
    });
