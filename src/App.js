

import {
  Homepage,
  BrowsePage,
  CartPage,
  SigninPage,
  SignupPage,
  WishListPage,
  ProductPage,
  ProfilePage
} from "./pages";
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { useAuthPersist, useSetPetsProductData } from "./hooks"
import PublicRoute from "./routes/publicRoutes";
import PrivateRoute from "./routes/privateRoutes";
import { LoadingAnimation } from "./components";
function App() {
  useAuthPersist();
  useSetPetsProductData();
  return (
    <>
      <LoadingAnimation />
      <Router>
        <Switch >
          <PublicRoute component={Homepage} path="/" exact />
          <PublicRoute component={BrowsePage} path="/shopfor" />
          <PrivateRoute component={CartPage} path="/cart" exact />
          <PublicRoute component={SigninPage} path="/signin" exact />
          <PublicRoute component={SignupPage} path="/signup" exact />
          
          <PrivateRoute component={WishListPage} path='/wishlist' exact />
          <PrivateRoute component={ProfilePage} path='/profile' exact />
          <PrivateRoute component={ProfilePage} path='/profile/orders' exact />
          <PrivateRoute component={ProfilePage} path='/profile/address' exact />
          <PublicRoute component={ProductPage} path='/product/:productId' exact />
        </Switch>
      </Router>
    </>

  );
}

export default App;


