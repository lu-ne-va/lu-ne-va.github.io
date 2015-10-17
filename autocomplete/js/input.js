define(['List'], function(List){

	function setValue(){
		document.getElementById('input').value = (event.target.textContent);
	}

	return {
		setValue:setValue
	}
});