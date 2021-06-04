import React, { useState, useCallback, useEffect } from 'react'

import { connect, useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { login } from '../../redux/actions/auth'
import { clearErrors } from '../../redux/actions/error'

const LoginModal = () => {
  const [modal, setModal] = useState(false)
  // const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState(null)
  const dispatch = useDispatch()
  const error = useSelector(({ error }) => error)
  const isAuthenticated = useSelector(({ auth }) => auth.isAuthenticated)
  const history = useHistory()

  const handleToggle = useCallback(() => {
    // Clear errors
    dispatch(clearErrors())
    setModal(!modal)
  }, [clearErrors, modal])

  // const handleChangeName = (e) => setName(e.target.value)
  const handleChangeEmail = (e) => setEmail(e.target.value)
  const handleChangePassword = (e) => setPassword(e.target.value)

  const handleOnSubmit = (e) => {
    e.preventDefault()

    // Create user object
    const user = {
      // name,
      email,
      password,
    }

    // Attempt to login
    dispatch(login(user))
    if (error === false) history.push('/')
  }

  useEffect(() => {
    // Check for register error
    if (error.id === 'LOGIN_FAIL') {
      setMsg(error.msg.msg ? error.msg.msg : error.msg.error)
    } else {
      setMsg(null)
    }
    // If authenticated, close modal
    if (modal) {
      if (isAuthenticated) {
        handleToggle()
      }
    }
  }, [error, handleToggle, isAuthenticated, modal])

  return (
    <React.Fragment>
      {/* <button
        className="shop-nav__link shop-nav__link--user btn-reset"
        aria-label="Go to profile"
        onClick={handleToggle}>
        <svg
          version="1.1"
          id="Capa_1"
          //  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 512 512"
          //  style="enable-background:new 0 0 512 512;"
          // xml:space="preserve"
        >
          <g>
            <path
              d="M437.02,330.98c-27.883-27.882-61.071-48.523-97.281-61.018C378.521,243.251,404,198.548,404,148
                    C404,66.393,337.607,0,256,0S108,66.393,108,148c0,50.548,25.479,95.251,64.262,121.962
                    c-36.21,12.495-69.398,33.136-97.281,61.018C26.629,379.333,0,443.62,0,512h40c0-119.103,96.897-216,216-216s216,96.897,216,216
                    h40C512,443.62,485.371,379.333,437.02,330.98z M256,256c-59.551,0-108-48.448-108-108S196.449,40,256,40
                    c59.551,0,108,48.448,108,108S315.551,256,256,256z"
            />
          </g>
        </svg>
      </button> */}

      <div className="login">
        <div>
          <div className="register__top register-top">
            <h2>Авторизация</h2>
            {/* <button className="close-btn btn-reset" onClick={handleToggle}>
                <svg
                  version="1.1"
                  id="Capa_1"
                  x="0px"
                  y="0px"
                  width="357px"
                  height="357px"
                  viewBox="0 0 357 357">
                  <g id="close">
                    <polygon
                      points="357,35.7 321.3,0 178.5,142.8 35.7,0 0,35.7 142.8,178.5 0,321.3 35.7,357 178.5,214.2 321.3,357 357,321.3 
				214.2,178.5"
                    />
                  </g>
                </svg>
              </button> */}
          </div>
          <div>
            {msg ? <div className="error-msg">{msg}</div> : null}
            <form className="register-form form" onSubmit={handleOnSubmit}>
              {/* <div className="register-form__group">
                  {/* <label htmlFor="name">Name</label> */}
              {/* <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    className="input"
                    onChange={handleChangeName}
                  /> */}
              {/* </div> */}
              <div className="register-form__group">
                {/* <label htmlFor="email">Email</label> */}
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
                {/* <label htmlFor="password">Password</label> */}
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
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
  )
}
export default LoginModal
