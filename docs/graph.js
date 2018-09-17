//variable for current year
var currentYear = new Date().getFullYear();
//chart
var chart = new Chart(document.getElementById("line-chart"), {
  type: 'line',
  data: {
	//hardcoded years, to do
    labels: [currentYear - 5,currentYear - 4,currentYear - 3,currentYear - 2,currentYear - 1,currentYear],
    datasets: [ { 
        data: [10,10,10,10,10,10],
        label: "S&P 500",
        borderColor: "#1985A1",
        fill: false
      }
    ]
  },

  options: {
    title: {
      display: true,
      text: 'Investment value (in thousands)'
    },
	responsive: false
  }
});
//baseline s&p 500 for chart
fetch('https://api.iextrading.com/1.0/stock/' + 'voo' + '/chart/5y')
	  .then(function(response) {
		return response.json();
	  })
	  .then(function(myJson) {
		for(i = 1; i < 6; i++){
		console.log(myJson[i*251]);
			chart.data.datasets[0].data[i] = (((myJson[i*251].close - myJson[(i - 1)*251].close) /  myJson[(i - 1)*251].close) + 1) * chart.data.datasets[0].data[i - 1]; 
			
		}
		chart.update();
	  });

