import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import '../styles/css/login.css';


export class Login extends Component {
    constructor(props){
        super(props);

        this.emailField = React.createRef();
        this.passField = React.createRef();
    }
    render() {
        return (
            <div className="login-container">
               <div className="column">
                    <button className="social-button" id="fb">
                        <FontAwesome name="facebook" />
                    </button>
               </div>
               <div className="column">
                   <div className="field-container">
                       <label htmlFor="email">
                           <FontAwesome name="envelope" />
                       </label>
                       <input type="text" id="email"/>
                   </div>
                   <div className="field-container">
                       <label htmlFor="password">
                           <FontAwesome name="key" />
                       </label>
                       <input type="password" id="password"/>
                   </div>
                    <button className="small-button">
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
