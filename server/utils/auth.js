const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

// move this to a .env file later on
const secret = 'asecrete';
const expiration = '2h';

module.exports = {
    AuthenticationError: new GraphQLError('could not authenticate user', {
        extensions: {
            code: 'UNATHENTICATED',
        },
    }),
    signToken: function ( { email, username, _id}){
        const payload = { email, username, _id };
        return jwt.sign({ data:payload }, secret, {expiresIn: expiration });
    },
};