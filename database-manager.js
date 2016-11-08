"use strict";
var Pool = require('pg').Pool;

process.on("unhandledRejection", function(e){
	console.log(e.message, e.stack);
}); //error code

module.exports = (function(){
  var config = {
    user: 'test_user',
    database: 'IHAD',
    password: 'password',
    host: 'localhost'
  };

  var pool = new Pool(config);

  var saveProfile = function(name, fb_id, callback){
    pool.query(
    "INSERT INTO person (name,fb_id)" +
    "VALUES ($1,$2) RETURNING id", [name,fb_id], function(error, result){
      if(error){
        console.error(error);
      }else{
        callback(result);
      }
    })
  };

  var getProfileByFbId = function(fb_id, callback){
    pool.query(
      "SELECT * FROM person WHERE fb_id = $1", [fb_id], function(error, result){
        if(error){
          console.error(error);
        }else{
          callback(result);
        }
      }
    )
  };

  var saveGoal = function(title, description, start_date, end_date, achiever_id, callback){
    pool.query(
      "INSERT INTO goal (title,description,start_date,end_date,achiever_id)"+
      "VALUES ($1,$2,$3,$4,$5) RETURNING *", [title, description, start_date, end_date, achiever_id],
      function(error, result){
        if(error){
          console.error(error);
        }else{
          callback(result);
        }
      }
    )
  };

  var getAchieverGoals = function(achiever_id, callback){
    pool.query(
      "SELECT * FROM goal WHERE achiever_id = $1", [achiever_id],
      function(error, result){
        if(error){
          console.error(error);
        }else{
          callback(result);
        }
      }
    )
  };

  var getDayChecksByGoal = function(goal_id, callback){
    pool.query(
      "SELECT * FROM daycheck WHERE goal_id = $1", [goal_id],
      function(error, result){
        if(error){
          console.error(error);
        }else{
          callback(result);
        }
      }
    )
  };

	var saveDayCheck = function(day, goal_id, callback){
    pool.query(
      "INSERT INTO daycheck (day,goal_id)"+
			"VALUES ($1,$2)", [day,goal_id],
      function(error, result){
        if(error){
          console.error(error);
        }else{
          callback(result);
        }
      }
    )
  };

	var getAllGoals = function(callback){
    pool.query(
      "SELECT person.*,goal.* FROM goal INNER JOIN person ON goal.achiever_id=person.id",[],
      function(error, result){
        if(error){
          console.error(error);
        }else{
          callback(result);
        }
      }
    )
  };

	var getGoalsWithAccountabilityPartners = function(achiever_id, callback){
    pool.query(
      "SELECT person.*,goal.* FROM goal INNER JOIN person ON goal.accountability_id=person.id WHERE goal.achiever_id = $1",
			[achiever_id],
      function(error, result){
        if(error){
          console.error(error);
        }else{
          callback(result);
        }
      }
    )
  };

	var updateAccountabilityPartner = function(goal_id, accountability_id, callback){
    pool.query(
      "UPDATE goal SET accountability_id=$1 WHERE id=$2",
			[accountability_id, goal_id],
      function(error, result){
        if(error){
          console.error(error);
        }else{
          callback(result);
        }
      }
    )
  };

	var getGoalsWithAchievers = function(accountability_id, callback){
    pool.query(
      "SELECT goal.*,person.* FROM goal INNER JOIN person ON goal.achiever_id=person.id WHERE goal.accountability_id = $1",
			[accountability_id],
      function(error, result){
        if(error){
          console.error(error);
        }else{
          callback(result);
        }
      }
    )
  };

  return {
    saveProfile: saveProfile,
    getProfileByFbId: getProfileByFbId,
    saveGoal: saveGoal,
    getAchieverGoals: getAchieverGoals,
    getDayChecksByGoal: getDayChecksByGoal,
    saveDayCheck: saveDayCheck,
    getAllGoals: getAllGoals,
    getGoalsWithAccountabilityPartners: getGoalsWithAccountabilityPartners,
    updateAccountabilityPartner: updateAccountabilityPartner,
    getGoalsWithAchievers: getGoalsWithAchievers
  };
})();
