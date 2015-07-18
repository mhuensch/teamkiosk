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
	arrayWillChange: Ember.K
	
	,isDirty: false

	,watch: function(model, properties) { 
		var self = this;
		properties = properties || self.get('_properties');

		var previous = null;
		if (model instanceof Array) {
			previous = $.extend(true, [], model);
		} else if (model instanceof Object) {
			previous = $.extend(true, {}, model);
		}
		
		self.set('watching', model);
		self.set('previous', previous);
		self.set('isDirty', false);
		self.set('_properties', properties);
	}

	,propertyChanged: function(model, property, current, previous) {
		// This function is intentionally left empty so that the user can override it.
	}

	,hasChanges: function (current, previous) {
		current = current || this.get('watching');
		previous = previous || this.get('previous');

		// If objects match exactly, there have been no changes.
		if (current === previous) return false;

		// If both one of the objects don't have a value, there have been changes
		// as if they were both null or undefined, they would have matched above.
		if (!current || !previous) return true;

		return JSON.stringify(current) !== JSON.stringify(previous);
	}

	,resetChanges: function() {
		this.set('watching', this.get('previous'));
	}

	,onWatchChanged: function() {
		var self = this;

		var properties = self.get('_properties');
		if (!properties) {
			console.log('Not watching model because there were no properties provided.');
			return;
		} 

		var model = self.get('watching')
		if (!model) {
			console.log('Not watching model because the model was null.');
			return;
		} 

		var items = [];
		if (model instanceof Array) {
			items=model;
		} else if (model instanceof Object) {
			items.push(model)
		}	

		for(var i=0; i<items.length; i++) {
			var self = this;
			
			properties.forEach(function (prop) {
				if (prop.indexOf('.@each') === -1) {
					Ember.addObserver(items[i], prop, self, self.onPropertyChanged);
				} else {
					var newProp = prop.replace('.@each', '');

					if (!items[i][newProp]) {
						items[i][newProp] = [];
						console.log('added empty array')
					}

					items[i][newProp].addArrayObserver(self)
				}
				
			});
		}
	}.observes('_properties', 'watching')


	,arrayDidChange: function(array, start, removeCount, addCount) {
		this.set('isDirty', this.hasChanges());

		// TODO: call _onProperty changed with the correct item in the array.
		this.propertyChanged(array, start, removeCount, addCount);
	}

	,onPropertyChanged: function (model, watching) {
		var propName = watching.replace(new RegExp('.@each$'), '');

		// TODO: make this work for arrays
		var current = this.get('model.' + propName);
		var previous = this.get('previous.' + propName);

		this.set('isDirty', this.hasChanges());
		this.propertyChanged(model, propName, current, previous);
	}

	,willDestroy: function() {
		this._super();

		var self = this;
		var model = self.get('watching')
		var properties = self.get('_properties');

		if (!model || !properties) return;

		var items = [];
		if (model instanceof Array) {
			items=model;
		} else if (model instanceof Object) {
			items.push(model)
		}	

		for(var i=0; i<items.length; i++) {
			properties.forEach(function (prop) {
				Ember.removeObserver(items[i], prop, self, self.onPropertyChanged);
			});
		}
	}

});