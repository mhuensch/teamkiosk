App.Router.map(function () {
	this.resource('favorites');
});


App.FavoritesApi = Api.create({
	url: '/favorites'
});


App.FavoritesRoute = Ember.Route.extend({

	model: function (params, route) {
		return App.FavoritesApi.query();
	}

});


App.FavoritesController = Ember.Controller.extend({

	itemSize: function() {
		return 1/this.model.length * 100;
	}.property('model'),

	needsConfig: function() {
		if (!this.model) return false;

		return this.model.length === 0;
	}.property('model')

})
