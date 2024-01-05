import React from "react";
import { Redirect, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Dashboard } from "./dashboard";
import { Userlist } from "./userlist";
import { Adduser } from "./adduser";
import { Edituser } from "./editpage";
import { Preview } from "./preview";


const Privaterouter = () => {
    return (
        <>
            <Router>
                <Switch>
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/userlist" component={Userlist}/>
                    <Route path="/adduser" component={Adduser}/>
                    <Route path="/editpage/:id" component={Edituser}/>
                    <Route path="/preview/:id" component={Preview}/>
                    <Route path="*" render={()=><Redirect to="/dashboard"/>}/>
                </Switch>
            </Router>
        </>
    )
}
export default Privaterouter