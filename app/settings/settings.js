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
	saveTimeout: null

	// TODO: Covert ms to seconds
	,onModelChanged: function() {
		var model = this.get('model');
		if (!model) return;

		// Here we are watching the properties on the object explicitly.
		// If we wanted notifications per property [propertyChanged(name, current, previous)] or observe isDirty.
		this.watch(model, [
			'buildPolling'
			,'projectRotation'
		]);
	}.observes('model').on('init')

	,onOptionChanged:function() {
		var self = this;

		// We clear the previous timout immidately, because we don't want to end up running multiple saves.
		clearTimeout(self.saveTimeout);

		// By delaying the change for 1 second, we 'debounce' the save function.  This can be very important
		// when auto-saving rapid changes from user input fields.
		self.saveTimeout = setTimeout(function() {
			App.SettingsApi.save(self.get('model')).then(function(settings){
				if(self.hasChanges(self.get('model'), settings)) return;
				self.watch(settings);
			});
		}, 1000);
	}.observes('model.buildPolling', 'model.projectRotation')
});
