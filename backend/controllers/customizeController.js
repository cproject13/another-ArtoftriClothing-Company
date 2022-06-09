const Custom = require("../models/customModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

// upload Custom Item
exports.createCustom = catchAsyncErrors(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;


  const custom = await Custom.create(req.body);
  const id = custom._id;
  console.log(id)
  res.status(201).json({
    success: true,
    custom,
    id: custom._id
  });
});

// Get Custom Details
exports.getCustomDetails2 =catchAsyncErrors(async (req, res, next) => {

    const { id } = req.params
    const custom = await Custom.findById(id);

    res.status(200).json({
      success: true,
      custom,
    });
  });

