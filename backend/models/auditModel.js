const mongoose = require('mongoose');

const auditSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user_action: {
        type: String,
        required: true,
    },
    action_time: {
        type: String,
        required:true
    },
    action_date: {
        type: String,
        required:true
    }
})

module.exports = mongoose.model("Audit", auditSchema);