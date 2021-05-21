import { Route } from 'react-router-dom'
import Card from './pages/Card'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Registration from './pages/Registration'
import Login from './pages/Login'
import './scss/main.scss'

function App() {
  return (
    <div className="site-container">
      <Route path="/registration" exact component={Registration} />
      <Route path="/login" exact component={Login} />
      <Route path="/" exact component={Home} />
      <Route path="/product/:id" exact component={Card} />
      <Route path="/shop" exact component={Catalog} />
    </div>
  )
}

export default App
