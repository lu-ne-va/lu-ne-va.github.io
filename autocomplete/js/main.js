require(['Controller', 'List', 'input'], function (Controller, List, input) {
	var inputElement = document.getElementById('input');

	var planets = [
		'Меркурий',
		'Венера',
		'Земля',
		'Марс',
		'Юпитер',
		'Сатурн',
		'Нептун'];

	localStorage.planets = JSON.stringify(planets);

	inputElement.addEventListener('input', Controller.show);

	document.getElementById('dropdown').onmousedown = function () {
		input.setValue();
	};

	inputElement.onblur = function () {
		List.clear();
	};

});