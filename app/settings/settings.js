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
		// Normally this would return a list of settings not a single setting.
		// See notes in header for more information.
		return App.SettingsApi.query();
	}
});


App.SettingsController = Ember.Controller.extend(App.PropertyWatcher, {
	onModelChanged: function() {
		var model = this.get('model');
		if (!model) return;

		console.log('MODEL CHANGED!!');

		// Here we are watching the properties on the object explicitly.
		// If we wanted notifications per property [propertyChanged(name, current, previous)] or observe isDirty.
		this.watch(model, [
			'buildPolling',
			'projectRotation'
		]);
	}.observes('model')

	,saveSettings: function(model) {
		return App.SettingsApi.save(model);
	}

	,actions: {
		save: function(argument) {
			console.log('saving settings')
			var self = this;
			self.set('saving', true);
			self.saveSettings(self.get('model')).then(function(result) {
				// As we are already watching the properties needed, 
				// we only need to submit the result for re-watch
				console.log('saving')
				self.watch(result);
				self.set('saving', false);
			});
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
