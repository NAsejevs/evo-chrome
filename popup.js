let changeColor = document.getElementById('button');

changeColor.onclick = () => {
    // If the user clicks the button, let's show a test notification
    chrome.runtime.sendMessage({
        type: "notification"
    });
}

// Using the set variable in background.js
chrome.storage.sync.get('color', function(data) {
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute('value', data.color);
});