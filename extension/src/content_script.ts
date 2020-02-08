// This will be injected into the target website/app

window.addEventListener("message", (event) => {
    const data = event.data;
    if(data.from !== "page") {
        return;
    }

    console.log("EXTENSION: ", data.data);
}, false);