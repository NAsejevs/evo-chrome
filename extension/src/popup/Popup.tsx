import React from "react";

class Popup extends React.Component {
    constructor(props: any) {
        super(props);

        console.log("hello world!! from react");
    }

    render() {
        return (
            <div>
                {"Hello World!!"}
            </div>
        )
    }
}

export default Popup;