// ==UserScript==
// @name          HV Layout Corrector
// @namespace     HV Layout Corrector
// @version       1.0
// @description   Correct corrupted layouts
// @include       http://hentaiverse.org/*
// @exclude       http://hentaiverse.org/pages/showequip*
// @run-at        document-end
// ==/UserScript==
(function () {
	var i, elements;

	// Character
	if (document.location.search.indexOf("?s=Character") >= 0) {
		// avoid overlap
		elements = document.querySelectorAll('#stats_pane > div');
		for (i = 0; i < elements.length; i++) {
			elements[i].style.removeProperty("height");
		}
		// center horizontal position of 'Effective Proficiency'
		elements = document.querySelectorAll('#stats_pane div.eqsp1 > div.fd12 > div');
		for (i = 0; i < elements.length; i++) {
			elements[i].style.cssText += "text-align: center;";
		}
	}
	// Arena entrance
	if (document.location.search.indexOf("?s=Battle&ss=ar") >= 0) {
		// avoid overlap
		elements = document.querySelectorAll('#arena_pane > div');
		for (i = 0; i < elements.length; i++) {
			elements[i].style.removeProperty("height");
		}
	}
	// Ring of Blood entrance
	if (document.location.search.indexOf("?s=Battle&ss=rb") >= 0) {
		// reveal hidden message
		elements = document.querySelectorAll('#arenaform > div');
		for (i = 0; i < elements.length; i++) {
			elements[i].style.removeProperty("float");
			elements[i].style.removeProperty("overflow");
		}
	}
})();
