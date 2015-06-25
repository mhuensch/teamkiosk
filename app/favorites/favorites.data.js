///id:Builds?fields=projects(project(id,name,href))
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
