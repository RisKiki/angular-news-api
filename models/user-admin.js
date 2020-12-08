const mongoose = require('mongoose');

const UserAdminSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    email : {
        type: String,
        unique : true
    },
    password : String
});

module.exports = mongoose.model('UserAdmin', UserAdminSchema);