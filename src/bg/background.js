chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
		var currentURL = tabs[0]['url'];
		var addonText = localStorage["on_state"];
		var symbol = "?";
		var icon = "../../icons/icon19.png";
		var reg = new RegExp('['+symbol+']'+addonText, 'g');

		if (currentURL.search(addonText) >= 0) {
			symbol = updateSymbol(currentURL);
			currentURL = currentURL.replace(reg, '');
			chrome.browserAction.setIcon({path:"../../icons/icon19.png"});
		} else {
			symbol = updateSymbol(currentURL);
			currentURL += symbol+addonText;
			icon = "../../icons/on.png";
		};
		chrome.browserAction.setIcon({path: icon});
		chrome.tabs.update(null,{url: currentURL});
	});
});

chrome.tabs.onActivated.addListener(function(tab) {
	chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
		var currentURL = tabs[0]['url'];
		var addonText = localStorage["on_state"];
		if (currentURL.search(addonText) >= 0) {
			chrome.browserAction.setIcon({path: "../../icons/on.png"});
		} else {
			chrome.browserAction.setIcon({path: "../../icons/icon19.png"});
		}
	});
});

chrome.tabs.onRemoved.addListener(function(tab) {
	chrome.browserAction.setIcon({path: "../../icons/icon19.png"});
});

function updateSymbol (currentURL) {
	var symbol = "?";
	if (currentURL.search(/[?=]/g) >= 0) {
		symbol = "&";
	}
	return symbol;
}