import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
import { logout } from './actions/userActions';
import './App.css';
import Error from './components/Error';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductScreen from './screens/ProductScreen';
import RegisterScreen from './screens/RegisterScreen';

function App() {
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const signOutHandler = () => {
    dispatch(logout());
  }

  return (
    <div className="grid-container">
      <header className="row">
        <div>
          <Link className="brand" to="/">amazona</Link>
        </div>
        <div>
          <Link to="/cart">Cart
            {cartItems.length > 0 ?
              <span className="badge">{cartItems.length}</span>
              : ''
            }
          </Link>
          {userInfo
            ? <div className="dropdown">
              <Link to="#">{userInfo.name}<i className="fa fa-caret-down"></i></Link>{' '}
              <ul className="dropdown-content">
                <li>
                  <Link to="/profile">Your Profile</Link>
                </li>
                <li>
                  <Link to="#signout" onClick={signOutHandler}>Sign Out</Link>
                </li>
              </ul>
            </div>
            : <Link to="/signin">Sign In</Link>
          }
        </div>
      </header>
      <main>
        <Switch>
          <Route exact path="/" component={ProductListScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/signin" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route component={Error} />
        </Switch>
      </main>
      <footer className="row center">All right reserved</footer>
    </div>
  );
}

export default App;
