// ---------------------------------------------------------------------------------------------------------------------
// SETTINGS CLIENT
// This file should contain all the additional logic for App.Settings.  Controller, route, etc. logic should be added
// as needed.  This file should NOT contain other extensions or other utility methods.
//
// These scripts break from convention in that the route "settings" does not represent an index of settings, but instead
// propertys of the settings for the individual user.  As this is what most users are likely to expect in terms of the 
// route and where most developers are likely to look for "settings" specific logic, we are breaking from the pod 
// conventions we follow in other places in this application.
// ---------------------------------------------------------------------------------------------------------------------

App.Router.map(function () {
	this.resource('settings');
});


App.SettingsRoute = Ember.Route.extend({
	model: function() {
		var self = this;

		// Normally this would return a list of settings not a single setting.
		// See notes in header for more information.
		return  new Ember.RSVP.Promise(function (resolve, reject) {
			App.SettingsApi.query().then(function(settings) {
				App.ProjectsApi.query().then(function(projects) {
					
					projects.forEach(function(project) {
						Ember.set(project, 'inDashboard', settings.dashboardProjects.indexOf(project.id) > -1);
						Ember.set(project, 'ignored', settings.ignoredProjects.indexOf(project.id) > -1);
					});

					self.controllerFor('settings').set('projects', projects);
					resolve(settings);
				});
			});
		});
	}
});


App.SettingsController = Ember.Controller.extend(App.PropertyWatcher, {
	// TODO: Covert ms to seconds
	onModelChanged: function() {
		var model = this.get('model');
		if (!model) return;

		// Here we are watching the properties on the object explicitly.
		// If we wanted notifications per property [propertyChanged(name, current, previous)] or observe isDirty.
		this.watch(model, [
			'buildPolling'
			,'projectRotation'
			,'ignoredProjects.@each'
			,'dashboardProjects.@each'
		]);
	}.observes('model')

	,actions: {
		save: function(argument) {
			var self = this;
			self.set('saving', true);

			var projects = self.get('projects');

			var settings = self.get('model');
			settings.dashboardProjects.clear();
			settings.ignoredProjects.clear();

			projects.forEach(function(project){
				if (project.ignored) {
					settings.ignoredProjects.pushObject(project.id);
				} else if (project.inDashboard) {
					settings.dashboardProjects.pushObject(project.id);
				} else {
					return;
				}
				
			});

			App.SettingsApi.save(settings).then(function(result) {
				// As we are already watching the properties needed, 
				// we only need to submit the result for re-watch
				self.watch(result);
				self.set('saving', false);
			});
		}

		,dashboardChanged: function(value, prefix, postfix) {
			var model = this.get('model');
			var index = model.dashboardProjects.indexOf(postfix);

			if (value && index === -1) {
				model.dashboardProjects.pushObject(postfix);
			} else if (index > -1) {
				model.dashboardProjects.removeAt(index, 1);
			}

			if (!value) return;

			var project = this.get('projects').filter(function(project){
				if (!project.id === postfix) return;
				return project;
			})[0];

		}

		,ignoredChanged: function(value, prefix, postfix) {
			var model = this.get('model');
			var index = model.ignoredProjects.indexOf(postfix);

			if (value && index === -1) {
				model.ignoredProjects.pushObject(postfix);
			} else if (index > -1) {
				model.ignoredProjects.removeAt(index, 1);
			}
		}
	}
});


// TODO: replace this with a real api once we add user authentication
// This logic should be specific to an individual user and not the entire site/application.  However, in order to get
// a good MVP, we are storing the settings for the application in local storage.  This means that the experience will
// be diffrent per device rather than per user.
App.SettingsApi = {
	url: '/settings'
	
	,query: function (args) {
		var self = this;
		return new Ember.RSVP.Promise(function (resolve, reject) {
			self.wait().then(function () {
				var settings = JSON.parse(localStorage.getItem('settings'));
				if (!settings) {
					settings = {
						"buildPolling": "5000"
						,"projectRotation": "5000"
						, "dashboardProjects": []
						, "ignoredProjects": []
					}
				}
				resolve(settings);
			});
		});
	}

	,read: function (id) {
		var self = this;
		return new Ember.RSVP.Promise(function (resolve, reject) {
			self.wait().then(function () {
				var result = localStorage.getItem('settings');
				if (!result) return null;
				resolve(result[id]);
			});
		});
	}

	,save: function (model) {
		var self = this;
		return new Ember.RSVP.Promise(function (resolve, reject) {
			self.wait().then(function () {
				localStorage.setItem('settings', JSON.stringify(model));
				resolve(model);
			});
		});
	}

	,delete: function (id) {
		var self = this;
		return new Ember.RSVP.Promise(function (resolve, reject) {
			var settings = localStorage.getItem('settings');
			if (!settings) return;

			self.wait().then(function () {
				settings = JSON.parse(settings);
				delete settings[id];
				localStorage.setItem('settings', JSON.stringify(settings));
				resolve(settings);
			});
		});
	}

	,wait: function() {
		return new Ember.RSVP.Promise(function (resolve) {
			setTimeout(resolve, 2000);
		});
	}
};
