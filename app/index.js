window.App = Ember.Application.create({
	LOG_TRANSITIONS:           true   // basic logging of successful transitions
	,LOG_TRANSITIONS_INTERNAL: true   // detailed logging of all routing steps
	,LOG_ACTIVE_GENERATION:    true   // log when a controller or route is generated

	,ready: function () {
		console.log('Application ready');
	}

});


App.IndexRoute = Ember.Route.extend({
	beforeModel: function () {
		this.transitionTo('dashboard');
	}
});


App.LoadingRoute = Ember.Route.extend({
	renderTemplate: function() {
		this.render('components/loading-window');
	}
});


// TODO: @pyre add property watcher to pyre
App.PropertyWatcher = Ember.Mixin.create({
	isDirty: false

	,watch: function(model, properties) { 
		var self = this;
		properties = properties || self.get('_properties');

		var previous = {};
		$.extend(true, previous, model);
		self.set('model', model);
		self.set('previous', previous);
		self.set('isDirty', false);
		self.set('_properties', properties);
	}

	,propertyChanged: function(name, current, previous) {
		// This function is intentionally left empty so that the user can override it.
	}

	,hasChanges: function (current, previous) {
		current = current || this.get('model');
		previous = previous || this.get('previous');

		// If objects match exactly, there have been no changes.
		if (current === previous) return false;

		// If both one of the objects don't have a value, there have been changes
		// as if they were both null or undefined, they would have matched above.
		if (!current || !previous) return true;

		// If their lengths don't match, then there have been changes.
		if (current.length != previous.length) return true;

		if (previous instanceof Array) {
			for (var i = 0; i < previous.length; ++i) {
				if (this.hasChanges(previous[i], current[i])) return true;
			}
			return false;
		} else if (previous instanceof Object) {
			for (var prop in previous) {
				if (this.hasChanges(previous[prop], current[prop])) return true;
			}
			return false;
		}

		return current !== previous;
	}

	,resetChanges: function() {
		this.set('model', this.get('previous'));
	}

	,_onWatchChanged: function() {
		var self = this;

		var properties = self.get('_properties');
		if (!properties) {
			console.log('Not watching model because there were no properties provided.');
			return;
		} 

		var model = self.get('model')
		if (!model) {
			console.log('Not watching model because the model was null.');
			return;
		} 

		properties.forEach(function (prop) {
			Ember.addObserver(model, prop, self, self._onPropertyChanged);
		});
	}.observes('_properties', 'model')

	,_onPropertyChanged: function (model, watching) {
		var propName = watching.replace(new RegExp('.@each$'), '');
		var current = this.get('model.' + propName);
		var previous = this.get('previous.' + propName);

		this.set('isDirty', this.hasChanges());
		this.propertyChanged(propName, current, previous);
	}

});