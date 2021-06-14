import React, { useState, useCallback, useEffect } from 'react';

import { connect, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { register } from '../../redux/actions/auth';
import { clearErrors } from '../../redux/actions/error';

const RegisterModal = () => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);
  const dispatch = useDispatch();
  const error = useSelector(({ error }) => error);
  const isAuthenticated = useSelector(({ auth }) => auth.isAuthenticated);
  const history = useHistory();

  const handleToggle = useCallback(() => {
    // Clear errors
    dispatch(clearErrors());
    setModal(!modal);
  }, [clearErrors, modal]);

  const handleChangeName = (e) => setName(e.target.value);
  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    // Create user object
    const user = {
      name,
      email,
      password,
    };

    // Attempt to login
    dispatch(register(user));
    if (error === false) history.push('/');
  };

  useEffect(() => {
    // Check for register error
    if (error.id === 'REGISTER_FAIL') {
      setMsg(error.msg.msg ? error.msg.msg : error.msg.error);
    } else {
      setMsg(null);
    }
    // If authenticated, close modal
    if (modal) {
      if (isAuthenticated) {
        handleToggle();
      }
    }
  }, [error, handleToggle, isAuthenticated, modal]);

  return (
    <React.Fragment>
      <div className="register">
        <div>
          <div className="register__top register-top">
            <h2>Регистрация</h2>
          </div>
          <div>
            {msg ? <div className="error-msg">{msg}</div> : null}
            <form className="register-form form" onSubmit={handleOnSubmit}>
              <div className="register-form__group">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Имя пользователя"
                  className="input"
                  onChange={handleChangeName}
                />
              </div>
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

              <button className="login-btn button btn-reset">
                Зарегистрироваться
              </button>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

// const mapStateToProps = (state) => ({
//   isAuthenticated: state.auth.isAuthenticated,
//   error: state.error,
// })

// export default connect(mapStateToProps, { register, clearErrors })(RegisterModal)
export default RegisterModal;
