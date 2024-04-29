

// this is not used currently


const { Schema, model } = require('mongoose');

const expenseSchema = new Schema ({
    balance: {
        type: Number,
        default: 0
    },
    eatingOut: {
        type: Number,
        default: 0
    },
});


const Expense = model('Expense', expenseSchema);

module.exports = Expense


// user

// transactions -> set classification types
     // things like rent, housing, food. etc

// expenses 
// savings


// give the use ra list of transactions