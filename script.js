
const selector = ".angular-form-print";
makeDraggable(selector);
makeResizable(selector);

function makeResizable(selector) {
	// Stolen and edited from here - https://codepen.io/ZeroX-DG/pen/vjdoYe
	
	// Even though these two functions have common variables, I like the idea of each function having its own set of variables so if I only want one of them I can just grab that function and have everything.
	let origX;
	let origY;
	let origWidth;
	let origHeight;
	let origMouseX;
	let origMouseY;

	const minWidth = 200;
	const minHeight = 200;
	const element = document.querySelector(selector);
	const resizers = document.querySelectorAll(selector + ' [class^="resizer"]');

	resizers.forEach((currentResizer) => {
		currentResizer.addEventListener("mousedown", function (e) {
			e.preventDefault();

			origMouseX = e.pageX;
			origMouseY = e.pageY;
			origX = element.getBoundingClientRect().left;
			origY = element.getBoundingClientRect().top;

			origWidth = parseFloat(
				getComputedStyle(element, null).getPropertyValue("width").replace("px", "")
			);
			origHeight = parseFloat(
				getComputedStyle(element, null).getPropertyValue("height").replace("px", "")
			);

			window.addEventListener("mousemove", resizeWidth);
			window.addEventListener("mousemove", resizeHeight);
			window.addEventListener("mouseup", resizeStop);
		});

		function resizeWidth(e) {
			const widthChange = e.pageX - origMouseX;

			const isLeftSide =
				currentResizer.classList.contains("resizer-top-left") ||
				currentResizer.classList.contains("resizer-bottom-left");

			let newWidth;

			if (isLeftSide) {
				newWidth = origWidth - widthChange;
			} else {
				newWidth = origWidth + widthChange;
			}

			if (newWidth > minWidth) {
				element.style.width = newWidth + "px";
				if (isLeftSide) element.style.left = origX + widthChange + "px";
			}
		}

		function resizeHeight(e) {
			const heightChange = e.pageY - origMouseY;

			const isTopSide =
				currentResizer.classList.contains("resizer-top-right") ||
				currentResizer.classList.contains("resizer-top-left");

			let newHeight;

			if (isTopSide) {
				newHeight = origHeight - heightChange;
			} else {
				newHeight = origHeight + heightChange;
			}

			if (newHeight > minHeight) {
				element.style.height = newHeight + "px";
				if (isTopSide) element.style.top = origY + heightChange + "px";
			}
		}

		function resizeStop() {
			window.removeEventListener("mousemove", resizeWidth);
			window.removeEventListener("mousemove", resizeHeight);
		}
	});
}

function makeDraggable(selector) {
	let origX;
	let origY;
	let origMouseX;
	let origMouseY;

	const element = document.querySelector(selector);
	const dragger = document.querySelector(selector + " .dragger");

	dragger.addEventListener("mousedown", function (e) {
		origMouseX = e.pageX;
		origMouseY = e.pageY;
		origX = element.getBoundingClientRect().left;
		origY = element.getBoundingClientRect().top;

		window.addEventListener("mousemove", dragDisplay);
		window.addEventListener("mouseup", dragStop);

		function dragDisplay(e) {
			const changeX = e.pageX - origMouseX;
			const changeY = e.pageY - origMouseY;
			
			const newX = origX + changeX;
			const newY = origY + changeY;
			
			element.style.left = newX + 'px';
			element.style.top = newY + 'px';
		}
		
		function dragStop() {
			window.removeEventListener("mousemove", dragDisplay);
		}
	});
}
