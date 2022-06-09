import React, { Fragment, useState } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import "./payment.css";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { createOrder } from "../../actions/orderAction"
import { useHistory } from "react-router-dom";


const Payment = () => {
  const history = useHistory();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const dispatch = useDispatch()

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const orderTime = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const paymentData = {
    amount: orderInfo.totalPrice
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    orderTime.paymentInfo = {
      id: (Math.random() * 19990706 + 19990929 * 20180413 * 4 * 22 * 22).toString(16),
      status: "NOT PAID",
      paymentMethod: "Cash On Delivery"
    }
    await dispatch(createOrder(orderTime))
    console.log(orderTime)
    history.push("/success");
    window.localStorage.removeItem('cartItems')
    window.location.reload();

  }

  const product = {
    description: "Design+Code React Hooks Course",
    price: 19
  };

  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const handleApprove = (orderId) => {
    setPaidFor(true);
  };
  if (paidFor) {
    alert("Thank you for your purchase!");
  }
  if (error) {
    alert(error);
  }

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const userName = user.name
  const shippingCharges = subtotal > 300 ? 50 : 100;
  const tax = subtotal * 0.18;
  var totalPricewithdecimal = subtotal + tax + shippingCharges;
  var fixDecimal = Number(totalPricewithdecimal).toFixed(2)
  var convertString = fixDecimal.toString()
  var totalPrice = convertString
  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;
  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <div className="paymentForm">
          <div className="checkout">

            <div className="paypal-button-container">

              <div>

                <p className="paymentInput">Ship to: {address}</p>
              </div>
              <div>
                <p className="paymentInput">To: {userName}</p>
              </div>
              <div>
                <p className="paymentInput">Total Price: ₱{totalPrice}</p>
              </div>

              <button className="checkout-button" onClick={submitHandler}><h1>COD</h1></button>

              <PayPalScriptProvider options={{ "client-id": "AVbCfEwyPYpzjbs-ERx-FvSUDsLyF353rmWyY0_Rzxu_0yvgCT7xs_nhOd_8pt8jbp14uFF51zCs-_rj" }}>
                <PayPalButtons style={{ color: "gold", layout: "horizontal", height: 50, tagline: false }}
                  onClick={(data, actions) => {
                    const hasAlreadyBoughtCourse = false;
                    if (hasAlreadyBoughtCourse) {
                      setError("You already bought this course. Go to your account to view your list of courses.");
                      return actions.reject();
                    } else { return actions.resolve(); }
                  }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [{ description: product.description, amount: { value: paymentData.amount } }]
                    });
                  }}
                  onApprove={async (data, actions) => {
                    const order = await actions.order.capture();

                    handleApprove(data.orderID);
                    orderTime.paymentInfo = {
                      id: order.id,
                      status: order.status,
                      paymentMethod: "Paypal"
                    }
                    dispatch(createOrder(orderTime))
                    console.log(orderTime)
                    history.push("/success");
                    window.localStorage.removeItem('cartItems')
                    window.location.reload();

                  }}
                  onCancel={() => {
                  }}
                  onError={(err) => {
                    setError(err);
                    console.error("PayPal Checkout onError", err);
                  }}
                />
              </PayPalScriptProvider>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Payment