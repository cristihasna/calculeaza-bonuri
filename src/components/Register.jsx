import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import '../styles/css/login.css';


export class Register extends Component {
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
        else
        return (
            <div className="login-container">
               <div className="column left-column">
                    <button className="social-button" id="fb">
                        <FontAwesome name="facebook" />
                    </button>
               </div>
               <div className="column right-column">
                    <div className="field-container">
                       <input type="text" id="name" placeholder="Nume"/>
                       <label htmlFor="name">
                           <FontAwesome name="user" />
                       </label>
                   </div>
                   <div className="field-container">
                       <input type="text" id="email" placeholder="Email"/>
                       <label htmlFor="email">
                           <FontAwesome name="envelope" />
                       </label>
                   </div>
                   <div className="field-container">
                       <input type="password" id="password" placeholder="Parola"/>
                       <label htmlFor="password">
                           <FontAwesome name="key" />
                       </label>
                   </div>
                    <button 
                        className="large-button"
                        onClick={this.props.onRegister}
                        >
                        <span className="button-icon">
                            <FontAwesome name="sign-in" />
                        </span>
                        Înregistrare
                    </button>
               </div>      
            </div>
        )
    }
}

Register.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    onRegister : PropTypes.func.isRequired
};