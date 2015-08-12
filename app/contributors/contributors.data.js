// ---------------------------------------------------------------------------------------------------------------------
// CONTRIBUTORS DATA
// This file allows the generation of mock test data for use during UI first development using Pyre.  Additionally,
// this data is "re-generated" in a pseudo random fashion each time the browser is generateed.
// ---------------------------------------------------------------------------------------------------------------------

MockData.ContributorsData = Ember.Object.extend(MockData.mixin, {
	generate: function() {
		return [
			'Bruce Wayne'
			, 'Clark Kent'
			, 'Barbara Gordon'
			, 'Selina Kyle'
			, 'Steven Rogers'
			, 'Scott Summers'
			, 'Reed Richards'
			, 'Kurt Wagner'
			, 'Anna Marie'
			, 'Peter Parker'
		];
	}
});