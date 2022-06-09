const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const User = require("../models/userModel")
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const moment = require("moment")

// Create new Order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const orderID = Math.floor(Math.random() * 100000000) + 100000000;
  const orderCreatedAt = `${moment().format('MMMM DD YYYY')}`

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    orderId: orderID,
    paidAt: orderCreatedAt,
    createdAt: orderCreatedAt,
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

// get Single Order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    'user'
  );

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// get logged in user  Orders
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

// get all Orders -- Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find().populate('user');

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// update Order Status -- Admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHander("You have already delivered this order", 400));
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach((o) => {
      if (o.size === "Small") { updateSmallStock(o.product, o.quantity, order.user); }
      else if (o.size === "Medium") { updateMediumStock(o.product, o.quantity, order.user); }
      else if (o.size === "Large") { updateLargeStock(o.product, o.quantity, order.user); }
    })
  }
  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = `${moment().format('MMMM DD YYYY')}`;
    order.paymentInfo.status = "COMPLETED"
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

async function updateSmallStock(id, quantity, userID) {
  const product = await Product.findById(id);
  const user = await User.findById(userID)
  product.SmallStock -= quantity;
  product.Stock -= quantity
  product.NoCustomerOrdered += quantity
  user.noOrdered +=quantity
  await user.save({ validateBeforeSave: false });
  await product.save({ validateBeforeSave: false });
}
async function updateMediumStock(id, quantity, userID) {
  const product = await Product.findById(id);
  const user = await User.findById(userID)
  product.MediumStock -= quantity;
  product.Stock -= quantity
  product.NoCustomerOrdered += quantity
  user.noOrdered +=quantity
  await user.save({ validateBeforeSave: false });
  await product.save({ validateBeforeSave: false });
}
async function updateLargeStock(id, quantity, userID) {
  const product = await Product.findById(id);
  const user = await User.findById(userID)
  product.LargeStock -= quantity;
  product.Stock -= quantity
  product.NoCustomerOrdered += quantity
  user.noOrdered +=quantity
  await user.save({ validateBeforeSave: false });
  await product.save({ validateBeforeSave: false });
}

// delete Order -- Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
});

// EDIT/UPDATE Order expected date - admin
exports.updateOrderExpectedDate = catchAsyncErrors(async (req, res, next) => {
  const {expectedDate} = req.body
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHander("You have already delivered this order", 400));
  }

  if (order.orderStatus === "Processing") {
    return next(new ErrorHander("This order is still on process.", 400));
  }

  if (req.body.status === "Shipped") {
    order.expectedDate = expectedDate;
    order.expectedAt = moment(expectedDate).format('MMMM DD YYYY');
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});