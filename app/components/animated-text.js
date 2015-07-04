// ---------------------------------------------------------------------------------------------------------------------
// ANIMATED COUNTER COMPONENT
// This component creates animated text that is replaced character by character.
// ---------------------------------------------------------------------------------------------------------------------

App.AnimatedTextComponent = Ember.Component.extend({

	tagName: 'span'


	,onValueChange: function() {
		var from = this.get('displayValue') || '';
		var to = this.get('value') || '';

		this.set('displayValue', to);

		var element = this.$();
		if (!element) return;

		if (this.isAnimationRunning) {
			from = element.html();
			element.velocity('stop');
		}

		var length = Math.max(from.length, to.length);
		var options = {

			delay: 50

			,duration: 200

			,easing: 'ease-out'

			,begin: function() {
				this.isAnimationRunning = true;
			}.bind(this)

			,progress: function(elements, complete, remaining, start, tweenValue) {
				var index = Math.round(length * complete);
				element.html(to.slice(0, index) + from.slice(index, from.length));
			}.bind(this)

			,complete: function() {
				this.isAnimationRunning = false;
			}.bind(this)

		};

		element.velocity({ tween: [to, from] }, options);
	}.observes('value').on('init')


	,onDidInsertElement: function() {
		this.$().html(this.get('displayValue'));
	}.on('didInsertElement')


	,onWillDestroyElement: function() {
		this.$().velocity('stop');
	}.on('willDestroyElement')

});
