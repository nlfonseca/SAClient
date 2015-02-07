(function() {

	getCandidates();

	function getCandidates() {
		var ip = '172.16.5.76:9763';
		var dataURL = 'http://' + ip + '/SARestFul_1.0.0-3/1.0/services/servidorjaxrs/services/candidates/';

		$.ajax({
	        type: 'GET',
	        dataType: 'jsonp',
	        url: dataURL
	    })
	    .done(function(data) {
	    	console.log(data);
	    });
	}

})();