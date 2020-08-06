import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import {Router, Route, Switch} from 'react-router-dom';
import PrivateRoute from '../private-route/private-route';
import Main from '../main/main';
import Property from "../property/property";
import {connect} from "react-redux";
import {Operation as UserOperation} from "../../reducer/user/user";
import {Operation as DataOperation} from "../../reducer/data/data";
import {history} from "../../history";
import SignIn from "../sign-in/sign-in";
import {Favourites} from "../favourites/favourites";
import {AppRoute} from "../../utils/utils";

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
    <Router history={history}>
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          <Main/>
        </Route>

        <Route exact path={AppRoute.LOGIN}>
          <SignIn />
        </Route>

        <Route exact path={AppRoute.FAVOURITES}>
          <Favourites />
        </Route>

        <Route path="/offers/:id">
          <Property />
        </Route>

        <PrivateRoute
          exact
          path={AppRoute.LOGIN}
          render={() => {
            return <SignIn />;
          }}
        />

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
