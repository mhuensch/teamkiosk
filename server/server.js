// NOTE: there should be little need to change this file.	The client, services, and db
// are loaded automatically by this startup process.
var bodyParser = require('body-parser');
var express = require('express');
var fs = require('fs');
var path = require('path');


// Line break for readability
process.stdout.write('\n');



// -----------------------------------------------------------------------------------------------------------------
// SERVER: configure the environment variable and server options
// -----------------------------------------------------------------------------------------------------------------
var host = express();
var env = process.env.NODE_ENV || 'development';



// -----------------------------------------------------------------------------------------------------------------
// CLIENT: this line is all it takes to host the single page web client
// -----------------------------------------------------------------------------------------------------------------
console.log('PATH:', __dirname);
host.use('/', express.static(__dirname));



// -----------------------------------------------------------------------------------------------------------------
// API:
// -----------------------------------------------------------------------------------------------------------------
var router = express.Router();

var requireDir = require('require-dir');

var services = [];
try {
	services = requireDir('./api');

	for(var name in services) {
		var service = services[name];

		var route = router.route(service.route);
		if (service.get) route.get(service.get);
		if (service.post) route.get(service.post);
		if (service.delete) route.get(service.delete);
	}
} catch (err) {
	//As the api folder may not exist, it is perfectly valid not to have any files to load
}

// middleware to use for all requests
router.use(function (req, res, next) {
	next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
	var result = [];

	for(var name in services) {
		var service = services[name];
		result.push({ route: service.route, description: service.description });
	}

	res.json(result);
});

router.get("/*", function (request, response) {
	//TODO: add 404 json response
	response.end("404!");
});

host.use(bodyParser.urlencoded({ extended: true }));
host.use(bodyParser.json());
host.use('/api', router);



// -----------------------------------------------------------------------------------------------------------------
// CATCH ALL: return a 404 whenever a page is missing.
// -----------------------------------------------------------------------------------------------------------------
host.use('/*', function (request, response) {
	response.statusCode = 404;

	// respond with html page
	if (request.accepts('html')) {
		response.sendFile(path.join(__dirname,'404.html'));
		return;
	}

	// respond with json
	if (request.accepts('json')) {
		response.send({ error: 'Not found' });
		return;
	}

	response.send(404, 'Sorry cant find that!');
});



// -----------------------------------------------------------------------------------------------------------------
// START THE SERVER
// -----------------------------------------------------------------------------------------------------------------
var port = process.env.PORT || 19770;
return host.listen(port, function(){
	console.log('URL: http://localhost:' + port);
});
