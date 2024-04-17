import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./Register";
import SignIn from "./SignIn";
import Home from "./Home";

const App = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/register" component={Register} />
                    <Route path="/signin" component={SignIn} />
                    <Route path="/" component={Home} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
