$(document).ready(function() {
	$('#me').circle({
		centerFill: true,
		url: '/music/random?t=' + Math.random() , 
		number : 8
	});
});