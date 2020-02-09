export default function () {
	// Let's inject our script as soon as the page is loaded, but before any assets
	chrome.webNavigation.onCompleted.addListener((e: chrome.webNavigation.WebNavigationFramedCallbackDetails) => {
		chrome.tabs.executeScript({
			file: "js/content.js",
		});
	}, {
		url: [
			{
				hostContains: "localhost",
			},
		],
	});
};