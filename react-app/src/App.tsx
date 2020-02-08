import React, { ChangeEvent } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
	constructor(props: any) {
		super(props);

		this.state = {
			receivedData: {}
		}
	}

	componentDidMount() {
		window.addEventListener("message", (message) => {
			const data = message.data;
			if(data.from !== "extension") {
				return;
			}

			console.log(data.data);
		});
	}

	onChange = (e: ChangeEvent<HTMLInputElement>) => {
		if(e.target) {
			window.postMessage({
				from: "page",
				data: e.target.value
			}, "*");
		}
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<input
						onChange={this.onChange}
					/>
				</header>
			</div>
		);
	}
}

export default App;
