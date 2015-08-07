$(document).ready(function() {
	$('#me').pilimusic({
		centerFill: true,
		url: '/music/random?t=' + Math.random(),
		number: 10
	});
});