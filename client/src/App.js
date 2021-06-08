import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Card from './pages/Card'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import './scss/main.scss'
import Logon from './pages/Logon'
import Profile from './pages/Profile'
import { useDispatch, useSelector } from 'react-redux'
import Cart from './pages/Cart'
import { useEffect } from 'react'
import { loadUser } from './redux/actions/auth'
import BrandPage from './pages/BrandPage'
import { routes } from './utils/routesList'
import Breadcrumbs from './components/Breadcrumbs'
import CategoryPage from './pages/CategoryPage'
import AdminPage from './pages/AdminPage'

function App() {
  const dispatch = useDispatch()
  const { token, isAuthenticated } = useSelector(({ auth }) => auth)
  const gender = useSelector(({ app }) => app.gender)
  useEffect(() => {
    if (token) {
      dispatch(loadUser())
    }
  }, [])

  // console.log(routes)

  return (
    <div className="site-container">
      <Router>
        {routes.map(({ path, name, Component }, key) => (
          <Route
            exact
            path={path}
            key={key}
            render={(props) => {
              // console.log(props.match.path)
              const crumbs = routes
                // Get all routes that contain the current one.
                // Swap out any dynamic routes with their param values.
                .filter(({ path }) => props.match.path.includes(path))
                // E.g. "/pizza/:pizzaId" will become "/pizza/1"
                .map(({ path, ...rest }) => ({
                  path: Object.keys(props.match.params).length
                    ? Object.keys(props.match.params).reduce(
                        (path, param) => path.replace(`:${param}`, props.match.params[param]),
                        path,
                      )
                    : path,
                  ...rest,
                }))
              // console.log(crumbs)
              // console.log(`Generated crumbs for ${props.match.path}`)
              // crumbs.map(({ name, path }) => console.log({ name, path }))
              // console.log('props', props)
              return (
                <div className="p-8">
                  <Component {...props} />
                </div>
              )
            }}
          />
        ))}

        <Switch>
          {routes.map(({ path, Component }, key) => (
            <Route exact path={path} key={key} component={Component} />
          ))}
        </Switch>

        <Route path="/" exact component={() => <Redirect to={`${gender}-home`} />} />
        <Route path="/women-home" exact component={Home} />
        <Route path="/men-home" exact component={Home} />
        <Route
          path="/logon"
          exact
          component={() => (!isAuthenticated ? <Logon /> : <Redirect to="/" />)}
        />
        <Route path="/cart" exact component={Cart} />
        <Route path="/search" exact component={Catalog} />
        <Route path="/profile" component={Profile} />
        <Route path="/profile" component={() => <Redirect to="/profile/account" />} />
        <Route path="/product/:id" exact component={Card} />
        <Route path="/category/:category" exact component={CategoryPage} />
        <Route path="/admin" exact component={AdminPage} />
        {/* <Route path="/shop" exact component={Catalog} /> */}
        {/* <Route path="/women" exact component={Catalog} /> */}
        {/* <Route path="/men" exact component={Catalog} /> */}
        {/* <Route path="/brands/:brand" component={BrandPage} /> */}
      </Router>
    </div>
  )
}

export default App
