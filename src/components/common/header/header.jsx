import React from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getAuthInfo, getAuthStatus} from "../../../reducer/user/selectors";
import {Link} from "react-router-dom";
import {AppRoute} from "../../../utils/utils";

const Header = ({authStatus, authInfo}) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a className="header__logo-link" href="/">
              <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </a>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <span className="header__nav-link header__nav-link--profile">
                  <div
                    className="header__avatar-wrapper user__avatar-wrapper"
                    style={authInfo ? {backgroundImage: `url('${authInfo.avatar_url}')`} : {}}
                  >
                  </div>
                  {
                    authStatus === `NO_AUTH` ?
                      <Link className="header__login" to={AppRoute.LOGIN}>Sign in</Link> :
                      <Link className="header__user-name user__name" to={AppRoute.FAVOURITES}>
                        {authInfo ? authInfo.email : ``}
                      </Link>
                  }
                </span>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  authStatus: PropTypes.string.isRequired,
  authInfo: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    authStatus: getAuthStatus(state),
    authInfo: getAuthInfo(state),
  };
};

export default connect(mapStateToProps)(Header);
