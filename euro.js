// ==UserScript==
// @name          Mixpanel Revenue Currency Converter (EU)
// @namespace     http://www.github.com/drmarshall/mixpanel_revenue_tweaks/
// @description   Example
// @include https://mixpanel.com/report/*/revenue/*
// @version       0.12

// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

$(document).ready(function() {

	var myCurrencySymbol = '€';
	var myCurrencyRate = 0.95;
	var matchingPatternStrict = /\$[0-9,]*\.[0-9]*/g;
	var matchingPatternNoDollar = /[0-9,]*\.[0-9]*/g;
	var matchingPatternNoDecimal = /\$[0-9,]*/g;
	var onlyAlterSymbol = false;
    var table_updating = false;
    var info_updating = false;
    var graph_updating = false;
    var updating = false;
    
    var table = $('.data_view .table_inner');
    var info = $('.info_boxes');
    var graph = $('.highcharts-yaxis-labels');

	function formatCurrent(string){
		if(!onlyAlterSymbol){
			string = string.replace('.','*');
			string = string.replace(',','.');
			string = string.replace('*',',');
		}
		return string.replace('$',myCurrencySymbol);
	}//function ends

	function doChanges(){
		if(updating) return false;
		updating = true;
		var currentText = '';
		var matches = [];
		
		//target info boxes
		currentText = info.html();
		var matches = currentText.match(matchingPatternNoDollar);
		//console.log(currentText);
		if(matches === null){}else{
			for(var i = 0; i < matches.length; i++){
				//console.log(matches[i] + "-" + formatCurrent(matches[i]));
	            currentText = currentText.replace(matches[i], formatCurrent(matches[i]));
			}
			info.html(currentText);
		}

		//target table
		currentText = table.html();
		var matches = currentText.match(matchingPatternStrict);
		//console.log(currentText);
		if(matches === null){}else{
			for(var i = 0; i < matches.length; i++){
	            currentText = currentText.replace(matches[i], formatCurrent(matches[i]));
			}
			table.html(currentText);
		}

		//target graph
		currentText = $('.highcharts-yaxis-labels').html();
		var matches = currentText.match(matchingPatternNoDecimal);
		if(matches === null){}else{
			for(var i = 0; i < matches.length; i++){
				//console.log(matches[i] + "-" + formatCurrent(matches[i]));
	            currentText = currentText.replace(matches[i], formatCurrent(matches[i]));
			}
			$('.highcharts-yaxis-labels').html(currentText);
		}


		updating = false;
		console.log('updated');
		setTimeout(doChanges, 1000);
	}// function ends

    doChanges();

    $('body').append('<style>#revenue_report .info_boxes .info_box h1:before { content: "'+myCurrencySymbol+'"; }</style>');
});