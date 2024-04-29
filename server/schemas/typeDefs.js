const typeDefs = `
    type User {
        _id: ID
        username: String
        email: String
        expense: [Expense]
    }

    type Expense {
        balance: Float
        eatingOut: Float
    }
    

    type Auth {
        token: String
        user: User
    }

    type Query {
        users: [User]
        user(username: String!): User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        startingBalance(username: String!, balance: Float): User
        addBalance(username: String!, balance: Float): User
        addEatingOut(username: String!, eatingOut: Float): User
    }
`;

module.exports = typeDefs;