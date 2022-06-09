import "./App.css";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import Payment from "./component/Cart/Payment";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UsersList from "./component/Admin/UsersList";
import UpdateUser from "./component/Admin/UpdateUser";
// import ProductReviews from "./component/Admin/ProductReviews";
import Custom from "./component/layout/Custom/Custom";
import About from "./component/layout/About/About";
import uploadDesign from "./component/layout/Custom/uploadCustom"
import CustomDetails from "./component/layout/Custom/CustomDetails"
import VerificationCode from "./component/User/VerificationCode"
import HiddenNavRoute from "./component/Route/HiddenNavRoute";
import ShopRoute from './component/Route/ShopRoute';
import Audit from "./component/Admin/Audit";
import Materials from "./component/Admin/Materials"
import UpdateMaterials from "./component/Admin/UpMaterials"

function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Poppins', 'sans-serif'],
      },
    });

    store.dispatch(loadUser());
  }, []);


  return (
    <Router>
      {/* { window.location.pathname !== '/login' ? <Header /> : '' } */}

      {isAuthenticated && <UserOptions user={user} />}

      <ProtectedRoute exact path="/process/payment" component={Payment} />


      <Switch>
        <ShopRoute exact path="/" component={Home} />
        <ShopRoute exact path="/product/:id" component={ProductDetails} />
        <ShopRoute exact path="/products" component={Products} />
        <ShopRoute path="/products/:keyword" component={Products} />

        <ShopRoute exact path="/search" component={Search} />

        <ShopRoute exact path="/custom" component={Custom} />

        <ShopRoute exact path="/about" component={About} />

        <Route exact path="/verification/:id" component={VerificationCode} />

        <ShopRoute exact path="/custom/details/:id" component={CustomDetails} />

        <ProtectedRoute exact path="/account" component={Profile} />

        <ProtectedRoute exact path="/me/update" component={UpdateProfile} />

        <ProtectedRoute exact path="/upload/design" component={uploadDesign} />

        <ProtectedRoute exact path="/password/update" component={UpdatePassword} />

        <Route exact path="/password/forgot" component={ForgotPassword} />

        <HiddenNavRoute exact path="/password/reset/:token" component={ResetPassword} />

        <Route exact path="/login" component={LoginSignUp} />

        <ShopRoute exact path="/cart" component={Cart} />

        <ProtectedRoute exact path="/shipping" component={Shipping} />

        <ProtectedRoute exact path="/success" component={OrderSuccess} />

        <ProtectedRoute exact path="/orders" component={MyOrders} />

        <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />

        <ProtectedRoute exact path="/order/:id" component={OrderDetails} />

        <ProtectedRoute isAdmin={true} exact path="/admin/dashboard" component={Dashboard} />
        <ProtectedRoute exact path="/admin/products" isAdmin={true} component={ProductList} />
        <ProtectedRoute exact path="/admin/product" isAdmin={true} component={NewProduct} />
        <ProtectedRoute exact path="/admin/material" isAdmin={true} component={UpdateMaterials} />



        <ProtectedRoute exact path="/admin/audit" isAdmin={true} component={Audit} />

        <ProtectedRoute exact path="/admin/product/:id" isAdmin={true} component={UpdateProduct} />
        <ProtectedRoute exact path="/admin/orders" isAdmin={true} component={OrderList} />

        <ProtectedRoute exact path="/admin/order/:id" isAdmin={true} component={ProcessOrder} />
        <ProtectedRoute exact path="/admin/users" isAdmin={true} component={UsersList} />

        <ProtectedRoute exact path="/admin/user/:id" isAdmin={true} component={UpdateUser} />

        <ProtectedRoute exact path="/admin/materials" isAdmin={true} component={Materials} />

      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
