// ==UserScript==
// @name          HV Item Highlights
// @namespace     HV Item Highlights
// @version       1.2
// @description   Highlight player's and bazzar items
// @include       http://hentaiverse.org/?s=Bazaar&ss=is*
// @include       http://hentaiverse.org/?s=Bazaar&ss=mm&filter=Write%20New
// @include       http://hentaiverse.org/?s=Bazaar&ss=ss
// @include       http://hentaiverse.org/?s=Character&ss=in*
// @include       http://hentaiverse.org/?s=Character&ss=it
// ==/UserScript==

const CSS_TEXT_MAP = {
	// Resorative
	"lesser ":			"opacity: 0.5;",
	"average ":			"opacity: 0.625;",
	"greater ":			"opacity: 0.75;",
	"superior ":		"opacity: 0.875;",
	"godly ":			"",
	" elixir":			"background-color: Seashell;",
	"health ":			"color: rgb(0,166,23);",
	"mana ":			"color: rgb(0,22,184);",
	"spirit ":			"color: rgb(201,118,0);",
	"energy drink":		"color: DeepPink; background-color: Seashell;",
	"last elixir":		"color: DarkViolet;",

	// Infusion
	"infusion ":				"color: PaleVioletRed;",
	"infusion of gaia":			"background-color: Seashell;",

	// scroll
	"scroll ": 					"color: DarkSlateGray;",
	"scroll of swiftness":		"opacity: 0.75;",
	"scroll of protection":		"opacity: 0.75;",
	"scroll of warding":		"opacity: 0.75;",
	"scroll of the avatar":		"",
	"scroll of shadows":		"opacity: 0.75;",
	"scroll of absorption":		"",
	"scroll of life":			"",
	"scroll of the gods":		"background-color: Seashell;",

	// Special Item
	"soul stone":		"color: Tomato;",
	"flower vase":		"color: DeepSkyBlue;",
	"bubble-gum":		"color: Green;",

	// Artifact
	"shark-mounted laser":			"color: Blue; text-shadow: -1px -1px 1px #ffffff, 1px 1px 1px #808080;",
	"bfg9000":						"color: Blue; text-shadow: -1px -1px 1px #ffffff, 1px 1px 1px #808080;",
	"railgun":						"color: Blue; text-shadow: -1px -1px 1px #ffffff, 1px 1px 1px #808080;",
	"flame thrower":				"color: Blue; text-shadow: -1px -1px 1px #ffffff, 1px 1px 1px #808080;",
	"small nuke":					"color: Blue; text-shadow: -1px -1px 1px #ffffff, 1px 1px 1px #808080;",
	"chainsaw oil":					"color: Blue; text-shadow: -1px -1px 1px #ffffff, 1px 1px 1px #808080;",
	"chainsaw fuel":				"color: Blue; text-shadow: -1px -1px 1px #ffffff, 1px 1px 1px #808080;",
	"chainsaw chain":				"color: Blue; text-shadow: -1px -1px 1px #ffffff, 1px 1px 1px #808080;",
	"chainsaw repair guide":		"color: Blue; text-shadow: -1px -1px 1px #ffffff, 1px 1px 1px #808080;",
	"chainsaw guide bar":			"color: Blue; text-shadow: -1px -1px 1px #ffffff, 1px 1px 1px #808080;",
	"ashpd portal gun":				"color: Blue; text-shadow: -1px -1px 1px #ffffff, 1px 1px 1px #808080;",
	"smart bomb":					"color: Blue; text-shadow: -1px -1px 1px #ffffff, 1px 1px 1px #808080;",
	"tesla coil":					"color: Blue; text-shadow: -1px -1px 1px #ffffff, 1px 1px 1px #808080;",

	// Trophy
	"manbearpig tail":				"color: Goldenrod; text-shadow: -1px -1px 1px #ffff00, 1px 1px 1px #000000; opacity: 0.5;",
	"holy hand grenade of antioch":	"color: Goldenrod; text-shadow: -1px -1px 1px #ffff00, 1px 1px 1px #000000; opacity: 0.5;",
	"mithra's flower":				"color: Goldenrod; text-shadow: -1px -1px 1px #ffff00, 1px 1px 1px #000000; opacity: 0.5;",
	"dalek voicebox":				"color: Goldenrod; text-shadow: -1px -1px 1px #ffff00, 1px 1px 1px #000000; opacity: 0.5;",
	"lock of blue hair":			"color: Goldenrod; text-shadow: -1px -1px 1px #ffff00, 1px 1px 1px #000000; opacity: 0.625;",
	"bunny-girl costume":			"color: Goldenrod; text-shadow: -1px -1px 1px #ffff00, 1px 1px 1px #000000; opacity: 0.75;",
	"hinamatsuri doll":				"color: Goldenrod; text-shadow: -1px -1px 1px #ffff00, 1px 1px 1px #000000; opacity: 0.75;",
	"broken glasses":				"color: Goldenrod; text-shadow: -1px -1px 1px #ffff00, 1px 1px 1px #000000; opacity: 0.875;",
	"sapling":						"color: Goldenrod; text-shadow: -1px -1px 1px #ffff00, 1px 1px 1px #000000;",
	"black t-shirt":				"color: Goldenrod; text-shadow: -1px -1px 1px #ffff00, 1px 1px 1px #000000;",
	"unicorn horn":					"color: Goldenrod; text-shadow: -1px -1px 1px #ffff00, 1px 1px 1px #000000;",
	"noodly appendage":				"color: Goldenrod; text-shadow: -1px -1px 1px #ffff00, 1px 1px 1px #000000; background-color: Seashell;",

	// Token
	"token":			"text-shadow: 0 0 4px rgba(0,0,0,0.5);",
	"token of blood":	"color: #e00000;",
	"chaos token":		"color: DarkGreen;",

	// Crystal
	"crystal of ":				"color: #e060ff;",
	"crystal of vigor":			"",
	"crystal of finesse":		"",
	"crystal of swiftness":		"",
	"crystal of fortitude":		"",
	"crystal of cunning":		"",
	"crystal of knowledge":		"",
	"crystal of flame":			"opacity: 0.5;",
	"crystal of frost":			"opacity: 0.5;",
	"crystal of lightning":		"opacity: 0.5;",
	"crystal of tempest":		"opacity: 0.5;",
	"crystal of devotion":		"opacity: 0.5;",
	"crystal of corruption":	"opacity: 0.5;",
	"crystal of quintessence":	"opacity: 0.5;",

	// Material
	"low-grade ":				"opacity: 0.5;",
	"mid-grade ":				"",
	"high-grade ":				"background-color: Seashell;",
	" cloth":					"color: DarkSlateGray;",
	" leather":					"color: DarkSlateGray;",
	" metals":					"color: DarkSlateGray;",
	" wood":					"color: DarkSlateGray;",
	"crystallized phazon":		"color: DodgerBlue; background-color: Seashell;",
	"shade fragment":			"color: DodgerBlue;",
	"kevlar piece":				"color: DodgerBlue;",
	"repurposed actuator":		"color: DodgerBlue;",
	"shielding rune":			"color: DodgerBlue;",
	"binding of ":						"color: #e04000;",
	"binding of slaughter":				"background-color: MistyRose;",
	"binding of balance":				"background-color: Seashell;",
	"binding of isaac":					"background-color: Seashell;",
	"binding of destruction":			"background-color: MistyRose;",
	"binding of focus":					"background-color: Seashell;",
	"binding of friendship":			"",
	"binding of protection":			"background-color: Seashell;",
	"binding of the fleet":				"background-color: Seashell;",
	"binding of the barrier":			"background-color: Seashell;",
	"binding of the nimble":			"background-color: Seashell;",
	"binding of the elementalist":		"opacity: 0.5;",
	"binding of the heaven-sent":		"opacity: 0.5;",
	"binding of the demon-fiend":		"opacity: 0.5;",
	"binding of the curse-weaver":		"opacity: 0.5;",
	"binding of the earth-walker":		"opacity: 0.5;",
	"binding of the priestess":			"opacity: 0.5;",
	"binding of surtr":					"opacity: 0.375;",
	"binding of niflheim":				"opacity: 0.375;",
	"binding of mjolnir":				"opacity: 0.375;",
	"binding of freyr":					"opacity: 0.375;",
	"binding of heimdall":				"",
	"binding of fenrir":				"",
	"binding of dampening":				"",
	"binding of stoneskin":				"",
	"binding of deflection":			"",
	"binding of the fire-eater":		"opacity: 0.75;",
	"binding of the frost-born":		"opacity: 0.75;",
	"binding of the thunder-child":		"opacity: 0.75;",
	"binding of the wind-waker":		"opacity: 0.75;",
	"binding of the thrice-blessed":	"opacity: 0.75;",
	"binding of the spirit-ward":		"opacity: 0.75;",
	"binding of the ox":				"",
	"binding of the raccoon":			"",
	"binding of the cheetah":			"",
	"binding of the turtle":			"",
	"binding of the fox":				"",
	"binding of the owl":				"",
	"binding of warding":				"background-color: Seashell;",
	"binding of negation":				"background-color: Seashell;",
	" shard":					"color: DarkViolet;",
	"voidseeker ":				"opacity: 0.875;",
	"aether ":					"",
	"featherweight ":			"opacity: 0.75;",
	"amnesia ":					"background-color: Seashell;",

	// Collectable
	" figurine":	"color: transparent; text-shadow: 1px 2px 4px rgba(255, 255, 255, 0.5), 0 0 0 rgba(0, 0, 0, 0.4);",
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

function getMarginTop() {
	var marginTop = 0;
	var hpTextElement = document.querySelector("div.cwbt1 > div > div");
	if (hpTextElement && hpTextElement.style.marginTop) {
		marginTop = parseFloat(hpTextElement.style.marginTop);
	}
	return marginTop;
}

function clearMarginTop(element) {
	var i, childNode;
	if (element.getAttribute("class") !== "f10lb") {
		element.style.removeProperty("margin-top");
	}
	for (i = 0; i < element.childNodes.length; i++) {
		childNode = element.childNodes[i];
		if (childNode.nodeType === document.ELEMENT_NODE) {
			clearMarginTop(childNode);
		}
	}
}

function highlightText() {
	var i, item, name, cssTexts;
	var items = document.querySelectorAll('#item_pane div[id*="item_pane"], #shop_pane div[id*="shop_pane"], #inv_item div[id*="inv_item"], #item div[id*="item"], div[id*="monsterpane"][onmouseover]');
	for (i = 0; i < items.length; i++) {
		item = items[i];
		name = text(item);
		cssTexts = match(name);
		if (cssTexts && cssTexts.length > 0) {
			applyCSS(item, cssTexts);
		}
		clearMarginTop(item);
	}
}

function addStyle(styleText) {
	var styleElement = document.createElement("style");
	styleElement.textContent = styleText;
	document.documentElement.appendChild(styleElement);
}

(function main() {
	var marginTop = getMarginTop();
	var marginTopUnselected = marginTop;
	var marginTopSelected = marginTop - 2;
	var styleText
		= 'div[id*="inv_item"] > div > div {margin-top: ' + marginTop + 'px;}'
		+ 'div[id*="item_pane"] > div > div[style*="color"][style*="rgb(0, 48, 203)"]:not([class*="f10"]), div[id*="shop_pane"] > div > div[style*="color"][style*="rgb(0, 48, 203)"]:not([class*="f10"]) {border: solid 2px #e02040; margin: ' + marginTopSelected + 'px -2px -2px -2px;}'
		+ 'div[id*="item_pane"] > div > div[style*="color"][style*="rgb(92, 13, 17)"]:not([class*="f10"]), div[id*="shop_pane"] > div > div[style*="color"][style*="rgb(92, 13, 17)"]:not([class*="f10"]) {margin-top: ' + marginTopUnselected + 'px;}'
		+ 'div[id*="monsterpane"][onmouseover] > div > div {margin-top: ' + marginTop + 'px;}';
	addStyle(styleText);
	highlightText();
})();
