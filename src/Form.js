import React from "react";
import "./Form.css";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      captchaValue: "",
      captchaNum1: "",
      captchaNum2: "",
      captchaSum: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCaptchaChange = this.handleCaptchaChange.bind(this);
    this.createMathCaptcha = this.createMathCaptcha.bind(this);
  }

  handleCaptchaChange(e) {
    this.setState({ captchaValue: e.target.value });
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
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
    console.log(this.state.value);
    e.preventDefault();
    try {
      const res = await fetch("https://grinnellvaccine-server.herokuapp.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: this.state.value }),
      });

      console.log(res);
      const resJSON = await res.json();
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
          Enter your email below to receive updates on the availability of COVID
          vaccine appointments in Iowa.
        </p>
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            id="email-input"
            placeholder="Email"
            value={this.state.value}
            onChange={this.handleChange}
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
              parseInt(this.state.captchaValue) !== this.state.captchaSum
            }
            value="Subscribe"
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
        <div id="footer-text">
          <p id="disclaimer">
            Disclaimer: Vaccine availability data is collected from vaccinespotter.org. The data could be inaccurate/not up-to-date.
          </p>
          Built by two Class of 2021 Grinnell students.
        </div>
      </>
    );
  }
}

export default Form;
