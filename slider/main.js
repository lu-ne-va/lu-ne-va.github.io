'use strict';

const Slider = (function () {

	const jsSlider = document.getElementById('slider');
	const jsThumb = jsSlider.children[0];
	const thumbWidth = jsThumb.offsetWidth;
	const rightEdge = jsSlider.offsetWidth - ( thumbWidth / 2 + 1 );

	let thumbLeft;  // left position of moving box
	let startx;  // starting x coordinate of touch point
	let touchobj = null; // Touch object holder


	return {

		getCoords(elem)    {
			let box = elem.getBoundingClientRect();
			return {
				left: box.left + pageXOffset
			};
		}
		, count(shiftX, sliderCoords) {
			//	следим за положением курсора
			let newLeft = event.pageX - shiftX - sliderCoords.left;
			//	если курсор вышел за пределы слайдера
			if (newLeft < 0) {
				newLeft = 0;
			} else if (newLeft > rightEdge) {
				newLeft = rightEdge;
			}
			jsThumb.style.left = newLeft + 'px';
		}

		,
		init(e)
		{
			let thumbCoords = Slider.getCoords(jsThumb);
			let shiftX = e.pageX - thumbCoords.left;
			let sliderCoords = Slider.getCoords(jsSlider);

			function callCount() {
				Slider.count(shiftX, sliderCoords);
			}

			function mouseUpHandler() {
				document.removeEventListener('mousemove', callCount);
				document.removeEventListener('mouseup', mouseUpHandler);
			}

			document.addEventListener('mousemove', callCount);
			document.addEventListener('mouseup', mouseUpHandler);

			return false;
		}

		,
		touchStart(e)
		{
			touchobj = e.changedTouches[0]; // reference first touch point
			thumbLeft = parseInt(jsThumb.offsetLeft); // get left position of box
			startx = parseInt(touchobj.clientX); // get x coord of touch point
			e.preventDefault(); // prevent default click behavior
		}

		,
		touchMove(e)
		{
			touchobj = e.changedTouches[0]; // reference first touch point for this event
			let position = parseInt(touchobj.clientX) - startx; // calculate dist traveled by touch point
			// move box according to starting pos plus dist
			// with lower limit 0 and upper limit 380 so it doesn't move outside track:
			let newLeft = thumbLeft + position;
			if (newLeft > rightEdge) {
				newLeft = rightEdge;
			} else if (newLeft < 0) {
				newLeft = 0;
			}
			jsThumb.style.left = newLeft + 'px';
			e.preventDefault();
		}

		,
		subscribe()
		{
			jsThumb.addEventListener('dragstart', function () {
				return false;
			});
			jsThumb.addEventListener('mousedown', Slider.init);
			jsThumb.addEventListener('touchstart', Slider.touchStart);
			jsThumb.addEventListener('touchmove', Slider.touchMove);
		}
	};
})();

window.onload = function(){Slider.subscribe();};
