var repository = require('../repository.js');

//id:Builds?fields=projects(project(id,name,href))

module.exports = {
	route: '/projects',
	get: function (req, res) {
		repository.get('/projects', function(json){
			res.json(json);
		});
	}
}
