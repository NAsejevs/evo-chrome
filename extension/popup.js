let button = document.getElementById("showNotification");

button.addEventListener("click", () => {
    // If the user clicks the button, let's show a test notification
    chrome.runtime.sendMessage({
        type: "notification"
    });
});

// Using the set variable in background.js
chrome.storage.sync.get('color', function(data) {
    button.style.backgroundColor = data.color;
    button.setAttribute('value', data.color);
});