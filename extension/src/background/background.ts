
import Messaging from "./messaging";
import Injector from "./injector";

chrome.runtime.onInstalled.addListener(function() {
	// Adds a rule to show page_action only if we're on localhost
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

	Injector();
	Messaging();
});