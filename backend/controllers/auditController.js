const Audit = require('../models/auditModel');

exports.get_actions = async (req,res) => {
    try {
        const userActions = await Audit.find({});
        res.status(200).json(userActions);
    }
    catch(err) {
        console.log(err);
    }
}

exports.post_actions = async (req,res) => {
    const { name,user_action,action_time,action_date } = req.body;
    
    try {
        const postAction = await Audit.create({ name,user_action,action_time,action_date });
        console.log(`${name} already ${user_action}`);
    } 
    catch(err) {
        console.log(err);
    }
}