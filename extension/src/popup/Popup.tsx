import React from "react";

interface IPopupState {
    counter: number;
}

class Popup extends React.Component<any, IPopupState> {
    private buttonRef: HTMLButtonElement | null = null;

    constructor(props: any) {
        super(props);

        this.state = {
            counter: 0,
        }
    }

    componentDidMount() {
        this.setState({
            counter: this.state.counter + 1,
        });
    }

    render() {
        return (
            <div>
                <span>{this.state.counter}</span>
                <button ref={this.setButtonRef} onClick={this.showNotification}>
                    SHOW NOTIFICATION
                </button>
            </div>
        )
    }

    setButtonRef = (ref: HTMLButtonElement | null) => {
        this.buttonRef = ref;

        if(this.buttonRef) {
            chrome.storage.sync.get('color', (data) => {
                this.buttonRef.style.backgroundColor = data.color;
            });
        }
    }

    showNotification = () => {
        chrome.runtime.sendMessage({
            type: "notification"
        });
    }
}

export default Popup;