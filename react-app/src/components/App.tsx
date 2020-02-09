import React, { ChangeEvent } from 'react';
import logo from '../logo.svg';
import './App.css';
import socket from "../utils/socket";

class App extends React.Component<any, any> {
	constructor(props: any) {
		super(props);

		this.state = {
			username: ""
		}
	}

	componentDidMount() {
		// Send the content script our state as soon as it is injected
		window.addEventListener("message", (event) => {
			if (event.source !== window) {
				return;
			}

			const data = event.data;
			switch(data.type) {
				case "injected": {
					window.postMessage({
						type: "state",
						payload: this.state,
					}, "*");
				}
			}
		});

		
		setTimeout(() => {
			// const wrappedWebsocket = new WebSocket("ws://localhost:3001");
			
			socket.connect();
	
			socket.on("connect", () => {
				console.log("connected to socket!");
			});
	
			socket.on("messages", (messages: Array<string>) => {
				console.log(messages);
			});
		}, 2000)
	}

	componentDidUpdate() {
		// Update the content script with our state as soon as any changes occur.
		window.postMessage({
			type: "state",
			payload: this.state,
		}, "*");
	}

	onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
		this.setState({
			username: e.target.value,
		});
	}

	signIn = () => {
		console.log("SIGNING IN!");
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<div>
						<span>Username: </span>
						<input
							onChange={this.onChangeUsername}
							value={this.state.username}
						/>
					</div>
					<br/>
					<button data-role="sign-in-button" onClick={this.signIn}>Sign In</button>
				</header>
			</div>
		);
	}
}

export default App;
