import React from "react";
import "./Header.css";

const Header = (props) => {
  return (
    <section className="container">
      <div className="organizer-main-logo">
        <h1>
          <strong> {props.name} </strong>
        </h1>
      </div>
    </section>
  );
};

export default Header;
