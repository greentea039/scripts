// ==UserScript==
// @name            HV Equipment Highlights
// @namespace       HV Equipment Highlights
// @version         1.4
// @description     Highlight player's and bazzar equipments
// @include         http://hentaiverse.org/?s=Battle&ss=iw*
// @include         http://hentaiverse.org/?s=Bazaar&ss=es*
// @include         http://hentaiverse.org/?s=Bazaar&ss=fr*
// @include         http://hentaiverse.org/?s=Bazaar&ss=mm&filter=Write%20New
// @include         http://hentaiverse.org/?s=Character&ss=in*
// @include         http://hentaiverse.org/?s=Character&ss=eq*
// @exclude         http://hentaiverse.org/?login*
// @run-at          document-end
// ==/UserScript==

const CSS_TEXT_MAP = {
	// One-Handed
	" axe ":			"color: Indigo;",
	" club ":			"color: DarkRed;",
	" dagger ":			"color: #502808;",
	" rapier ":			"color: #006060;",
	" shortsword ":		"color: #606030;",
	" wakizashi ":		"color: #200020;",

	// Two-Handed
	" estoc ":			"color: #004040;",
	" longsword ":		"color: #404020;",
	" mace ":			"color: #202060;",
	" scythe ":			"color: Crimson;",
	" katana ":			"color: #200020;",

	// Staffs
	" ebony staff ": 	"color: #201000;",
	" katalox staff ":	"color: MediumVioletRed;",
	" oak staff ":		"color: SaddleBrown;",
	" redwood staff ":	"color: Brown;",
	" willow staff ":	"color: DarkOliveGreen",

	// Shield
	" buckler ":		"color: DarkOliveGreen;",
	" kite shield ":	"color: #800000;",
	" tower shield ":	"color: #400000;",

	// Cloth
	" cotton ":			"color: DimGray;",
	" gossamer ":		"color: Teal;",
	" phase ":			"color: RoyalBlue;",

	// Light
	" kevlar ":			"color: DarkGreen;",
	" leather ":		"color: Sienna;",
	" shade ":			"color: DarkViolet;",

	// Heavy
	" plate ":				"color: #102010;",
	" power ":				"color: Red;",
	" shield helmet":		"color: DarkBlue;",
	" shield cuirass":		"color: DarkBlue;",
	" shield gauntlets":	"color: DarkBlue;",
	" shield greaves":		"color: DarkBlue;",
	" shield sabatons":		"color: DarkBlue;",

	// Quality
	"crude ":			"opacity: 0.5;",
	"fair ":			"opacity: 0.625;",
	"average ":			"opacity: 0.75;",
	"fine ":			"opacity: 0.875;",
	"superior ":		"opacity: 1.0;",
	"exquisite ":		"background-color: Seashell;",
	"magnificent ":		"background-color: MistyRose;",
	"legendary ":		"background-color: LightPink;",

	// Weapon Prefix
	"ethereal ":		"text-shadow: 0px -1px 1px rgba(255,255,255,0.75), 0px -2px 1px rgba(0,0,0,0.375), 0px -3px 2px rgba(255,255,255,0.5), 0px -4px 2px rgba(0,0,0,0.25);",
	"fiery ":			"text-shadow: 0px -1px 1px #ffffff, 0px -2px 2px #ffff00, 0px -3px 3px #ffff00, 0px -4px 4px #ff0000;",
	"arctic ":			"text-shadow: 0px -2px 0px #ffffff, 0px 1px 0px #ffffff, 0px 3px 4px #00a0ff;",
	"shocking ":		"text-shadow: 0px -1px 1px #ffffff, 0px -2px 1px #5f5fff;",
	"tempestuous ":		"text-shadow: 0px 0px 2px #ffffff, 0px 0px 3px #3f3f3f, 0px 0px 4px #1f1f1f;",
	"hallowed ":		"text-shadow: 0px -2px 0px #ffffff, 0px 1px 0px #ffffff, -1px 0px 0px #ffffff, 1px 0px 0px #ffffff, 0px -4px 4px #ffff40, 0px 4px 4px #ffff40, -3px 0px 3px #ffffff, 3px 0px 3px #ffffff;",
	"demonic ":			"text-shadow: 0px 1px 1px #ff8080, 0px -2px 4px #400060;",
	"astral ":			"text-shadow: 0px -1px 2px #ff80ff, 0px 1px 1px #404040, 0px -2px 4px #00d090;",

	// Armor Prefix
	"charged ":			"text-shadow: 0px -1px 2px rgba(0,0,0,0.5);",
	"frugal ":			"text-shadow: 0px -1px 2px rgba(0,0,0,0.5);",
	"agile ":			"text-shadow: 0px -1px 2px rgba(0,0,0,0.5);",
	"reinforced ":		"text-shadow: 0px -1px 1px rgba(255,255,255,1.0), 0px 1px 1px rgba(0,0,0,0.5), -1px 0px 1px rgba(0,0,0,0.5), 1px 0px 1px rgba(0,0,0,0.5);",
	"shielding ":		"text-shadow: 0px -1px 1px rgba(255,255,255,1.0), 0px 1px 1px rgba(0,0,0,0.5), -1px 0px 1px rgba(0,0,0,0.5), 1px 0px 1px rgba(0,0,0,0.5);",
	"mithril ":			"text-shadow: 0px -1px 1px White, 0px 0px 3px Grey;",
	"ruby ":			"text-shadow: 0px -1px 1px White, 0px 0px 3px DarkRed;",
	"cobalt ":			"text-shadow: 0px -1px 1px White, 0px 0px 3px Blue;",
	"amber ":			"text-shadow: 0px -1px 1px White, 0px 0px 3px DarkGoldenrod;",
	"jade ":			"text-shadow: 0px -1px 1px White, 0px 0px 3px DarkGreen;",
	"zircon ":			"text-shadow: 0px -1px 1px White, 0px 0px 3px #28a8d8;",
	"onyx ":			"text-shadow: 0px -1px 1px White, 0px 0px 3px Black;",

	// Specific gear
	" power helmet of slaughter":		"text-decoration: underline;",
	" power armor of slaughter":		"text-decoration: underline;",
	" power gauntlets of slaughter":	"text-decoration: underline;",
	" power leggings of slaughter":		"text-decoration: underline;",
	" power boots of slaughter":		"text-decoration: underline;",
	" shield helmet of the barrier":	"text-decoration: underline;",
	" shield cuirass of the barrier":	"text-decoration: underline;",
	" shield gauntlets of the barrier":	"text-decoration: underline;",
	" shield greaves of the barrier":	"text-decoration: underline;",
	" shield sabatons of the barrier":	"text-decoration: underline;",
	" hemlet of the battlecaster":		"text-decoration: underline;",
	" breastplate of the battlecaster":	"text-decoration: underline;",
	" gauntlets of the battlecaster":	"text-decoration: underline;",
	" leggings of the battlecaster":	"text-decoration: underline;",
	" boots of the battlecaster":		"text-decoration: underline;",
	" of the shadowdancer":				"text-decoration: underline;",

	// Legacy
	"dragon hide ":		"color: chocolate;",
	"silk ":			"color: orchid;",
	"gold ":			"color: gray;",
	"silver ":			"color: gray;",
	"bronze ":			"color: gray;",
	"diamond ":			"color: gray;",
	"emerald ":			"color: gray;",
	"sapphire ":		"color: gray;",
	"prism ":			"color: gray;",
	"platinum ":		"color: gray;",
	"steel ":			"color: gray;",
	"titanium ":		"color: gray;",
	"iron ":			"color: gray;",
	"-trimmed ":		"color: gray;",
	"-adorned ":		"color: gray;",
	"-tipped ":			"color: gray;",
	"chainmail ":		"color: gray;",
	"mitons ":			"color: gray;",
	"coif ":			"color: gray;",
	"hauberk ":			"color: gray;",
	" of the ox":		"color: gray;",
	" of the raccoon":	"color: gray;",
	" of the cheetah":	"color: gray;",
	" of the turtle":	"color: gray;",
	" of the fox":		"color: gray;",
	" of the owl":		"color: gray;",
};

