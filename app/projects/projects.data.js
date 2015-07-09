// ---------------------------------------------------------------------------------------------------------------------
// PROJECTS DATA
// This file allows the generation of mock test data for use during UI first development using Pyre.  Additionally,
// this data is "re-generated" in a pseudo random fashion each time the browser is refreshed.  Finally, a few test
// methods are included to simulate the changing of data on the server.
// ---------------------------------------------------------------------------------------------------------------------

// TODO: @pyre make it possible in pyre not to attach this to window.
// TODO: @pyre figure out how to allow dev tools through pyre or with some assistance from project
// TODO: @pyre figure out how to adjust one set of fake data using another ... i.e. projects -> builds
window.Data = window.Data || [];
window.Data['/projects'] = function() {

	var randomStatus = function() {
		if (Math.random() < .75) return true;
		return false;
	}

	var numberNear = function(seed, offset) {
		var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
		var offset = Math.random() * offset * plusOrMinus;
		var result = offset + seed;
		if (result > 100) result = 100;
		if (result < 0) result = 0;

		return result;
	}

	var users = [
		'Bruce Wayne'
		, 'Clark Kent'
		, 'Barbara Gordon'
		, 'Selina Kyle'
		, 'Steven Rogers'
		, 'Scott Summers'
		, 'Reed Richards'
		, 'Kurt Wagner'
		, 'Anna Marie'
		, 'Peter Parker'
	];
	var randomUser = function() {
		return users[Math.floor(Math.random() * 10)];
	}

	var projects = [
		'express'
		, 'request'
		, 'socket.io'
		, 'mongoose'
		, 'underscore'
		, 'grunt'
		, 'gulp'
		, 'moment'
		, 'mocha'
		, 'commander'
		, 'browserify'
		, 'passport'
		, 'nodemailer'
		, 'mongodb'
		, 'forever'
		, 'bower'
		, 'lodash'
		, 'colors'
		, 'chalk'
		, 'redis'
		, 'hapi'
		, 'cheerio'
		, 'phantom.js'
		, 'velocity'
		, 'node.js'
	];
	var result = [];
	for(var i=0; i<25; ++i) {

		var today = new Date();
		var coverageSeed = Math.random() * 100;
		var dateSeed = (new Date()).setHours(
			Math.floor(new Date().getHours() - Math.random() * 100)
		);

		var project = {
			"id":"TestApp" + i
			,"name": projects[i]
			,"duration": Math.floor((Math.random() * 1000))
			,"queuedOn": dateSeed
			,"startedOn": dateSeed
			,"finishedOn": dateSeed
			,"successful": true
			,"coverage": {
				"total": 0
				,"classes": numberNear(coverageSeed, 10).toFixed(2)
				,"methods": numberNear(coverageSeed, 10).toFixed(2)
				,"statements": numberNear(coverageSeed, 10).toFixed(2)
			}
			,"lastChange": {
				"id": 1
				,"by": randomUser()
				,"on": dateSeed
			}
			,"durationHistory": [
				,{"duration": Math.floor((Math.random() * 100000)), "successful": true}
				,{"duration": Math.floor((Math.random() * 100000)), "successful": randomStatus()}
				,{"duration": Math.floor((Math.random() * 100000)), "successful": randomStatus()}
				,{"duration": Math.floor((Math.random() * 100000)), "successful": randomStatus()}
				,{"duration": Math.floor((Math.random() * 100000)), "successful": randomStatus()}
				,{"duration": Math.floor((Math.random() * 100000)), "successful": randomStatus()}
				,{"duration": Math.floor((Math.random() * 100000)), "successful": randomStatus()}
				,{"duration": Math.floor((Math.random() * 100000)), "successful": randomStatus()}
				,{"duration": Math.floor((Math.random() * 100000)), "successful": randomStatus()}
				,{"duration": Math.floor((Math.random() * 100000)), "successful": randomStatus()}
			]
		};

		project.coverage.total = (
			+project.coverage.classes
			+ +project.coverage.methods
			+ +project.coverage.statements
		)/3;

		result.push(project);
	}
	
	return result;
}();


window.Data.addProject = function(successful) {
	successful = successful;
	window.Data['/projects'].unshift(
		{
			"id":"TestApp" + window.Data['/projects'].length
			,"name":"Test_App_" + window.Data['/projects'].length
			,"duration": Math.floor((Math.random() * 1000))
			,"queuedOn": new Date()
			,"error": "This is an unfortunate design decision. I made frequent use of the {{bind-attr class=isFoo}} style, which automatically generated the is-foo class. Now I have to write class={{if isFoo 'is-foo'}}"
			,"successful": successful
			,"coverage": {
				"classes": (Math.random() * 100).toFixed(2),
				"methods": (Math.random() * 100).toFixed(2),
				"statements": (Math.random() * 100).toFixed(2)
			}
			,"lastChange": {
				"id": 1
				,"by": "someuser"
				,"on": new Date()
			}
		}
	)
};


window.Data.clearFailures = function() {
	window.Data['/projects'].forEach(function(project){
		Ember.set(project, 'successful', true)
	});
};

// TODO: Add better test methods to:
// fail a project
// add a project
// pass a project
// remove a project
