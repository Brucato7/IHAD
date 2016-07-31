"use strict";
var express = require("express");
var app = express();
var database = require('./database-manager.js');

app.use(express.static("public"));
app.listen(3000,function(){
	console.log("listening on port", 3000);
});

app.route('/login')
	.post(function(request, response){
		database.saveProfile(request.query.name, request.query.fb_id,
			function(result){
				response.send(result);
			})
	})
	.get(function(request, response){
		database.getProfileByFbId(request.query.fb_id,
			function(result){
				response.send(result);
			})
	});

app.route('/goal')
	.post(function(request, response){
		database.saveGoal(
			request.query.name,
			request.query.description,
			request.query.start_date,
			request.query.end_date,
			request.query.achiever_id,
			function(result){
				response.send(result);
			})
	})
	.get(function(request, response){
		database.getAchieverGoals(request.query.achiever_id,
			function(result){
				response.send(result);
			})
	});

app.route('/checkin')
	.get(function(request, response){
		database.getDayChecksByGoal(request.query.goal_id,
			function(result){
				response.send(result);
			})
	})
	.post(function(request, response){
		database.saveDayCheck(request.query.day, request.query.goal_id,
			function(result){
				response.send(result);
			})
	});

app.route('/searchgoals')
	.get(function(request, response){
		database.getAllGoals(
			function(result){
				response.send(result);
			})
	});