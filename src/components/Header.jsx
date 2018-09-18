import React from 'react';
import FontAwesome from 'react-fontawesome';
import '../styles/css/header.css';

export class Header extends React.Component {
	render(){
		return (
			<header>
				<div className="container">
					<div className="logo">Calculează<span className="accent">Bonuri</span></div>
					<div className="buttons-container">
						<button className="large-button">
							<FontAwesome name="history"/>
							Istoric
						</button>
						<button className="large-button button-green">
							<FontAwesome name="save" />
							Salvează
						</button>
					</div>
					<div className="clearfix"></div>
				</div>
			</header>
			)
	}
}