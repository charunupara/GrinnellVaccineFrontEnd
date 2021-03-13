import React from 'react';
import './Form.css';

class Form extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({value: e.target.value})
    }

    handleSubmit(e) {
        console.log("You are now subscribed to receive Iowa COVID-19 vaccine eligibility.");
        e.preventDefault();
    }
    render() {
        return (
            <>
            <p>By subscribing to the email, we will send you updates on the availability of COVID vaccines in Iowa through data collected by vaccinespotters.org</p>
            <form onSubmit={this.handleSubmit}>
                <input type="email" id="email-input" placeholder="Email" value={this.state.value} onChange={this.handleChange} />
                <input type="submit" value="submit"/>
            </form>


            <div id="footer-text">Made by Sand Hanitizer</div>
            </>
        );
    }
}

export default Form;
