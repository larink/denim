import React, { useState, useCallback, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../../redux/actions/auth';
import { clearErrors } from '../../redux/actions/error';

const LoginModal = () => {
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);
  const dispatch = useDispatch();
  const error = useSelector(({ error }) => error);
  const isAuthenticated = useSelector(({ auth }) => auth.isAuthenticated);
  const history = useHistory();

  const handleToggle = useCallback(() => {
    dispatch(clearErrors());
    setModal(!modal);
  }, [clearErrors, modal]);
  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    dispatch(login(user));
    if (error === false) history.push('/');
  };

  useEffect(() => {
    if (error.id === 'LOGIN_FAIL') {
      setMsg(error.msg.msg ? error.msg.msg : error.msg.error);
    } else {
      setMsg(null);
    }
    if (modal) {
      if (isAuthenticated) {
        handleToggle();
      }
    }
  }, [error, handleToggle, isAuthenticated, modal]);

  return (
    <React.Fragment>
      <div className="login">
        <div>
          <div className="register__top register-top">
            <h2>Авторизация</h2>
          </div>
          <div>
            {msg ? <div className="error-msg">{msg}</div> : null}
            <form className="register-form form" onSubmit={handleOnSubmit}>
              <div className="register-form__group">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="input"
                  onChange={handleChangeEmail}
                />
              </div>
              <div className="register-form__group">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Пароль"
                  className="input"
                  onChange={handleChangePassword}
                />
              </div>

              <button type="submit" className="login-btn button btn-reset">
                Войти
              </button>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default LoginModal;
