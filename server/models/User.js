const {Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must be an email address!'],
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
    },
    // this should be in the user schema but I have not done that yet
    // balance: {
    //     type: Number,
    // },
    expense: [
      {
        balance:{
            type: Number,
        },
        // nest an array into each of these with the budget and how much spent
        eatingOut: {
            type: Number,
        }
      }
    ],


});

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    // initializes and sets the expenses to 0 when a new User is created.
    // balace will be changed when the mutation 'startingBalance' is called
    this.expense = [{ balance: 0, eatingOut: 0 }];
    next();

});

userSchema.methods.isCorrectPassword = async function (password){
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;