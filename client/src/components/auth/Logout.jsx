import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
import { logout } from '../../redux/actions/auth'

function Logout({ logout }) {
  const history = useHistory()

  return (
    <React.Fragment>
      <button
        className="btn-reset"
        onClick={() => {
          logout()
          history.push('/')
        }}>
        Выйти
      </button>
    </React.Fragment>
  )
}

export default connect(null, { logout })(Logout)
