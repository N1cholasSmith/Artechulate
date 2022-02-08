const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

module.exports = {
    Article: {
        likeCount: (parent) => parent.likes.length,
        commentCount: async (parent) => parent.comments.length
    },
    typeDefs,
    resolvers,
};

