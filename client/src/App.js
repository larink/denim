import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import Card from './pages/Card';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import './scss/main.scss';
import Logon from './pages/Logon';
import Profile from './pages/Profile';
import { useDispatch, useSelector } from 'react-redux';
import Cart from './pages/Cart';
import { useEffect } from 'react';
import { loadUser } from './redux/actions/auth';
import BrandPage from './pages/BrandPage';
import AdminPage from './pages/AdminPage';
import AboutUs from './pages/AboutUs';

function App() {
  const dispatch = useDispatch();
  const { token, isAuthenticated } = useSelector(({ auth }) => auth);
  const gender = useSelector(({ app }) => app.gender);

  useEffect(() => {
    if (!!token) {
      dispatch(loadUser());
    }
  }, []);

  return (
    <div className="site-container">
      <Router>
        {/* <Switch>
          {routes.map(({ path, Component }, key) => (
            <Route exact path={path} key={key} component={Component} />
          ))}
        </Switch> */}

        <Route
          path="/"
          exact
          component={() => <Redirect to={`${gender}-home`} />}
        />
        <Route path="/women-home" exact component={Home} />
        <Route path="/men-home" exact component={Home} />
        <Route path="/women" exact component={Catalog} />
        <Route path="/men" exact component={Catalog} />
        <Route
          path="/logon"
          exact
          component={() => (!isAuthenticated ? <Logon /> : <Redirect to="/" />)}
        />
        <Route path="/cart" exact component={Cart} />
        <Route path="/search" exact component={Catalog} />
        <Route path="/profile" component={Profile} />
        <Route
          path="/profile"
          component={() => <Redirect to="/profile/account" />}
        />
        <Route path={`/p/:id`} exact component={Card} />
        <Route path="/admin" exact component={AdminPage} />
        <Route path="/brands/:brand" component={BrandPage} />
        <Route path="/about-us" component={AboutUs} />
      </Router>
    </div>
  );
}

export default App;
