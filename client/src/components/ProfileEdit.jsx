import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { updateUser } from '../redux/actions/auth'
import { validatePayment } from '../utils/helpers'

function ProfileEdit() {
  const dispatch = useDispatch()
  let history = useHistory()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPasswrod] = useState('')
  const handleName = (e) => setName(e.target.value)
  const handleEmail = (e) => setEmail(e.target.value)
  const handlePassword = (e) => setPasswrod(e.target.value)

  const onUserEditSubmit = (e) => {
    e.preventDefault()

    const updatedUser = {
      name,
      email,
      password,
    }

    dispatch(updateUser(updatedUser))
  }

  return (
    <div className="address-edit">
      <button className="go-back btn-reset" onClick={() => history.goBack()}>
        <svg version="1.1" x="0px" y="0px" viewBox="0 0 492 492">
          <g>
            <path
              d="M198.608,246.104L382.664,62.04c5.068-5.056,7.856-11.816,7.856-19.024c0-7.212-2.788-13.968-7.856-19.032l-16.128-16.12
			C361.476,2.792,354.712,0,347.504,0s-13.964,2.792-19.028,7.864L109.328,227.008c-5.084,5.08-7.868,11.868-7.848,19.084
			c-0.02,7.248,2.76,14.028,7.848,19.112l218.944,218.932c5.064,5.072,11.82,7.864,19.032,7.864c7.208,0,13.964-2.792,19.032-7.864
			l16.124-16.12c10.492-10.492,10.492-27.572,0-38.06L198.608,246.104z"
            />
          </g>
        </svg>
        <span>Назад</span>
      </button>
      <h2 className="address-edit__title">Изменить данные аккаунта</h2>
      <form action="" className="address-form">
        <label className="address-form__label" htmlFor="">
          Имя пользователя:
          <input
            className="address-form__input"
            type="text"
            onChange={handleName}
            placeholder="Оставьте пустым, если не хотите менять"
            required={true}
          />
        </label>
        <label className="address-form__label" htmlFor="">
          Email:
          <input
            className="address-form__input"
            type="text"
            onChange={handleEmail}
            placeholder="Оставьте пустым, если не хотите менять"
            required={true}
          />
        </label>
        <label className="address-form__label" htmlFor="">
          Пароль:
          <input
            className="address-form__input"
            type="password"
            onChange={handlePassword}
            placeholder="Оставьте пустым, если не хотите менять"
            required={true}
          />
        </label>
        <button type="submit" className="address-form__btn btn-reset" onClick={onUserEditSubmit}>
          Сохранить
        </button>
      </form>
    </div>
  )
}

export default ProfileEdit
