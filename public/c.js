$(document).ready(function() {

	$('body').append('<canvas id="disk">');
	var c = $('#disk')[0],
		lineWidth = 0.5,
		R = 200 - lineWidth,
		gap = 4,
		w = 40,
		r = w / 2,
		PI = Math.PI;

	disk.width = 400;
	disk.height = 400;

	var dc = disk.getContext('2d');

	dc.lineWidth = lineWidth;
	dc.strokeStyle = 'red';

	function drawCircle() {
		dc.beginPath();
		dc.arc(200, 200, R, 0, PI * 2, true);
		dc.stroke();
		dc.closePath();
		dc.beginPath();
		dc.arc(200, 200, R - 4, 0, PI * 2, true);
		dc.stroke();
		dc.closePath();
		dc.beginPath();
		dc.arc(200, 200, R - w - 4, 0, PI * 2, true);
		dc.stroke();
		dc.closePath();
		dc.beginPath();
		dc.arc(200, 200, R - w - 4 * 2, 0, PI * 2, true);
		dc.stroke();
		dc.closePath();
	};

	function caculateCirclePoints(x, y, r, step, startDeg, show) {
		startDeg = startDeg || 0;
		var points = [];
		var number = 360 / step;
		for (var i = 0; i < number; i++) {
			var _deg = (i * step + startDeg) / 180 * PI;
			var p = {
				x: x + Math.cos(_deg) * r,
				y: y - Math.sin(_deg) * r,
				deg: _deg
			};
			points.push(p);
			if (show) {
				dc.beginPath();
				dc.arc(p.x, p.y, 1, 0, PI * 2, true);
				dc.stroke();
				dc.closePath();
			}
		}
		return points;
	};

	function drawLine(x, y, r, points, bez) {
		for (var i = 0; i < points.length; i++) {
			var p = points[i],
				b = bez[i - 1],
				left = p.x,
				top = p.y;
			if (i === 0) {
				dc.beginPath();
				dc.moveTo(left, top);
			} else
				dc.quadraticCurveTo(b.x, b.y, left, top);
			dc.stroke();
		}
		dc.quadraticCurveTo(bez[bez.length - 1].x, bez[bez.length - 1].y, points[0].x, points[0].y);
		dc.stroke();
		dc.closePath();
	};
	var m = 60,
		n = 30,
		g = m,
		seq = true,
		startDeg = 0;
	setInterval(function() {
		dc.clearRect(0, 0, 400, 400);
		drawCircle();
		drawLine(200, 200, R - 4, caculateCirclePoints(200, 200, R - 4, g, startDeg), caculateCirclePoints(200, 200, R - 4 - w, g, g / 2 + startDeg + 30));
		drawLine(200, 200, R - 4, caculateCirclePoints(200, 200, R - 4, g, startDeg*2), caculateCirclePoints(200, 200, R - 4 - w, g, g / 2 + startDeg*2 + 30));
		drawLine(200, 200, R - 4, caculateCirclePoints(200, 200, R - 4, g, startDeg*3), caculateCirclePoints(200, 200, R - 4 - w, g, g / 2 + startDeg*3 + 30));
		if (seq) {
			g -= 1;
			if (g === n)
				seq = false;
		} else {
			g += 1;
			if (g === m)
				seq = true;
		}
		startDeg += 5;
		if (startDeg === 360)
			startDeg = 0;
	}, 30);
});