var canvas = document.querySelector('#c');
var context = canvas.getContext('2d');

function drawText(text, x, y) {
	context.font = '36px impact';
	context.textAlign = 'center'
	context.fillStyle = "white";
	context.fillText(text, x, y);
	context.strokeStyle = "black";
	context.strokeText(text, x, y);
}

function redraw() {
	let canvas = document.querySelector('canvas');
	context.clearRect(0, 0, 500, 500);
	if (window.imageSrc) {
		context.drawImage(window.imageSrc, 0, 0, canvas.width, canvas.height);
	}
	// Top line
	drawText(window.topLineText, 250, 50);
	// Bottom line
	drawText(window.bottomLineText, 250, 500 - 25);
}

function saveFile() {
	window.open(document.querySelector('canvas').toDataURL());
}

function handleFileSelect(evt) {
	var canvasWidth = 500;
	var canvasHeight = 500;
	var file = evt.target.files[0];

	var reader = new FileReader();
	reader.onload = function(fileObject) {
		var data = fileObject.target.result;

		var image = new Image();
		image.onload = function() {
			window.imageSrc = this;
			redraw();
		}

		image.src = data;
	}

	reader.readAsDataURL(file);
}

function topTextChangeListener(event) {
	window.topLineText = event.target.value;
	redraw()
}

function bottomTextChangeListener(event) {
	window.bottomLineText = event.target.value;
	redraw()
}

window.topLineText = '';
window.bottomLineText = '';
var topText = document.getElementById('topLineText');
var bottomText = document.getElementById('bottomLineText');
topText.oninput = topTextChangeListener;
bottomText.oninput = bottomTextChangeListener;
document.getElementById('file').addEventListener('change', handleFileSelect, false);
document.getElementById('saveBtn').addEventListener('click', saveFile, false);
