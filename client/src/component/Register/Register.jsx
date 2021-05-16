import React from "react";
import "./Register.css";
import Header from "../Header/Header";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      phone: "",
    };
  }
  onChangeName = (e) => {
    this.setState({ name: e.target.value });
  };
  onChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  };
  onChangePhone = (e) => {
    this.setState({ phone: e });
  };
  onClickSubmit = async (e) => {
    e.preventDefault();
    let data = this.state;
    const response = await fetch("/api/save-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      let res = await response.json();
      alert(`Warning!!! ${res.message}`);
      this.onClickReset();
    } else if (response.status === 201) {
      let data = this.state;
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        let res = await response.json();

        alert(`SUCESS!!! ${res.message}`);
      } else {
        let res = await response.json();
        alert(`ERROR!!! ${res.message}`);
        this.onClickReset();
      }
    } else {
      let res = await response.json();
      alert(`ERROR!!! ${res.message}`);
      this.onClickReset();
    }
  };
  enableContinue = () => {
    let { email, name } = this.state;
    if (email.length > 0 && name.length > 0) return false;
    else {
      return true;
    }
  };
  onClickReset = () => {
    this.setState({ name: "", email: "", phone: "" });
  };
  render() {
    return (
      <div id="Register">
        <Header name={"Register to recieve emails with us"} />
        <section className="inner-section">
          <div className="section-wrapper">
            <div id="signup-form" className="account-form">
              <div id="signup-password">
                <h1>Enter your details</h1>
                <form id="signup" className="sign-up-container">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-field"
                    placeholder="Enter Your Name"
                    value={this.state.name}
                    onChange={this.onChangeName}
                  ></input>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-field"
                    placeholder="Enter Email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                  ></input>
                  <PhoneInput
                    className="form-field"
                    placeholder="Enter phone number"
                    value={this.state.name}
                    onChange={this.onChangePhone}
                  />
                  <input
                    id="signup-submit"
                    type="submit"
                    className="button register-button"
                    value="Submit"
                    disabled={this.enableContinue()}
                    onClick={this.onClickSubmit}
                  ></input>
                  <div className="reset-align">
                    <a className="reset-button" onClick={this.onClickReset}>
                      Reset
                    </a>
                  </div>
                </form>
                <hr></hr>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
export default Register;
