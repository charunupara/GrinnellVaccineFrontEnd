import React from 'react';
import './Form.css';
import ReCAPTCHA from "react-google-recaptcha";

class Form extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: "",
            captchaValue: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleCaptchaChange = this.handleCaptchaChange.bind(this);
    }
    
    handleCaptchaChange(e) {
        this.setState({captchaValue: e.target.value})
    }
    handleChange(e) {
        this.setState({value: e.target.value})
    }

    onChange(value) {
        console.log("Captcha value:", value);
    }
    async handleSubmit(e) {
        console.log(this.state.value);
        e.preventDefault();
        try {
           const res = await fetch("http://localhost:8000", {
               method: "POST",
               headers: {
                'Content-Type': 'application/json'
              },
               body: JSON.stringify({email: this.state.value})
           })

           console.log(res);
           const resJSON = await res.json();
           if (resJSON.error) {
               alert(resJSON.error);
           } else {
               alert("You are now subscribed! Thank you!")
           }
           console.log(resJSON);

        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <>
            <p>By subscribing to the email, we will send you updates on the availability of COVID vaccines in Iowa through data collected by vaccinespotters.org</p>
            <form onSubmit={this.handleSubmit}>
                <input type="email" id="email-input" placeholder="Email" value={this.state.value} onChange={this.handleChange} required={true} />
                <input type="text" placeholder="What is 2+2?" value={this.state.captchaValue} onChange={this.handleCaptchaChange} />
                {this.state.captchaValue === '4'? <input type="submit" value="Subscribe"/> : ""}
                
            </form>


            <div id="footer-text">Made by Govind Brahmanyapura and Charun Upara</div>
            </>
        );
    }
}

export default Form;
