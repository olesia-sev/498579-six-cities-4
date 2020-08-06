import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Main from '../main/main';
import Property from "../property/property";
import {connect} from "react-redux";
import {Operation as UserOperation} from "../../reducer/user/user";
import {Operation as DataOperation} from "../../reducer/data/data";

const App = ({checkAuthStatus, loadOffers}) => {
  const [loaded, setIsLoaded] = useState(false);

  useEffect(() => {
    checkAuthStatus().then(() => {
      loadOffers().then(() => {
        setIsLoaded(true);
      });
    });
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Main/>
        </Route>

        <Route path="/offers/:id">
          <Property />
        </Route>

      </Switch>
    </Router>
  );
};

App.propTypes = {
  checkAuthStatus: PropTypes.func.isRequired,
  loadOffers: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkAuthStatus: () => dispatch(UserOperation.checkAuthStatus()),
    loadOffers: () => dispatch(DataOperation.loadOffers())
  };
};

const ConnectedApp = connect(null, mapDispatchToProps)(App);

export {ConnectedApp as App};
