function onResize() {
	const canvas = document.getElementById('fractals');
	const w = canvas.width = window.innerWidth;
	const h = canvas.height = window.innerHeight;
	const ctx = canvas.getContext('2d');
	const angleSlider = document.getElementById('fractalAngleSlider');
	const heightSlider = document.getElementById('fractalHeightSlider');

	function line(fromX, fromY, toX, toY) {
		ctx.beginPath();
		ctx.strokeStyle = "#FFFFFF";
		ctx.lineWidth = 2;
		ctx.moveTo(fromX, fromY);
		ctx.lineTo(toX, toY);
		ctx.stroke();
	}

	function branch(len, angle) {
		line(0, 0, 0, -len, w/2, h);
		ctx.translate(0, -len);
		if (len > 4) {
			ctx.save();
			ctx.rotate(angle);
			branch(len * 0.67, angle);
			ctx.restore();
			ctx.save();
			ctx.rotate(-angle);
			branch(len * 0.67, angle)
			ctx.restore();
		}
	}

	let posx = 10;

	function draw() {
		requestAnimationFrame(draw);
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0,0,w,h);
		ctx.setTransform(1, 0, 0, 1, w/2, h);
		let angleSliderRad = Math.PI * parseInt(angleSlider.value) / 180.0;
		branch(heightSlider.value,angleSliderRad);
		document.getElementById('fractalAngle').innerHTML = angleSlider.value;
		document.getElementById('fractalHeight').innerHTML = heightSlider.value;
	}

	draw();
}

onResize();

window.addEventListener('resize', onResize);
