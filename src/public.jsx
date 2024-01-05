import React from "react";
import { Redirect, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Login } from "./login";
import { Register } from "./registerpage";
const Publicrouter = () => {
    return (
        <>
            <Router>
                <Switch>
                    <Route exact path="/" component={Register} />
                    <Route path="/login" component={Login} />
                    <Route path="*" render={()=><Redirect to="/login"/>}/>
                </Switch>
            </Router>
        </>
    )
}
export default Publicrouter