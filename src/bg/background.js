var symbol = "?";
var icon = "../../icons/icon19.png";

chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
		var currentURL = tabs[0]['url'];
		var currentIndex = tabs[0]['index'];
		var onState = localStorage["on_state"];
		var offState = localStorage["off_state"];
		var newWindow = localStorage["new_window"];

		if (currentURL.search(onState) >= 0) {
			currentURL = currentURL.substring(0, currentURL.length - onState.length - 1);
			var onStatus = true;
		} else if (currentURL.search(offState) >= 0 && offState != "") {
			currentURL = currentURL.substring(0, currentURL.length - offState.length - 1);
			var onStatus = false;
		} else {
			var onStatus = false;
		}

		updateSymbol(currentURL);

		if (onStatus) {
			if (offState == "") {
				currentURL = currentURL+offState;
			} else {
				currentURL = currentURL+symbol+offState;
			}
			icon = "../../icons/icon19.png";
		} else if (!onStatus) {
			currentURL = currentURL+symbol+onState;
			icon = "../../icons/on.png";
		}else {
			currentURL = currentURL+symbol+onState;
			icon = "../../icons/on.png";
		};
		chrome.browserAction.setIcon({path: icon});

		if (newWindow) {
			chrome.tabs.create({ url: currentURL, index: currentIndex+1 });
		} else {
			chrome.tabs.update(null,{url: currentURL});
		}
	});
});

chrome.tabs.onActivated.addListener(function(tab) {
	chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
		var currentURL = tabs[0]['url'];
		var onState = localStorage["on_state"];
		var offState = localStorage["off_state"];
		if (currentURL.search(onState) >= 0) {
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
	if (currentURL.search(/[?=]/g) >= 0) {
		symbol = "&";
	}
}