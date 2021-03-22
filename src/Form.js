import React from "react";
import "./Form.css";
import { zips } from "./iowaZipcodes";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      zipcode: "",
      radius: "",
      captchaValue: "",
      captchaNum1: "",
      captchaNum2: "",
      captchaSum: "",
      isLoading: false,
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleZipcodeChange = this.handleZipcodeChange.bind(this);
    this.handleRadiusChange = this.handleRadiusChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCaptchaChange = this.handleCaptchaChange.bind(this);
    this.createMathCaptcha = this.createMathCaptcha.bind(this);
  }

  handleCaptchaChange(e) {
    this.setState({ captchaValue: e.target.value });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handleZipcodeChange(e) {
    this.setState({ zipcode: e.target.value });
  }

  handleRadiusChange(e) {
    this.setState({ radius: e.target.value });
  }

  createMathCaptcha() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;

    this.setState({
      captchaNum1: num1,
      captchaNum2: num2,
      captchaSum: num1 + num2,
    });
  }

  async handleSubmit(e) {
    this.setState({ isLoading: true });
    e.preventDefault();
    const matchedZip = zips.filter(
      (a) => a.fields.zip === this.state.zipcode
    )[0];
    console.log(matchedZip);
    if (matchedZip === undefined) {
      alert("Invalid zipcode!");
      window.location = "https://www.grinnellvaccine.tech/";
      return false;
    }

    try {
      const res = await fetch("https://grinnellvaccine-server.herokuapp.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.state.email,
          zipcode: this.state.zipcode,
          radius: this.state.radius,
        }),
      });

      console.log(res);
      const resJSON = await res.json();
      this.setState({
        isLoading: false,
      });
      if (resJSON.error) {
        alert(resJSON.error);
      } else {
        alert("You are now subscribed! Thank you!");
      }
      console.log(resJSON);
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    this.createMathCaptcha();
  }

  render() {
    return (
      <>
        <p>
          Enter your <strong>email</strong>, <strong>zipcode</strong>, and{" "}
          <strong>max travel distance</strong> below to receive updates on the
          availability of COVID vaccine appointments in Iowa.
        </p>
        <p>
          We will send you an alert when appointments are available within the
          max distance from your location.
        </p>
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            id="email-input"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleEmailChange}
            required
          />
          <input
            type="text"
            id="zip-input"
            placeholder="Zipcode"
            pattern="[0-9]{5}"
            value={this.state.zipcode}
            onChange={this.handleZipcodeChange}
            required
          />
          <input
            type="number"
            id="radius-input"
            placeholder="Max distance (1-400 miles)"
            value={this.state.radius}
            max={400}
            min={1}
            onChange={this.handleRadiusChange}
            required
          />
          <input
            id="math-captcha"
            type="text"
            placeholder={`What is ${this.state.captchaNum1}+${this.state.captchaNum2}?`}
            value={this.state.captchaValue}
            onChange={this.handleCaptchaChange}
            required
          />

          <input
            type="submit"
            id="submit-btn"
            disabled={
              parseInt(this.state.captchaValue) !== this.state.captchaSum ||
              this.state.isLoading
            }
            value={this.state.isLoading ? "Loading..." : "Subscribe"}
          />
        </form>
        <p>Checks appointment availability every minute.</p>
        <p>
          Visit{" "}
          <a target="_blank" href="https://www.vaccinespotter.org/IA/">
            Vaccine Spotter
          </a>{" "}
          to view current availability.
        </p>
        <p>
          Please use {" "}
          <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSc88PoxetJhZ62R5QM-6ddvYfEEGVj26kF1kuUWZkhKYDhF8Q/viewform">
            this form
          </a>{" "}
          to contact us.
        </p>
        <div id="footer-text">
          <p id="disclaimer">
            Disclaimer: Vaccine availability data is collected from
            vaccinespotter.org. The data could be inaccurate/not up-to-date.
          </p>
          Built by two Class of 2021 Grinnell students.
        </div>
      </>
    );
  }
}

export default Form;
