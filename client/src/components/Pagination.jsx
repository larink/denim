import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Pagination({ page }) {
  const gender = useSelector(({ app }) => app.gender)
  const totalPages = useSelector(({ products }) => products.totalPages)
  const pages = []

  for (let index = 0; index < totalPages; index++) {
    pages.push(
      <li className="pagination__item" key={index}>
        <Link to={`/${gender}?page=${index + 1}`} className="pagination__link ">
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
    if (nextPage > totalPages) return page
    return nextPage
  }

  return (
    <ul className="pagination">
      {page > 1 ? (
        <li className="pagination__item">
          <Link to={`/${gender}?page=${prevPage()}`} className="pagination__link">
            Назад
          </Link>
        </li>
      ) : (
        ''
      )}
      {pages}
      <li className="pagination__item">
        <Link to={`/${gender}?page=${nextPage()}`} className="pagination__link">
          Вперед
        </Link>
      </li>
    </ul>
  )
}

export default Pagination
