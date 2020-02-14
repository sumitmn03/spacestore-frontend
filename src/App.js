import React, { Component } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "../src/store";
import { loadUser } from "./actions/auth";

import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import PrivateRoute from "./components/auth/PrivateRoute";
import TopNavbar from "./components/layout/TopNavbar";
import Sidebar from "./components/layout/Sidebar";
import Alerts from "./components/layout/Alerts";
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
import MyAccount from "./components/myAccount/MyAccount";
import MyProfile from "./components/profile/MyProfile";
import MorePage from "./components/morePage/MorePage";
import UploadPage from "./components/uploadPage/UploadPage";
import ProductPage from "./components/productPage/ProductPage";
import Review from "./components/reviewsNRatings/Review";
import QnaPage from "./components/qna/QnaPage";
import AddressPage from "./components/address/AddressPage";
import AddNewAddress from "./components/address/AddNewAddress";
import CheckoutPage from "./components/checkoutPage/CheckoutPage";
import CheckoutSuccess from "./components/checkoutPage/checkoutSuccess/CheckoutSuccess";

// Alert Options
const alertOptions = {
  timeout: 3000,
  position: "middle",
  containerStyle: { top: "110px", zIndex: 4 }
};

export class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <div id="app">
              <TopNavbar />
              <Sidebar />
              <Alerts />
              {/* <MainRegister /> */}
              {/* <MainLogin /> */}
              <Authorization />
              <div className="ms-main-body">
                <Switch>
                  <Route path="/" exact component={Homepage} />
                  <Route path="/design" component={MainEditingComponent} />
                  {/* <Route path="/search" component={MainMarketPlace} /> */}
                  <Route
                    path="/search/:order_by/:search_query/:type_query/:color_query/:design_type_query/:size_query"
                    component={MainMarketPlace}
                  />
                  <Route path="/store" component={StoreHomePage} />
                  <Route path="/about" component={MainAbout} />
                  <Route path="/help" component={MainCustomerService} />
                  <Route path="/more" component={MorePage} />
                  <Route path="/product/:id" exact component={ProductPage} />
                  <Route
                    path="/product/reviews_n_ratings/:id"
                    component={Review}
                  />
                  <Route path="/product/qna/:id" component={QnaPage} />

                  {/* private routes */}

                  <PrivateRoute path="/myaccount" exact component={MyAccount} />
                  <PrivateRoute path="/myprofile" exact component={MyProfile} />
                  <PrivateRoute
                    path="/orders"
                    exact
                    component={ListOfOrdersPage}
                  />
                  <PrivateRoute
                    path="/orders/:order_id/:child_id"
                    component={PastOrderDetail}
                  />
                  <PrivateRoute path="/cart" component={MainCartPage} />
                  <PrivateRoute path="/wishlist" component={MainWishlist} />
                  <PrivateRoute path="/upload" component={UploadPage} />
                  <PrivateRoute path="/address" exact component={AddressPage} />
                  <PrivateRoute path="/address/add" component={AddNewAddress} />
                  <PrivateRoute path="/checkout" component={CheckoutPage} />
                  <PrivateRoute
                    path="/checkout_success"
                    component={CheckoutSuccess}
                  />
                </Switch>
              </div>
            </div>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

export default App;
