// This will be injected into the target website/app

// Let the page know that the injector script has initialized
window.postMessage({
    type: "injected",
}, "*");

console.log("injected");
const signInButton = document.querySelector("[data-role=sign-in-button]");

window.addEventListener("message", (event) => {
    if (event.source != window) {
        return;
    }

    const data = event.data;
    switch(data.type) {
        case "state": {
            // Pass data to messaging script
            chrome.runtime.sendMessage({
                type: "setStore",
                payload: data.payload,
            });
            break;
        }
    }
}, false);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request);
    switch(request.type) {
        case "signIn": {
            console.log("called");
            signInButton.click();
        }
    }
});