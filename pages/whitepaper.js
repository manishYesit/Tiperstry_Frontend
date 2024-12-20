import React, { Component } from 'react';
// import Pdf from "";

class Whitepaper extends Component {
	componentDidMount = () => {
		window.open("/static/Tipestry-White-Paper.pdf");
	}
	render() {
		return <a href="/static/Tipestry-White-Paper.pdf" target="_blank" />;
	}
} 

export default Whitepaper;