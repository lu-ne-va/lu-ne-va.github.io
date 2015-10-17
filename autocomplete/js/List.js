define(function(){

	var dropdownDiv = document.getElementById('dropdown');

	function render(parameters) {
		var planets = parameters.planets;

		if (planets.length) {
			var html = '<ul>';

			for (var i = 0, len = planets.length; i < len; i++) {
				html += '<li>' + planets[i] + '</li>';
			}

			html += '</ul>';
			dropdownDiv.innerHTML = html;
		} else {
			clear();
		}
	}
	function clear() {
		dropdownDiv.innerHTML = '';
	}

	return {
		render:render,
		clear:clear
	};
});