import React, {useCallback, useRef} from 'react';
import PropTypes from 'prop-types';
import {Operation as UserOperation} from "../../reducer/user/user";
import {connect} from "react-redux";
import {getAuthStatus} from "../../reducer/user/selectors";

const SignIn = ({login}) => {
  /** @type Object */
  const emailInputRef = useRef(null);

  /** @type Object */
  const passwordInputRef = useRef(null);

  const onAuthFormSubmit = useCallback((evt) => {
    evt.preventDefault();

    if (
      emailInputRef.current && emailInputRef.current.value
      && passwordInputRef.current && passwordInputRef.current.value
    ) {
      login({
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value
      });
    }
  }, []);

  return (
    <div className="page__login-container container">
      <section className="login">
        <h1 className="login__title">Sign in</h1>
        <form
          className="login__form form"
          action="#"
          method="post"
          onSubmit={onAuthFormSubmit}
        >
          <div className="login__input-wrapper form__input-wrapper">
            <label className="visually-hidden">E-mail</label>
            <input
              className="login__input form__input"
              type="email"
              name="email"
              placeholder="Email"
              required=""
              ref={emailInputRef}
            />
          </div>
          <div className="login__input-wrapper form__input-wrapper">
            <label className="visually-hidden">Password</label>
            <input
              className="login__input form__input"
              type="password"
              name="password"
              placeholder="Password"
              required=""
              ref={passwordInputRef}
            />
          </div>
          <button
            className="login__submit form__submit button"
            type="submit"
          >
            Sign in
          </button>
        </form>
      </section>
      <section className="locations locations--login locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>Amsterdam</span>
          </a>
        </div>
      </section>
    </div>
  );
};

SignIn.propTypes = {
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    authStatus: getAuthStatus(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  login: (authData) => dispatch(UserOperation.login(authData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
