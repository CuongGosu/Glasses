var api = 'http://localhost:3000/account';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    username: String,
    password: String
},{
    collection: "account"
});

const AccountModel = mongoose.model('account',accountSchema)
module.exports = AccountModel