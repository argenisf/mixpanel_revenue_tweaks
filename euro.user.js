// ==UserScript==
// @name          Mixpanel Revenue Currency Converter (EU)
// @namespace     http://www.gingerbeardman.com/ecc/
// @description   Convert Etsy prices into a custom currency
// @include       http://www.mixpanel.com/report/*/revenue/
// @exclude       http://www.mixpanel.com/account*
// @exclude       http://www.mixpanel.com/blog*
// @exclude       http://www.mixpanel.com/pricing*
// ==/UserScript==

var myCurrencySymbol = '&euro;';
var myCurrencyRate = 0.95;

function formatCurrency(n) {
	c = n.toFixed(2);
	if (n >= 0 && n < 1 && c[0] != '0') c = '0' + c;
	return myCurrencySymbol + c;
}

Array.prototype.removeDuplicates = function() {
	var reduced = new Array();
	this.sort();
	for (i=0; i<this.length; i++) {
		if (this[i] == this[i+1]) { continue }
		reduced[reduced.length] = this[i];
	}
	return reduced;
}

txtBody = document.getElementsByTagName('body').item(0).innerHTML;
txtBody = txtBody.replace(/\$/g, '');
txtBody = txtBody.replace(/icon_currency_usd\.gif" alt="usd" height="5" width="14"/g, '1x1.gif" height="0" width="0"');

anotherBody = txtBody.replace(/(\d*\.\d\d)(?![\w|\.])/g, function (str, p1, offset, s) { return formatCurrency(p1 * myCurrencyRate); });

document.getElementsByTagName('body').item(0).innerHTML = anotherBody;
