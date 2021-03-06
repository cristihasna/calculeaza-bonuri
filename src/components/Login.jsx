import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import '../styles/css/login.css';


export class Login extends Component {
    constructor(props){
        super(props);

        this.emailField = React.createRef();
        this.passField = React.createRef();
    }

    componentWillUnmount(){
        console.log('unmounting');
    }

    componentDidMount(){
        console.log('mounted');
    }

    render() {
        if(this.props.authenticated)
            return (
                <Redirect to="/" />
            );

        return (
            <div className="login-container">
                <div className="column left-column">
                    <button className="social-button" id="fb">
                        <FontAwesome name="facebook" />
                    </button>
                </div>
                <div className="column right-column">
                    <div className="field-container">
                        <input type="text" id="email" placeholder="Email" />
                        <label htmlFor="email">
                            <FontAwesome name="envelope" />
                        </label>
                    </div>
                    <div className="field-container">
                        <input type="password" id="password" placeholder="Password" />
                        <label htmlFor="password">
                            <FontAwesome name="key" />
                        </label>
                    </div>
                    <button 
                        className="large-button"
                        onClick={this.props.onLogIn}
                        >
                        <span className="button-icon">
                            <FontAwesome name="sign-in" />
                        </span>
                        Conectare
                    </button>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    onLogIn: PropTypes.func.isRequired
};