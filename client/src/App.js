import { Redirect, Route } from 'react-router-dom'
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

function App() {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(({ auth }) => auth.isAuthenticated)
  const gender = useSelector(({ app }) => app.gender)
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadUser())
    }
  }, [])

  return (
    <div className="site-container">
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
      {/* <Route path="/profile/orders" exact component={() => <Profile page={'orders'} />} /> */}
      {/* <Route
        path="/profile/orders"
        exact
        children={({ match }) => {
          return <Orders />
        }}
      /> */}
      <Route path="/product/:id" exact component={Card} />
      <Route path="/shop" exact component={Catalog} />
      <Route path="/women" exact component={Catalog} />
      <Route path="/men" exact component={Catalog} />
      <Route path="/brands/:brand" component={BrandPage} />
    </div>
  )
}

export default App
