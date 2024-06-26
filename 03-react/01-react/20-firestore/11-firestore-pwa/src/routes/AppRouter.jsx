import React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";

import AppScreen from "../pages/AppScreen";
import AuthRouter from "./AuthRouter";
import PrivateRouter from "./PrivateRouter";

import { login } from "../actions/auth";
import { firebase } from "../firebase/config-firebase";
import PublicRouter from "./PublicRouter";
import { loadData } from "../helpers/loadData";
import { leerRegistros } from "../actions/nomina";

const AppRouter = () => {
  const dispatch = useDispatch();

  const [log, setLog] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(login(user.uid, user.displayName));
        setLog(true);

        const nominaData = await loadData(user.uid);
        dispatch(leerRegistros(nominaData));
      } else {
        setLog(false);
      }
      // console.log(user);
    });
  }, [dispatch]);

  // <AuthRouter />
  // <Route path="/auth/" component={AuthRouter} />
  // <Redirect to="/app" />

  return (
    <Router>
      <Switch>
        <PublicRouter path="/auth" component={AuthRouter} log={log} />
        <PrivateRouter path="/app" log={log} component={AppScreen} />
        <Redirect to="/app" />
      </Switch>
    </Router>
  );
};

export default AppRouter;
