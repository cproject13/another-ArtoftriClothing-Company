const mongoose = require("mongoose");
const moment = require('moment')

const productSchema = mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  NoCustomerOrdered: {
    type: Number,
    required: true,
    default: 0
  },
  name: {
    type: String,
    required: [true, "Please Enter product Name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter product Description"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter product Price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please Enter Product Category"],
  },
  Stock: {
    type: Number,
    required: [true, "Please Enter product Stock"],
  },
  SmallStock: {
    type: Number,
    maxLength: [4, "Stock cannot exceed 4 characters"],
    default: 0,
  },
  MediumStock: {
    type: Number,
    maxLength: [4, "Stock cannot exceed 4 characters"],
    default: 0,
  },
  LargeStock: {
    type: Number,
    maxLength: [4, "Stock cannot exceed 4 characters"],
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: String,
    default: `${moment().format('MMMM DD YYYY')}`,
  },
  // createdTimeAt: {
  //   type: String,
  //   default:new Date().toLocaleTimeString(),
  // },
});

module.exports = mongoose.model("Product", productSchema);
