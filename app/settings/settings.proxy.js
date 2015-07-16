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