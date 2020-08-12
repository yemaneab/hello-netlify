import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";

// styles
import useStyles from "./styles";

// components
import Header from "../Header";

// pages
import Dashboard from "../../pages/dashboard";
import Projects from "../../pages/projects";

function Layout(props) {
  var classes = useStyles();

  return (
    <div className={classes.root}>
      <>
        <Header history={props.history} />

        <div>
          <div className={classes.fakeToolbar} />
          <Switch>
            <Route path="/app/dashboard" component={Dashboard} />
            <Route path="/app/projects" component={Projects} />
          </Switch>
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
