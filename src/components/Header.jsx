import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import '../styles/css/header.css';

export class Header extends React.Component {
	render(){
		return (
			<header>
				<div className="container">
					<div className="logo">
						<Link to="/">
							Calculează<span className="accent">Bonuri</span>
						</Link>
					</div>
					{
						this.props.authenticated ?
						(<div className="buttons-container">
							<button className="large-button">
								<FontAwesome name="history"/>
								Istoric
							</button>
							<button className="large-button button-green">
								<FontAwesome name="save" />
								Salvează
							</button>
						</div>) 
						:
						(<div className="buttons-container">
							<Link to="/login" className="button text-button">
								Conectare
							</Link>
							<Link to="/login" className="button large-button">
								<FontAwesome name="sign-in" />
								Înregistrare
							</Link>
						</div>)
					}
				</div>
				<div className="clearfix"></div>
			</header>
			)
	}
}

Header.propTypes = {
	authenticated: PropTypes.bool.isRequired
}