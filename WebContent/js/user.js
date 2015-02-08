(function($) {
	
	getCandidates();
	
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
	    	showCandidates(data);
	    })
	    .fail(function(xhr, data) {
	    	console.log("Error...");
	    });
	}
	
	function showCandidates(dataCandidates) {
		
		var candidates = dataCandidates["candidates"];
		
		/**
		 * id: 8
		 * name: "Mario Gotze"
		 * club: "Bayern Munich"
		 * nationality: "GER"
		 * position: "MAC"
		 * photo: ...
		 * NVotes: -1
		 */
		for (var i=0; i < candidates.length; i++) {
			
			var $player = $("<div>", {class: "player"});
			$('#container-photos').append($player);
			
		}
	}

})(jQuery);