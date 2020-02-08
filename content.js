// This will be injected into the target website/app

console.log('hello world!');
document.body.style.backgroundColor = "black";

window.addEventListener("click", () => {
    console.log("this is the injected script");
})