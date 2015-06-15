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
		return Math.floor(100/Math.floor(Math.sqrt(this.model.length)));
	}.property('model'),

	needsConfig: function() {
		if (!this.model) return false;

		return this.model.length === 0;
	}.property('model')

})
