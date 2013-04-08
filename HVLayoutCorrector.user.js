// ==UserScript==
// @name          HV Layout Corrector
// @namespace     HV Layout Corrector
// @version       1.2
// @description   Correct corrupted layouts
// @include       http://hentaiverse.org/*
// @exclude       http://hentaiverse.org/pages/showequip*
// @run-at        document-end
// ==/UserScript==

var hv = {
	settings: {
		get useHVFontEngine() {
			return document.getElementsByClassName('fd10')[0].textContent !== "Health points";
		},
	},
};

(function () {
	var i, elements;

	// Character
	if (document.location.search.indexOf("?s=Character") >= 0) {
		// Avoid overlap
		elements = document.querySelectorAll('#stats_pane > div');
		for (i = 0; i < elements.length; i++) {
			elements[i].style.removeProperty("height");
		}
		// Center horizontal position of 'Effective Proficiency'
		elements = document.querySelectorAll('#stats_pane div.eqsp1 > div.fd12 > div');
		for (i = 0; i < elements.length; i++) {
			elements[i].style.cssText += "text-align: center;";
		}
	}
	// Character Inventory
	if (document.location.search.indexOf("?s=Character&ss=in") >= 0) {
		elements = document.querySelectorAll('#leftpane > div:nth-child(2), #rightpane > div:nth-child(2)');
		for (i = 0; i < elements.length; i++) {
			elements[i].style.removeProperty("height");
		}
	}
	// Arena entrance
	if (document.location.search.indexOf("?s=Battle&ss=ar") >= 0) {
		// Avoid overlap
		elements = document.querySelectorAll('#arena_pane > div');
		for (i = 0; i < elements.length; i++) {
			elements[i].style.removeProperty("height");
		}
	}
	// Ring of Blood entrance
	if (document.location.search.indexOf("?s=Battle&ss=rb") >= 0) {
		// Reveal hidden message
		elements = document.querySelectorAll('#arenaform > div');
		for (i = 0; i < elements.length; i++) {
			elements[i].style.removeProperty("float");
			elements[i].style.removeProperty("overflow");
		}
	}
	// Moogle Mail Write New
	if (document.location.search.indexOf("?s=Bazaar&ss=mm&filter=Write%20New") >= 0) {
		// Avoid attachment display overlap
		if (!hv.settings.useHVFontEngine) {
			elements = document.querySelectorAll('#mailform > div > div + div div');
			for (i = 0; i < elements.length; i++) {
				elements[i].style.removeProperty("width");
				elements[i].style.display = "inline-block";
			}
		}
	}
})();
