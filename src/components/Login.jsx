import React, { Component } from 'react';


export class Login extends Component {
    constructor(props){
        super(props);

        this.emailField = React.createRef();
        this.passField = React.createRef();
    }
    render() {
        return (
            <div className="login-container">
               Login       
            </div>
        )
    }
}
