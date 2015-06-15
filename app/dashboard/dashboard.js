App.Router.map(function () {
	this.resource('dashboard');
});

App.DashboardRoute = Ember.Route.extend({

	setupController: function(controller, model) {
		App.FavoritesApi.query().then(function(data){
			controller.set('favorites', data);
			controller.set('selectedId', data[0].id);
		});

		App.BuildsApi.query().then(function(data){
			controller.set('builds', data.slice(0, 5));
		})
	}

});

App.DashboardController = Ember.Controller.extend({

	selectedIdChanged: function() {
		var self = this;

		var oldId = self.get('_oldselectedId');
		if (oldId) self.setActiveFavorite(oldId, false);

		App.BuildsApi.read(self.selectedId).then(function (data) {
			self.set('model', data);
			self.setActiveFavorite(self.selectedId, true);
			self.set('_oldselectedId', self.selectedId)
		});

		Ember.run.later(function () {
			var index = self.get('_index') || 0;
			var favorites = self.get('favorites');

			if (favorites.length === ++index) index=0;

			self.set('_index', index);
			self.set('selectedId', favorites[index].id);
		}, 10000);  // TODO: read this time from configuration.

	}.observes('selectedId'),

	setActiveFavorite: function(currentId, value) {
		var favorite = this.get('favorites').filter(function(obj) {
			if (obj.id === currentId) return true;
			return false;
		})[0];

		Ember.set(favorite, 'isActive', value);
	}

});

