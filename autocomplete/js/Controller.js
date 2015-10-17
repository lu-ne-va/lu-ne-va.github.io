define(['List', 'Filter'], function(List, Filter){

	function show(){
		var planets = JSON.parse(localStorage.planets);
		var filtredList = Filter.start(this.value, planets);
		List.render({planets:filtredList});
	}

	return {
		show:show
	};
});