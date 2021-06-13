import React from 'react'
import { Link } from 'react-router-dom'

function AdminPaginaion({ page, totalAdminPages }) {
  const pages = []

  for (let index = 0; index < totalAdminPages; index++) {
    pages.push(
      <li className="pagination__item" key={index}>
        <Link to={`/admin?page=${index + 1}`} className="pagination__link ">
          {index + 1}
        </Link>
      </li>,
    )
  }

  const prevPage = () => {
    let prevPage = parseInt(page) - 1
    if (prevPage < 1) return page
    return prevPage
  }

  const nextPage = () => {
    let nextPage = parseInt(page) + 1
    if (nextPage > totalAdminPages) return page
    return nextPage
  }

  return (
    <ul className="pagination">
      {page > 1 ? (
        <li className="pagination__item">
          <Link to={`/admin?page=${prevPage()}`} className="pagination__link">
            Назад
          </Link>
        </li>
      ) : (
        ''
      )}
      {pages}
      <li className="pagination__item">
        <Link to={`/admin?page=${nextPage()}`} className="pagination__link">
          Вперед
        </Link>
      </li>
    </ul>
  )
}

export default AdminPaginaion
