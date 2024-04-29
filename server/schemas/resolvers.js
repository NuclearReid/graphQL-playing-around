const { User, Expense } = require('../models');
const { signToken, AuthenticationError} = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find();
        },
        user: async (parent, { username }) => {
            return User.findOne({ username });
        }
    },

    Mutation: {
        // Creating a user
        addUser: async (parent, {username, email, password}) => {
            const existingUser = await User.findOne({ username });
            if(existingUser){
                throw new AuthenticationError('Already a user with this username or email');
            }

            const user = await User.create({ 
                username, 
                email, 
                password,
            });
            const token = signToken(user);

            return {token, user};
        },

        // I think this will only be called once with the user creation to set their starting balance
        startingBalance: async (parent, {balance, username }) => {
            const updatedUser = await User.findOneAndUpdate(
                // the $exists is basically checking to make sure 'expense.balance' exists
                { username, 'expense.balance': { $exists: true } },
                // 'expense.$.balance is essentially looking in the expense array for the first spot that has balance and then sets that to be the balance the user sent
                { $set: { 'expense.$.balance': balance } }, 
                { new: true }
            );
            return updatedUser;
        },

        addBalance: async (parent, {balance, username }) => {
            const updatedUser = await User.findOneAndUpdate(
                {username, 'expense.balance': {$exists: true}},
                { $inc: {'expense.$.balance': balance }},
                {new: true},
            );
            return updatedUser;
        },
        
        addEatingOut: async (parent, {eatingOut, username }) => {
            const addEatingOut = await User.findOneAndUpdate(
                { username, 'expense.balance': { $exists: true } },
                { $inc: { 'expense.$.balance': -eatingOut, 'expense.$.eatingOut': eatingOut}},
                { new: true },
            );
            return addEatingOut;
        }
        
    }

}

module.exports = resolvers;