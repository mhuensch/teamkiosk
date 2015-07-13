// ---------------------------------------------------------------------------------------------------------------------
// LIST CHECKBOX COMPONENT
// This component overrides the normal checkbox id by concatating two values together
// ---------------------------------------------------------------------------------------------------------------------

App.ListCheckboxComponent = Ember.Component.extend({
	newId: 'none'

	,onPrefixPostfixChange: function() {
		this.set('newId', this.get('prefix') + '-' + this.get('postfix'));
	}.observes('prefix', 'postfix').on('init')

	,onValueChange: function() {
		this.sendAction('action', this.get('checked'), this.get('prefix'), this.get('postfix'));
	}.observes('checked')

});