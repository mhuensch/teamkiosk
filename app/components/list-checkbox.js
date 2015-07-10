// ---------------------------------------------------------------------------------------------------------------------
// LIST CHECKBOX COMPONENT
// This component overrides the normal checkbox id by concatating two values together
// ---------------------------------------------------------------------------------------------------------------------

App.ListCheckboxComponent = Ember.Component.extend({
	newId: 'none'

	,onValueChange: function() {
		this.set('newId', this.get('prefix') + '-' + this.get('postfix'));
	}.observes('prefix', 'postfix').on('init')

});