$(document).ready(function() {
	var c = $('#c')[0];
	c.width = 400;
	c.height = 400;

	var lineWidth = 1,
		r = 200 - lineWidth,
		gap = 4,
		w = 40;
	var ctx = c.getContext('2d');
	ctx.beginPath();
	ctx.lineWidth = lineWidth;
	ctx.strokeStyle = 'red';
	ctx.arc(200, 200, r, 0, Math.PI * 2, true);
	ctx.stroke();
	ctx.closePath();
	ctx.beginPath();
	ctx.arc(200, 200, r - 4, 0, Math.PI * 2, true);
	ctx.stroke();
	ctx.closePath();
	ctx.beginPath();
	ctx.arc(200, 200, r - w - 4, 0, Math.PI * 2, true);
	ctx.stroke();
	ctx.closePath();
	ctx.beginPath();
	ctx.arc(200, 200, r - w - 4 * 2, 0, Math.PI * 2, true);
	ctx.stroke();

	ctx.beginPath();
	ctx.arc(25, 21, w / 2, -Math.PI / 4, -Math.PI * 3 / 4, true);
	ctx.stroke();

	ctx.moveTo(21 - Math.cos((Math.PI / 4) / Math.PI * 180) * w / 2 , 25 - Math.sin((Math.PI / 4) / Math.PI * 180) * w / 2);
	ctx.bezierCurveTo(50, 50, 150, 50, 21 - Math.cos((Math.PI / 4) / Math.PI * 180) * w / 2, 25 + Math.sin((Math.PI / 4) / Math.PI * 180) * w / 2);
	ctx.stroke();

	ctx.beginPath();
	ctx.arc(25, 21, w / 2 - 4, -Math.PI / 4, -Math.PI * 3 / 4, true);
	ctx.stroke();

	ctx.beginPath();
	ctx.arc(25, 21, w / 2, Math.PI / 4, Math.PI * 3 / 4, false);
	ctx.stroke();

	ctx.beginPath();
	ctx.arc(25, 21, w / 2 - 4, Math.PI / 4, Math.PI * 3 / 4, false);
	ctx.stroke();

	ctx.beginPath();
	ctx.arc(25, 21, w / 2, Math.PI / 4, Math.PI * 3 / 4, false);
	ctx.stroke();

	ctx.beginPath();
	ctx.arc(25, 21, w / 2 - 4, Math.PI / 4, Math.PI * 3 / 4, false);
	ctx.stroke();
});