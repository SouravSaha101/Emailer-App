import React from "react";
import "./Home.css";
import { withRouter } from "react-router-dom";
import Header from "../Header/Header";

class Credential extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }
  onChangePassword = (e) => {
    this.setState({ password: e.target.value });
  };
  onChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  enableContinue = () => {
    let { email, password } = this.state;
    if (email.length > 0 && password.length > 0) return false;
    else {
      return true;
    }
  };
  render() {
    const onClickContinue = async (e) => {
      e.preventDefault();
      let data = this.state;
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        let res = await response.json();
        localStorage.setItem("isAdmin", this.state.email);
        alert(`SUCESS!!! ${res.message}`);
        this.props.history.push("/admin");
      } else {
        let res = await response.json();
        alert(`ERROR!!! ${res.message}`);
        this.setState({ password: "", email: "" });
      }
    };
    return (
      <div id="home">
        <Header name={"Welcome to Mailer App"} />
        <section className="inner-section">
          <div className="section-wrapper">
            <div id="signup-form" className="account-form">
              <div id="signup-password">
                <h1>Login As Admin</h1>
                <form id="signup" className="sign-up-container">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-field"
                    placeholder="Enter User Name"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                  ></input>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-field"
                    placeholder="Enter Password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                  ></input>
                  <input
                    id="signup-submit"
                    type="submit"
                    className="button"
                    value="Continue"
                    disabled={this.enableContinue()}
                    onClick={onClickContinue}
                  ></input>
                </form>
                <form>
                  <div className="login-method-separator">OR</div>
                  <div
                    id="push"
                    className="push-button oauth-button"
                    onClick={() => {
                      this.props.history.push("/register");
                    }}
                  >
                    <span className="label">Register to Mailer List</span>
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
export default withRouter(Credential);
