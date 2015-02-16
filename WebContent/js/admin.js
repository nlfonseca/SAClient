(function($) {
	$(function() {
		getVotesByCandidate();

		$('.select-chart').on('change', function(){
			var select = $(this).val();

			if (select == 'voteschangedofday') {
				getVotesChangedOfDay();
			} else if (select == 'votesofday' ) {
				getVotesOfDay();
			} else if (select == 'votesbycandidate' ) {
				getVotesByCandidate();
			}
		});
    });
	
	function getVotesByCandidate() {
		$('.amcharts-main-div').remove();
		
		$.ajax({
	        type: 'GET',
	        dataType: 'json',
	        url: "/saclient/getvotesbycandidate"
	    })
	    .done(function(data) {
	    	var chart = new AmCharts.AmSerialChart();
			chart.dataProvider = data.votes;
			chart.categoryField = "dateOrCand";
			chart.startDuration = 1;
			chart.angle = 30;
			chart.depth3D = 15;

			var graph = new AmCharts.AmGraph();
			graph.valueField = "NVotes";
			graph.type = "column";
			graph.lineAlpha = 0;
		    graph.fillAlphas = 0.8;
		    graph.fillColorsField = "fill";
		    graph.fillColorsField = "#000000";
			chart.addGraph(graph);

			chart.write('chartdiv');
	    })
	    .fail(function(xhr, data) {
	    	console.log("Error...");
	    });
	}

	function getVotesOfDay() {
		$('.amcharts-main-div').remove();
		
		$.ajax({
	        type: 'GET',
	        dataType: 'json',
	        url: "/saclient/getvotesofday"
	    })
	    .done(function(data) {
	    	var chart = new AmCharts.AmSerialChart();
			chart.dataProvider = data.votes;
			chart.categoryField = "dateOrCand";
			chart.startDuration = 1;
			chart.angle = 30;
			chart.depth3D = 15;

			var graph = new AmCharts.AmGraph();
			graph.valueField = "NVotes";
			graph.type = "column";
			graph.lineAlpha = 0;
		    graph.fillAlphas = 0.8;
		    graph.fillColorsField = "fill";
			chart.addGraph(graph);

			chart.write('chartdiv');
	    })
	    .fail(function(xhr, data) {
	    	console.log("Error...");
	    });
	}


	function getVotesChangedOfDay() {
		$('.amcharts-main-div').remove();
		
		$.ajax({
	        type: 'GET',
	        dataType: 'json',
	        url: "/saclient/getvoteschangedofday"
	    })
	    .done(function(data) {
	    	var chart = new AmCharts.AmSerialChart();
			chart.dataProvider = data.votes;
			chart.categoryField = "dateOrCand";
			chart.startDuration = 1;
			chart.angle = 30;
			chart.depth3D = 15;

			var graph = new AmCharts.AmGraph();
			graph.valueField = "NVotes";
			graph.type = "column";
			graph.lineAlpha = 0;
		    graph.fillAlphas = 0.8;
		    graph.fillColorsField = "fill";
			chart.addGraph(graph);

			chart.write('chartdiv');
	    })
	    .fail(function(xhr, data) {
	    	console.log("Error...");
	    });
	}
})(jQuery);