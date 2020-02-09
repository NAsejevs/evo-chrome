// Adds a message listener to listen for messages from page_action or any 
// injected script.
import { setStore, getStore } from "../store";

export default function () {
	chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
		switch(request.type) {
			case "setStore": {
				setStore(request.payload);
			}
			case "getStore": {
				sendResponse(getStore());
			}
		}
	});
}