window.onload = function() {
	$('#toggle-dark-mode').on('click', function() {
		
		$('.darkmode-eligible').each(function() {		
			if ($(this).hasClass('darkmode')) {
				$(this).removeClass('darkmode');
			} else {
				$(this).addClass('darkmode');
			}
		});
		
		return false; 
		
	});
};