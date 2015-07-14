$(document).ready(function() {
	var c = $('#c')[0];
	c.width = 400;
	c.height = 400;
	var ctx = c.getContext('2d');
	ctx.beginPath();
	ctx.lineWidth = 10;
	ctx.strokeStyle = 'red';
	ctx.arc(200, 200, 190, 0, Math.PI * 2, true);
	ctx.stroke();
});