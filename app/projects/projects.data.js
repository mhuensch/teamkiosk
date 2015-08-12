// ---------------------------------------------------------------------------------------------------------------------
// PROJECTS DATA
// This file allows the generation of mock test data for use during UI first development using Pyre.  Additionally,
// this data is "re-generated" in a pseudo random fashion each time the browser is generateed.  Finally, a few test
// methods are included to simulate the changing of data on the server.
// ---------------------------------------------------------------------------------------------------------------------

// TODO: @pyre figure out how to allow dev tools through pyre or with some assistance from project
MockData.ProjectsData = Ember.Object.extend(MockData.mixin, {
	needs: ['contributors'],

	generate: function() {

		var users = this.contributors;

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
					,"classes": this.randomNear(coverageSeed, 10, 0, 100).toFixed(2)
					,"methods": this.randomNear(coverageSeed, 10, 0, 100).toFixed(2)
					,"statements": this.randomNear(coverageSeed, 10, 0, 100).toFixed(2)
				}
				,"lastChange": {
					"id": 1
					,"by": this.random(users)
					,"on": dateSeed
				}
				,"durationHistory": [
					,{"duration": Math.floor((Math.random() * 100000)), "successful": true}
					,{"duration": Math.floor((Math.random() * 100000)), "successful": this.randomTruth(.75)}
					,{"duration": Math.floor((Math.random() * 100000)), "successful": this.randomTruth(.75)}
					,{"duration": Math.floor((Math.random() * 100000)), "successful": this.randomTruth(.75)}
					,{"duration": Math.floor((Math.random() * 100000)), "successful": this.randomTruth(.75)}
					,{"duration": Math.floor((Math.random() * 100000)), "successful": this.randomTruth(.75)}
					,{"duration": Math.floor((Math.random() * 100000)), "successful": this.randomTruth(.75)}
					,{"duration": Math.floor((Math.random() * 100000)), "successful": this.randomTruth(.75)}
					,{"duration": Math.floor((Math.random() * 100000)), "successful": this.randomTruth(.75)}
					,{"duration": Math.floor((Math.random() * 100000)), "successful": this.randomTruth(.75)}
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
	}
});

// FakeData.addProject = function(successful) {
// 	successful = successful;
// 	FakeData['/projects'].unshift(
// 		{
// 			"id":"TestApp" + FakeData['/projects'].length
// 			,"name":"Test_App_" + FakeData['/projects'].length
// 			,"duration": Math.floor((Math.random() * 1000))
// 			,"queuedOn": new Date()
// 			,"error": "This is an unfortunate design decision. I made frequent use of the {{bind-attr class=isFoo}} style, which automatically generated the is-foo class. Now I have to write class={{if isFoo 'is-foo'}}"
// 			,"successful": successful
// 			,"coverage": {
// 				"classes": (Math.random() * 100).toFixed(2),
// 				"methods": (Math.random() * 100).toFixed(2),
// 				"statements": (Math.random() * 100).toFixed(2)
// 			}
// 			,"lastChange": {
// 				"id": 1
// 				,"by": "someuser"
// 				,"on": new Date()
// 			}
// 		}
// 	)
// };


// FakeData.clearFailures = function() {
// 	FakeData['/projects'].forEach(function(project){
// 		Ember.set(project, 'successful', true)
// 	});
// };

// TODO: Add better test methods to:
// fail a project
// add a project
// pass a project
// remove a project
