import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Admin from "./component/Admin/Admin";
import Register from "./component/Register/Register";
import Home from "./component/Home/Home";

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Home} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/register" component={Register} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
