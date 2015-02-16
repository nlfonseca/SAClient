(function($) {
    $(function() {
		initializeChart();
    });

	function initializeChart() {
		var chartData = [
		    { NVotes: 1, dateOrCand: "Ronaldo" },
			{ NVotes: 2, dateOrCand: "Ronaldo1" },
			{ NVotes: 3, dateOrCand: "Ronaldo2" },
			{ NVotes: 1, dateOrCand: "Ronaldo3" },
			{ NVotes: 2, dateOrCand: "Ronaldo4" }
		];
		console.log(chartData);
		
		//AmCharts.ready(function() {	
			var chart = new AmCharts.AmSerialChart();
			chart.dataProvider = chartData;
			chart.categoryField = "dateOrCand";

			var graph = new AmCharts.AmGraph();
			graph.valueField = "NVotes";
			graph.type = "column";
			chart.addGraph(graph);

			chart.write('chartdiv1');
		//});
	}

}(jQuery));
