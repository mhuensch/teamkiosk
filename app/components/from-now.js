App.FromNowComponent = Ember.Component.extend({

	tagName: 'span'

	,onValueChange: function() {
		var value = this.get('value');
		var result = moment(value).fromNow();
		this.set('formatted', result);
	}.observes('value').on('init')

});
