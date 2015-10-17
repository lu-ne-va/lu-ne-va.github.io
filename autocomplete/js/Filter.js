define(function(){

	function start(value, list){
		if(!value){
			return []
		}
		return list.filter(function (item) {
			return item.toLowerCase().indexOf(value.toLowerCase()) != -1;
		})
	}

	return {
		start:start
	};
});