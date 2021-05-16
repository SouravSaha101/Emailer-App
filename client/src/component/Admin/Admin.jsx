import React from "react";
import "./Admin.css";
import Header from "../Header/Header";

class Admin extends React.Component {
  constructor() {
    super();
    this.state = {
      subjet: "",
      text: "",
      html: "",
    };
  }
  onChangeSubject = (e) => {
    this.setState({ subjet: e.target.value });
  };
  onChangeText = (e) => {
    this.setState({ text: e.target.value });
  };
  onChangeHtml = (e) => {
    this.setState({ html: e.target.value });
  };

  enableContinue = () => {
    let { subjet } = this.state;
    if (subjet.length > 0) return false;
    else {
      return true;
    }
  };
  render() {
    const onClickContinue = async (e) => {
      e.preventDefault();
      let data = this.state;
      const response = await fetch("/api/batch-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        let res = await response.json();
        alert(`SUCESS!!! ${res.message}`);
        this.setState({ subjet: "", text: "", html: "" });
      } else {
        let res = await response.json();
        alert(`ERROR!!! ${res.message}`);
        this.setState({ subjet: "", text: "", html: "" });
      }
    };
    return (
      <div id="admin">
        <Header name={"Hello Admin"} />
        <section className="inner-section">
          <div className="section-wrapper">
            <div id="signup-form" className="account-form">
              <div id="signup-password">
                <h1>Enter the details of the email</h1>
                <form id="signup" className="sign-up-container">
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    className="form-field"
                    placeholder="Enter The Subject*"
                    value={this.state.subject}
                    onChange={this.onChangeSubject}
                  ></input>
                  <input
                    type="text"
                    name="text"
                    id="text"
                    className="form-field"
                    placeholder="Enter Text"
                    value={this.state.text}
                    onChange={this.onChangeText}
                  ></input>
                  <textarea
                    placeholder="Enter Additional Email Content"
                    className="form-field text-area-box"
                    value={this.state.html}
                    onChange={this.onChangeHtml}
                  />
                  <input
                    id="signup-submit"
                    type="submit"
                    className="button"
                    value="Continue"
                    disabled={this.enableContinue()}
                    onClick={onClickContinue}
                  ></input>
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
export default Admin;