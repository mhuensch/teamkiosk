// ---------------------------------------------------------------------------------------------------------------------
// FAVORITES DATA
// This file allows the generation of mock test data for use during UI first development using Pyre.  Additionally,
// this data is "re-generated" in a pseudo random fashion each time the browser is refreshed.  NOTE: these favorite
// ids must match the mock data of the build ids in the builds.data.js in order for the dashboard to work.
// ---------------------------------------------------------------------------------------------------------------------

window.Data = window.Data || [];
window.Data['/favorites'] = function () {
	var result = [];
	for(var i=0; i<20; ++i){
		result.push({
			"id": "TestApp"+i
			,"name": "Test_App_"+i
			,"href":"/guestAuth/app/rest/projects/id:TestApp" + i
		})
	}
	return result;
}();
