module.exports = {
	route: '/configuration',
	get: function (req, res) {
		res.json({
			repository: 'teamcity.codebetter.com',
			favorites: [
				{
					id: 'TestAppOne',
					alias: 'Alpha'
				} , {
					id: 'TestAppTwo',
					alias: 'Bravo'
				}, {
					id: 'TestAppThree',
					alias: 'Charlie'
				}
			] ,
			blacklist: [
				{
					id: 'TestAppTen'
				}
			]
		});
	},
	post: function (model) {
		throw new Error('Not Implemented');
	},
	delete: function (id) {
		throw new Error('Not Implemented');
	}
}
