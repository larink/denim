import React, { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import LoginModal from '../components/auth/LoginModal'
import Logout from '../components/auth/Logout'
import RegisterModal from '../components/auth/RegisterModal'
import { clearErrors } from '../redux/actions/error'

function Logon() {
  const dispatch = useDispatch()
  let history = useHistory()

  const handleToggle = useCallback(() => {
    // Clear errors
    dispatch(clearErrors())
    history.goBack()
  }, [clearErrors])

  const handleToggleHome = useCallback(() => {
    // Clear errors
    dispatch(clearErrors())
    history.push('/')
  }, [clearErrors])

  return (
    <div className="logon">
      <div className="logon__top logon-top">
        <button className="logon-top__link logo btn-reset" onClick={handleToggleHome}>
          Denim
        </button>
        <button
          className="logon-top__link logon-top__link--go-back btn-reset"
          onClick={handleToggle}>
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
        </button>
      </div>
      <div className="logon__wrapper logon-wrapper">
        <h1 className="logon__title">Войти в систему</h1>
        <div className="logon-wrapper__inner">
          <LoginModal />
          <RegisterModal />
        </div>
        {/* <Logout /> */}
      </div>
    </div>
  )
}

export default Logon
