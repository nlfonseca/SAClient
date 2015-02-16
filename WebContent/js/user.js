(function($) {
	
	var voteUser;
	
	getCandidates();
	
	/**
	 * Get Vote of User
	 */
	function getVoteOfUser() {
		
		$.ajax({
	        type: 'GET',
	        dataType: 'json',
	        url: "/saclient/getvoteofuser"
	    })
	    .done(function(data) {
	    	voteUser = data;
	    })
	    .fail(function(xhr, data) {
	    	console.log("Error...");
	    });
	}
	
	/**
	 * Get Candidates Function
	 */
	function getCandidates() {
		
		// show loader
		$('.loader').css('display', 'block');
		
		$.ajax({
	        type: 'GET',
	        dataType: 'json',
	        url: "/saclient/getcandidates"
	    })
	    .done(function(data) {
	    	
	    	// hide loader
			$('.loader').css('display', 'none');
			
	    	showCandidates(data);
	    	getVoteOfUser();
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
		 * nationalityImg: ...
		 * position: "MAC"
		 * photo: ...
		 * NVotes: -1
		 */
		for (var i=0; i < candidates.length; i++) {
			
			// console.log(candidates[i]);
			
			var $player = $("<div/>", {class: "player"});
			$('#container-photos').append($player);
			
			// Photo
			var $photo = $("<img/>", {
				class: "player__photo",
				width: 260,
				height: 195,
				alt: candidates[i]["name"],
				src: "data:image/png;base64," + candidates[i]["photo"]
			});
			$player.append($photo);
			
			// Name
			var $playerName = $("<p/>", {class: "player__name"});
			$playerName.text(candidates[i]["name"]);
			$player.append($playerName);
			
			// Club
			var $playerClub = $("<p/>", {class: "player__club"});
			$playerClub.text(candidates[i]["club"]);
			$player.append($playerClub);
			
			// Nationality
			var $playerNationality = $("<div/>", {class: "player__nationality"});
			$player.append($playerNationality);
			
			var $photoNat = $("<img/>", {
				class: "nationality-image",
				width: 30,
				alt: candidates[i]["nationality"],
				src: "data:image/png;base64," + candidates[i]["nationalityImg"]
			});
			$playerNationality.append($photoNat);
			
			var $textNationality = $("<p/>", {class: "nationality-text"});
			$textNationality.text(candidates[i]["nationality"]);
			$playerNationality.append($textNationality);
		}
	}

})(jQuery);