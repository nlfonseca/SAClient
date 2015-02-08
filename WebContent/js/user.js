(function($) {
	
	/**
	 * Get Candidates Function
	 */
	function getCandidates() {
		
		$.ajax({
	        type: 'GET',
	        dataType: 'json',
	        url: "/saclient/getcandidates"
//        	url: "/saclient/getvotesbycandidate" --> GRAFICOS
//	        url: "/saclient/getvotesofday" --> GRAFICOS
//	        url: "/saclient/getvoteschangedofday" --> GRAFICOS
	    })
	    .done(function(data) {
	    	console.log(data);
	    })
	    .fail(function(xhr, data) {
	    	console.log("Error...");
	    });
	}
	
	getCandidates();

})(jQuery);