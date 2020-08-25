const mongoose = require('mongoose');

const resetPassSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    accesstoken: {
        type: String,
        required:true
    },
    isValid: {
        type: Boolean,
        required:true,
        default:true
    }

})

const resetPassModel = mongoose.model("Reset_pass_tokens",resetPassSchema);

module.exports = resetPassModel;