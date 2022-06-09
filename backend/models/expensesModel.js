const mongoose = require("mongoose");
const moment = require('moment')

const expensesSchema = mongoose.Schema({

    expensesTshirt: {
        type: Number,
        required:true,
    },
    expensesInk: {
        type: Number,
        required:true,
    },
    createdAt: {
        type: String,
        default: `${moment().format('MMMM YYYY')}`,
    },
});

module.exports = mongoose.model("Expenses", expensesSchema);
