import React from "react";
import ReactDOM from "react-dom";

// import Popup from "./Popup";

const App = () => {
    return (<p>Hello MOTHERUCKER</p>);
}

ReactDOM.render(<App/>, document.getElementById("root"));

// console.log(ReactDOM.render);

let button = document.getElementById("root");

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