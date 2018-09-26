import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import '../styles/css/alert.css';


export class Alert extends Component {
    constructor(props){
        super(props);
        this.state = {alerts: []};
        this.interval = undefined;
    }

    componentDidMount(){
        // setInterval(() => {
        //     let alerts = this.state.alerts;
        //     alerts = alerts.map((alert) => {
        //         alert.timeout -= 100;
        //         if (alert.timeout <= 0)
        //             return null;
        //         return alert;
        //     }).filter((alert) => {
        //         return alert != null;
        //     });

        //     this.setState({alerts});
        // }, 100)
    }

    closeAlert(index){
        return () => {
            let alerts = this.state.alerts;
            alerts.splice(index, 1);
            this.setState({alerts});
            console.log('removing at '+ index, this.state.alerts);

        }
    }

    alert(message, intent, timeout){
        let alerts = this.state.alerts;
        let newAlert = {message, intent: intent || 'info', timeout: timeout || 3000};
        alerts.push(newAlert);
        this.setState({alerts});
    }

    render() {
        return (
            <div className="alerts-container">
                {this.state.alerts.map((alert, i) => (
                    <div className={"alert " + alert.intent} key={'alert_' + i}>
                        <span className="alert-message-container">
                            {alert.message}
                        </span>
                        <button
                            className="alert-remove-button"
                            onClick={this.closeAlert(i)} 
                            >
                            <FontAwesome name="times" />
                        </button>
                    </div>
                )).reverse()}
            </div>
        );
    }
}


