import React from "react";

class Popup extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            username: "",
        }
    }

    componentDidMount() {
        // As soon as the popup is opened, let's fetch the store from background
        chrome.runtime.sendMessage({type: "getStore"}, (response) => {
            this.setState({
                ...response,
            });
        });

        // Update the store each time an event is received
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            switch(request.type) {
                case "setStore": {
                    this.setState({
                        ...request.payload,
                    });
                }
            }
        });
    }

    render() {
        return (
            <div>
                <div>
                    <span>Username: {this.state.username}</span>
                </div>
            </div>
        )
    }
}

export default Popup;