const Expenses = require("../models/expensesModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");



exports.createExpenses = catchAsyncErrors(async (req, res, next) => {
    const expenses = await Expenses.create(req.body);
    res.status(201).json({
        success: true,
        expenses,
    });
})

exports.getAdminExpenses = catchAsyncErrors(async (req, res, next) => {
    const expenses = await Expenses.find();
  
    res.status(200).json({
      success: true,
      expenses,
    });
  });
