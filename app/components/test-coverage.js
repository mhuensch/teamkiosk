App.TestCoverageComponent = Ember.Component.extend({
	onValueChange: function() {
		var from = this.get('displayValue');
		var to = this.get('value');

		this.set('displayValue', this.get('value'));

		if (!this.$()) return;

		var box = this.$(".box");
		var paragraph = this.$(".box > p");

		if (this.isAnimationRunning) {
			from = parseInt(paragraph.html(), 10);
			box.velocity('stop');
		}

		box.velocity(
			{
				tween: [to, from]
			}
			,{
				progress: function(elements, complete, remaining, start, tweenValue) {
					paragraph.html(parseInt(tweenValue, 10) + '%');
					box.css('width', tweenValue + '%');

					var value = tweenValue/100/2 + .5;

					var rgba = box.css('background-color')
						.replace('rgb(', '')
						.replace('rgba(', '')
						.replace(')', '')
						.split(',');
					rgba[3] = value;

					box.css('background-color', 'rgba('+rgba.join(', ')+')');


				}.bind(this),
				complete: function() {
					this.isAnimationRunning = false;
				}.bind(this),
				begin: function() {
					this.isAnimationRunning = true;
				}.bind(this),
				duration: 800,
				easing: 'ease-out',
				delay: 50
			}
		);

	}.observes('value').on('init'),

	onDidInsertElement: function() {
		var box = this.$(".box");
		var paragraph = this.$(".box > p");
		paragraph.html(this.get('displayValue') + '%' );
		box.css('width', this.get('displayValue') + '%');
		var value = this.get('displayValue')/100/2 + .5;

		var rgba = box.css('background-color')
			.replace('rgb(', '')
			.replace(')', '')
			.split(',');
		rgba[3] = value;

		box.css('background-color', 'rgba('+rgba.join(', ')+')');

	}.on('didInsertElement'),

	onWillDestroyElement: function() {
		this.$(".box").velocity('stop');
	}.on('willDestroyElement')

});
