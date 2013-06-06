// ==UserScript==
// @name            HV Layout Corrector
// @namespace       HV Layout Corrector
// @version         1.3
// @description     Correct corrupted layouts
// @include         http://hentaiverse.org/*
// @exclude         http://hentaiverse.org/?login*
// @exclude         http://hentaiverse.org/pages/showequip*
// @run-at          document-end
// ==/UserScript==

var hv = {
	settings: {
		get useHVFontEngine() {
			return document.getElementsByClassName('fd2')[0].textContent !== "Health points";
		},
	},
};

(function () {
	var i, elements;

	// Moogle Mail
	if (document.location.search.indexOf("?s=Bazaar&ss=mm&filter=Write%20New") >= 0 ||
			document.location.search.indexOf("?s=Bazaar&ss=mm&filter=Inbox") >= 0) {
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
