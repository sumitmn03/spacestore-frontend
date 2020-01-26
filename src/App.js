import React, { Component } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "../src/store";
import { loadUser } from "./actions/auth";

import PrivateRoute from "./components/auth/PrivateRoute";
import TopNavbar from "./components/layout/TopNavbar";
import Homepage from "./components/home/Homepage";
import MainEditingComponent from "./components/editingComponents/MainEditingComponent";
import MainMarketPlace from "./components/searchComponents/MainMarketPlace";
import ListOfOrdersPage from "./components/orderComponents/ListOfOrdersPage";
import PastOrderDetail from "./components/orderComponents/PastOrderDetail";
import MainCartPage from "./components/cart/MainCartPage";
import MainWishlist from "./components/wishlist/MainWishlist";
import StoreHomePage from "./components/store/StoreHomePage";
import MainAbout from "./components/about/MainAbout";
import MainCustomerService from "./components/customerService/MainCustomerService";
import Authorization from "./components/auth/Authorization";
import MyProfile from "./components/profile/MyProfile";

export class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div id="app">
            <TopNavbar />
            {/* <MainRegister /> */}
            {/* <MainLogin /> */}
            <Authorization />
            <div className="ms-main-body">
              <Switch>
                <Route path="/" exact component={Homepage} />
                <Route path="/design" component={MainEditingComponent} />
                <Route path="/search" component={MainMarketPlace} />
                <PrivateRoute path="/myprofile" exact component={MyProfile} />
                <PrivateRoute
                  path="/orders"
                  exact
                  component={ListOfOrdersPage}
                />
                <PrivateRoute path="/orders/:id" component={PastOrderDetail} />
                <PrivateRoute path="/cart" component={MainCartPage} />
                <PrivateRoute path="/wishlist" component={MainWishlist} />
                <Route path="/store" component={StoreHomePage} />
                <Route path="/about" component={MainAbout} />
                <Route path="/help" component={MainCustomerService} />
                {/* <Route path="/login" component={MainLogin} />
                <Route path="/register" component={MainRegister} /> */}
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
