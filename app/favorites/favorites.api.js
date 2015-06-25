var repository = require('../repository.js');

// TODO replace with mapping from some config
var mapping = {
	'TestAppOne': 'Alpha',
	'TestAppTwo': 'Bravo',
	'TestAppThree': 'Charlie',
	'TestAppFour': 'Delta',
	'TestAppFive': 'Echo',
	'TestAppSix': 'Foxtrot',
	'TestAppSeven': 'Golf',
	'TestAppEight': 'Hotel',
	'TestAppNine': 'India',
	'TestAppTen': 'Juliett'
};


module.exports = {
	route: '/favorites',
	get: function (req, res) {
		console.log
		res.json([{
			"id": "TestAppOne"
			,"name":"Test_App_One"
			,"href":"/guestAuth/app/rest/projects/id:TestAppOne"
		}]);
	}
}




//id:Builds?fields=projects(project(id,name,href))

// module.exports = {
// 	route: '/favorites',
// 	get: function (req, res) {
// 		repository.get('/favorites', function(raw){
// 			var json = raw;

// 			var result = json.project.map(function(item){
// 				item.title = mapping[item.id] || item.name;
// 				return item;
// 			});

// 			result.sort(function(a, b) {
// 				if (a.title > b.title) {
// 					return 1;
// 				}
// 				if (a.title < b.title) {
// 					return -1;
// 				}
// 				return 0;
// 			})

// 			res.json(result);
// 		});
// 	}
// }
