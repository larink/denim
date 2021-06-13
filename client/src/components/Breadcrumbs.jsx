import React from 'react'
import { useSelector } from 'react-redux'
import { Route, useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { routes } from '../utils/routesList'

function Breadcrumbs({ crumbs, category }) {
  let { location } = useHistory()
  const pathnames = location.pathname.split('/').filter((x) => x)
  const gender = useSelector(({ app }) => app.gender)
  // console.log('crumbs', crumbs)
  // if (crumbs.length <= 1) {
  //   return null
  // }
  // console.log(category)

  const breadCrumbView = () => {
    const { pathname } = location
    const pathnames = pathname.split('/').filter((item) => item)
    const capatilize = (s) => s.charAt(0).toUpperCase() + s.slice(1)
    return (
      <ul className="breadcrumbs__list">
        {pathnames.length > 0 ? (
          <li className="breadcrumbs__item">
            <Link to="/" className="breadcrumbs__link">
              Home
            </Link>
          </li>
        ) : (
          <li className="breadcrumbs__item">
            <Link to="/" className="breadcrumbs__link">
              Home
            </Link>
          </li>
        )}
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`
          // console.log(routeTo.includes('product'))
          const isLast = index === pathnames.length - 1
          return routeTo.includes('product/') ? (
            <li className="breadcrumbs__item" key={index}>
              <Link
                to={`/category/${category[0] && category[0]._id}`}
                className="breadcrumbs__link">
                {category[0] && category[0].name}
              </Link>
            </li>
          ) : routeTo.includes('/product') ? (
            <li className="breadcrumbs__item" key={index}>
              <Link to={`/${gender}`} className="breadcrumbs__link">
                {gender}
              </Link>
            </li>
          ) : (
            <li className="breadcrumbs__item" key={index}>
              <Link to={`${routeTo}`} className="breadcrumbs__link">
                {capatilize(name)}
              </Link>
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <div className="breadcrumbs">
      <div className="container container-narrow">
        {breadCrumbView()}
        {/* <ul className="breadcrumbs__list"> */}
        {/* <li className="breadcrumbs__item">
            <Link to="/" className="breadcrumbs__link">
              Home
            </Link>
          </li>
          {pathnames &&
            pathnames.map((item, index) => {
              console.log(item)
              return (
                <li className="breadcrumbs__item" key={index}>
                  <Link to={item} className="breadcrumbs__link">
                    {item}
                  </Link>
                </li>
              )
            })} */}

        {/* {crumbs.map(({ name, path }, key) =>
            key + 1 === crumbs.length ? (
              <span key={key}>{name}</span>
            ) : (
              <Link key={key} to={path}>
                {name}
              </Link>
            ),
          )} */}
        {/* </ul> */}
      </div>
    </div>
  )
}

export default Breadcrumbs
