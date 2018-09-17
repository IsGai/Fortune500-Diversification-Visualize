//slider
var slider = document.getElementById("myRange");
var outputSlide = document.getElementById("stockSliderSize");
outputSlide.innerHTML = slider.value;

//buttons
document.getElementById("applyButton").addEventListener("click", function(){
	 var tempDataset = {
        data: [10,10,10,10,10,10],
        label: "placeholder",
        borderColor: "#DCDCDD",
        fill: false
    }
	var arrayOfRandomNumbers = [0,0,0,0,0,0,0,0,0,0];
	for(i = 0; i < slider.value; i++){
		arrayOfRandomNumbers[i] = Math.floor(Math.random() * 501);
	}
	for(i = 0; i < slider.value; i++){ 		
		
		//fetch name
		fetch('https://api.iextrading.com/1.0/stock/' + tickers[arrayOfRandomNumbers[i]] + '/company')
		  .then(function(response) {
			return response.json();
		  })
		  .then(function(myJson) {
			tempDataset.label = myJson.companyName;
			
		});
		//fetch performance data
		fetch('https://api.iextrading.com/1.0/stock/' + tickers[arrayOfRandomNumbers[i]] + '/chart/5y')
		  .then(function(response) {
			return response.json();
		  })
		  .then(function(myJson) {
			for(j = 1; j < 6; j++){
				tempDataset.data[j] = (((myJson[j*251].close - myJson[(j - 1)*251].close) /  myJson[(j - 1)*251].close) + 1) * tempDataset.data[j - 1]; 
			}
			chart.data.datasets.push(tempDataset); 
			chart.update();
		});

	
	}	
	
});



//slider
slider.oninput = function() {
  outputSlide.innerHTML = slider.value;
}