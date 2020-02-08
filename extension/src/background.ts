
chrome.runtime.onInstalled.addListener(function() {
	// Sets storage variable 'color' to beused in popup.js
	chrome.storage.sync.set({color: '#3aa757'}, function() {
		console.log("The color is green.");
	});

	// Adds a rule to show page_action only if we're on developer.chrome.com
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
		chrome.declarativeContent.onPageChanged.addRules([{
			conditions: [
				new chrome.declarativeContent.PageStateMatcher({
					pageUrl: {hostEquals: 'localhost'},
				})
			],
			actions: [
				new chrome.declarativeContent.ShowPageAction()
			]
		}]);
	});

	// Let's inject our script as soon as the page is loaded, but before any assets
	chrome.webNavigation.onCommitted.addListener((e: chrome.webNavigation.WebNavigationFramedCallbackDetails) => {
		chrome.tabs.executeScript({
			file: "js/content_script.js",
		});
	});

	// Adds a message listener to listen for messages from page_action or any 
	// injected script.
	chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
		switch(request.type) {
			case "notification": {
				// Display test notification to user
				chrome.notifications.create("betsOpen", {
					type: "basic",
					iconUrl: "images/evo_128.png",
					title: "Title of bets open",
					message: "Hello World!!"
				}, () => {
			
				});
				break;
			}
			default: {
				sendResponse({error: "Invalid request type."});
				break;
			}
		}
	});
});