import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'

function Breadcrumbs({ crumbs, category }) {
  let { location } = useHistory()
  const gender = useSelector(({ app }) => app.gender)

  const breadCrumbView = () => {
    const { pathname } = location
    const pathnames = pathname.split('/').filter((item) => item)
    return (
      <ul className="breadcrumbs__list">
        {pathnames.length > 0 ? (
          <li className="breadcrumbs__item">
            <Link to="/" className="breadcrumbs__link">
              Главная
            </Link>
          </li>
        ) : (
          <li className="breadcrumbs__item">
            <Link to="/" className="breadcrumbs__link">
              Главная
            </Link>
          </li>
        )}
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`
          const isLast = index === pathnames.length - 1
          return routeTo.includes('p/') ? (
            <li className="breadcrumbs__item" key={index}>
              <Link
                to={`/${gender}?category=${category[0] && category[0]._id}`}
                className="breadcrumbs__link">
                {category[0] && category[0].name}
              </Link>
            </li>
          ) : routeTo.includes('/p') ? (
            <li className="breadcrumbs__item" key={index}>
              <Link to={`/${gender}`} className="breadcrumbs__link">
                {gender === 'women' ? 'Женщины' : gender === 'men' ? 'Мужчины' : gender}
              </Link>
            </li>
          ) : (
            <li className="breadcrumbs__item" key={index}>
              <Link to={`${routeTo}`} className="breadcrumbs__link">
                {name === 'women' ? 'Женщины' : gender === 'men' ? 'Мужчины' : name}
              </Link>
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <div className="breadcrumbs">
      <div className="container container-narrow">{breadCrumbView()}</div>
    </div>
  )
}

export default Breadcrumbs