function match(text) {
	var key;
	var cssTexts = [];
	for (key in CSS_TEXT_MAP) {
		if (text.toLowerCase().indexOf(key) !== -1) {
			cssTexts.push(CSS_TEXT_MAP[key]);
		}
	}
	return cssTexts;
}

function text(node) {
	var s = "", t, i;
	if (node.nodeType === document.TEXT_NODE) {
		if (node.nodeValue) {
			s = node.nodeValue;
		}
	} else if (node.nodeType === document.ELEMENT_NODE) {
		for (i = 0; i < node.childNodes.length; i++) {
			t = text(node.childNodes[i]);
			if (t) {
				if (s !== "") {
					s += " ";
				}
				s += t;
			}
		}
	}
	return s;
}

function applyCSS(element, cssTexts) {
	var i, childNode, spanElement;
	var j;
	for (i = 0; i < element.childNodes.length; i++) {
		childNode = element.childNodes[i];
		if (childNode.nodeType === document.ELEMENT_NODE) {
			applyCSS(childNode, cssTexts);
		} else if (childNode.nodeType === document.TEXT_NODE) {
			if (element.tagName === "SPAN") {
				for (j = 0; j < cssTexts.length; j++) {
					element.style.cssText += cssTexts[j];
				}
			} else if (childNode.nodeValue.match(/[^\s]+/)) {
				spanElement = document.createElement("span");
				for (j = 0; j < cssTexts.length; j++) {
					spanElement.style.cssText += cssTexts[j];
				}
				element.replaceChild(spanElement, childNode);
				spanElement.appendChild(childNode);
			}
		}
	}
}

function adjustWidth(element) {
	var i, childNode;
	var className = element.getAttribute("class") || "";
	if (className.substring(0, 2) !== "f2") {
		element.style.cssText += "width: auto;";
	}
	for (i = 0; i < element.childNodes.length; i++) {
		childNode = element.childNodes[i];
		if (childNode.nodeType === document.ELEMENT_NODE) {
			adjustWidth(childNode);
		}
	}
}

function highlightText() {
	var i, equipment, name, cssTexts;
	var equipments = document.querySelectorAll("#inv_equip div.eqdp, #item_pane div.eqdp, #equip div.eqdp, #equip_pane div.eqdp, #shop_pane div.eqdp, div.eqde");
	for (i = 0; i < equipments.length; i++) {
		equipment = equipments[i];
		name = text(equipment);
		cssTexts = match(name);
		if (cssTexts && cssTexts.length > 0) {
			applyCSS(equipment, cssTexts);
		}
		adjustWidth(equipment);
	}
}

function addStyle(styleText) {
	var styleElement = document.createElement("style");
	styleElement.textContent = styleText;
	document.documentElement.appendChild(styleElement);
}

(function main() {
	addStyle('div.eqdp > div[style*="color"][style*="rgb(0, 48, 203)"] {border: solid 2px #e02040; margin: -2px;}');
	highlightText();
})();
