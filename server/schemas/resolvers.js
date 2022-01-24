const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );
        return userData;
      }
      // LAST PIECE OF THE PUZZLE
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Invalid credentials");
      }

      const correctPassword = await user.isCorrectPassword(password);
      if (!correctPassword) {
        throw new AuthenticationError("Invalid credentials");
      }
      const token = signToken(user);

      return { token, user };
    },

    //    addUser: async (parent, { username, email, password }) => {
    // const user = await User.create({ username, email, password });

    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    // rough draft (changed books to articles)
    saveArticle: async (parent, { input }, context) => {
      console.log('saveArticle resolver hit')
      if (context.user) {
        console.log('We have context (saveArticle)')
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedArticles: input } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      }
      console.log('Authentication Failed')
      throw new AuthenticationError("You need to be logged in!");
    },

    removeArticle: async (parent, { articleId }, context) => {
      console.log('removeArticle resolver hit')
      if (context.user) {
        console.log('We have context (removeArticle)')
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedArticles: { articleId: articleId } } },
          { new: true }
        );
        return updatedUser;
      }
      console.log('removeArticle Authentication Failed')
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};


module.exports = resolvers;
