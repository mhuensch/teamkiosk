App.Router.map(function () {
	this.resource('dashboard');
});


App.DashboardRoute = Ember.Route.extend({
	model: function(params) {
		var self = this;
		var controller = self.controllerFor('dashboard');
		controller.set('builds', []);

		return new Promise(function(resolve, reject){
			App.FavoritesApi.query().then(function(favs){
				controller.set('favorites', favs);
				controller.set('selectedId', favs[0].id);

				App.BuildsApi.query().then(function(builds){
					controller.set('builds', self.filterBuilds(builds));
					var result = builds.filter(function(build){
						return build.id === favs[0].id
					})[0];
					resolve(result);
				});

				//TODO: figure out how to run this only once to avoid it running after page change
				setInterval(function() {
					App.BuildsApi.query().then(function(builds){
						controller.set('builds', self.filterBuilds(builds));
					});
				}, 2000);
			});
		});
	}

	,filterBuilds: function(data) {
		var result = data.filter(function(build){
		if (build.status !== 'failed') return;
			return build;
		});
		if (result.length === 0) result = data.slice(0, 5);
		return result;
	}

});


App.DashboardController = Ember.Controller.extend({

	itemSize: function() {
		return 1/this.favorites.length * 100;
	}.property('favorites')

	,hasFailures: function() {
		var builds = this.get('builds');
		if (!builds) return false;

		return builds.some(function(build){
			return build.status === 'failed';
		});
	}.observes('builds').on('init')

	,selectedIdChanged: function() {
		var self = this;

		var oldId = self.get('_oldselectedId');
		if (oldId) self.setActiveFavorite(oldId, false);

		App.BuildsApi.read(self.selectedId).then(function (data) {
			self.set('model', data);
			self.setActiveFavorite(self.selectedId, true);
			self.set('_oldselectedId', self.selectedId)
		});

		//TODO: figure out how to run this only once to avoid it running after page change
		Ember.run.later(function () {
			var index = self.get('_index') || 0;
			var favorites = self.get('favorites');

			if (favorites.length === ++index) index=0;

			self.set('_index', index);
			self.set('selectedId', favorites[index].id);
		}, 2000);  // TODO: read this time from configuration.

	}.observes('selectedId')

	,setActiveFavorite: function(currentId, value) {
		var favorite = this.get('favorites').filter(function(obj) {
			if (obj.id === currentId) return true;
			return false;
		})[0];

		Ember.set(favorite, 'isActive', value);
	}

});
