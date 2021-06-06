import React from 'react'
import SecondHeader from '../components/SecondHeader'

function AdminPage() {
  return (
    <div className="site-container">
      <SecondHeader />
      <h1>Админ-панель сайта</h1>
      <div className="">
        <h3>Выдать пользователю роль</h3>
        <label htmlFor="">
          ID пользователя
          <input type="text" />
        </label>
        <label htmlFor="">
          Роль
          <select name="" id="">
            <option value="customer">Покупатель</option>
            <option value="employer">Работник</option>
            <option value="admin">Админ</option>
          </select>
        </label>
      </div>
    </div>
  )
}

export default AdminPage
