const { AuthenticationError } = require('apollo-server-express');
const { UserInputError } = require('apollo-server-express')
const { User, Article } = require('../models');
const { signToken } = require('../utils/auth');
const { validateRegisterInput, validateLoginInput } = require('../utils/validators')

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
  Query: {
    getArticles: async (parent, args, context) => {
      if (context.articles) {
      const articles = await Article.find();
      return articles;
      } 
        // throw new Error(err);
    },
  },

  // Query: {
  //   async getArticles() {
  //     try {
  //       const articles = await Article.find()
  //       return articles;
  //     } catch (err) {
  //       throw new Error(err);
  //     }
  //   }
  // },

  

  Mutation: {
    // EMAIL LOGIN =========================================================
    // login: async (parent, { email, password }) => {
    //   const user = await User.findOne({ email });

    //   if (!user) {
    //     throw new AuthenticationError("Invalid credentials");
    //   }

    //   const correctPassword = await user.isCorrectPassword(password);
    //   if (!correctPassword) {
    //     throw new AuthenticationError("Invalid credentials");
    //   }
    //   const token = signToken(user);

    //   return { token, user };
    // },

    // USERNAME LOGIN =========================================================
    login: async (parent, { username, password }) => {
      const { errors, valid } = validateLoginInput(username, password);
      const user = await User.findOne({ username });

      if (!user) {
        errors.general = 'User not found';
        throw new UserInputError("Invalid credentials", { errors });
      }

      const correctPassword = await user.isCorrectPassword(password);
      if (!correctPassword) {
        throw new UserInputError("Invalid credentials", { errors });
      }

      if (!valid) {
        throw UserInputError ('Errors', { errors });
      }

      const token = signToken(user);

      return { token, user };
    },
    
    // REGISTER NEW USER =====================================================
    register: async (parent, {
      registerInput: {username, email, password, confirmPassword }
      }, context ) => {
      
        // validates the required fields 
      const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword);
      if(!valid){
        throw new UserInputError('Validation errors', { errors })
      }

      // finds the users info and validates the username is unique
      const user = await User.findOne({ username });
      if(user){
        throw new UserInputError('Username is taken, must be unique', {
          errors: {
            username: 'This username is taken'
          }
        })
      }

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString()
      });

      // const user = await User.create(args);
      // const token = signToken(user);
   
    },

    //    addUser: async (parent, { username, email, password }) => {
    // const user = await User.create({ username, email, password });

    // ADD NEW USER ===========================================================
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

    deleteArticle: async (parent, { articleId }, context) => {
      console.log('deleteArticle resolver hit')
      if (context.user) {
        console.log('We have context (deleteArticle)')
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedArticles: { articleId: articleId } } },
          { new: true }
        );
        return updatedUser;
      }
      console.log('deleteArticle Authentication Failed')
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};


module.exports = resolvers;
