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
    // ARTICLE QUERIES =====================================================================================================
    getArticles: async () => {
      // sorting the articles into order of creating
      const articles = await Article.find()
        .populate('user')
        .sort({ createdAt: -1 });

      if (articles) {
        // if Articles exist it will return them all
        return articles;
      } else {
        throw new Error('article not found')
      }
    },
    getArticle: async (parent, { articleId }) => {
      const article = await Article.findById(articleId);
      if (article) {
        // if article exists return it
        return article;
      } else {
        throw new Error('article not found')
      }
    },
  },



  Mutation: {

    // USERNAME LOGIN ========================================================================================
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
        throw UserInputError('Errors', { errors });
      }

      const token = signToken(user);

      return { token, user };
    },

    // REGISTER NEW USER ==================================================================================
    register: async (parent, { registerInput }, context) => {

      let { username, email, password, confirmPassword } = registerInput

      // validates the required fields 
      const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword);
      if (!valid) {
        throw new UserInputError('Validation errors', { errors })
      }

      // finds the users info and validates the username is unique
      let user = await User.findOne({ username });
      if (user) {
        throw new UserInputError('Username is taken, must be unique', {
          errors: {
            username: 'This username is taken'
          }
        })
      }

      // const newUser = new User({
      //   email,
      //   username,
      //   password,
      //   createdAt: new Date().toISOString()
      // });

      user = await User.create(registerInput);
      const token = signToken(user);
      return { token, user };
    },

    // CREATE ARTICLE ======================================================================================
    createArticle: async (parent, { body, title }, context) => {
      console.log('createArticle resolver hit')
      if (context.user) {
        console.log(context.user)
        console.log('we have context (createArticle')

        // PREVENTS ARTICLES WITH NO CONTENT
        // if(args.body.trim() === '') {
        //   throw new Error('Article body must not be empty')
        // }

        const newArticle = await Article.create({
          body,
          user: context.user._id,
          username: context.user.username,
          title: title,
          createdAt: new Date().toISOString(),
          // comments: [Comment],
          // likes: [Like],
        });
        // ******************************* SUBSCRIPTION **********************************
        // context.pubsub.publish('NEW_ARTICLE',{
        //   newArticle: Article
        // });

        return newArticle;
      } else {
        throw new AuthenticationError("You need to be logged in!");
      }
    },

    // DELETE ARTICLE ====================================================================================
    deleteArticle: async (parent, { articleId }, context) => {
      console.log('deleteArticle resolver hit')

      // TODO: Only the Creator should be able to delete
      if (context.user) {
        console.log(context.user)
        console.log('We have context (deleteArticle)')
        const updatedUser = await Article.findOneAndRemove(
          { _id: articleId },
        );

        console.log("deleteArticle Successful")
        return updatedUser;
      }
      console.log('deleteArticle Authentication Failed')
      throw new AuthenticationError("You need to be logged in!");
    },

    // UPDATE ARTICLE ================================================================================
    updateArticle: async (parent, args, context) => {
      console.log(args)
      console.log('updateArticle resolver hit')
      // let { body, title } = updateArticle 

      if (context.user) {
        console.log(context.user)
        console.log('We have context (updateArticle)')
        const updateArticle = await Article.findOneAndUpdate(
          { _id: context.user._id },
          {
            $set: {
              article: body,
              article: title,
            },
          },
          {
            new: true,
            runValidators: true
          },

        );
        console.log("updateArticle Successful")
        return updateArticle

      } else {
        console.log('updateArticle Authentication Failed')
        // throw new AuthenticationError("You need to be logged in!"); 
      }
    },

    // SAVE ARTICLE ==============================================================================================
    // rough draft (changed books to articles)
    savedArticle: async (parent, { input }, context) => {
      console.log('saveArticle resolver hit')
      if (context.user) {
        console.log(context.user)
        console.log('We have context (saveArticle)')
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedArticle: input } },
          { new: true, runValidators: true }
        );
        console.log("saveArticle Successful")
        return updatedUser;
      }
      console.log('Authentication Failed')
      throw new AuthenticationError("You need to be logged in!");
    },

    // COMMENTS SECTION ==============================================================================================
    createComment: async (parent, { articleId, body }, context) => {
      const { username } = context.user

      if (body.trim() === '') {
        throw UserInputError('Empty comment', {
          errors: {
            body: 'Comment body must not be empty'
          }
        })
      }

      const article = await Article.findById(articleId);

      if (article) {
        // unshift adds comment to the top
        article.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString()
        })
        await article.save();
        return article;
      } else throw new UserInputError('Article not found');
    },

    // DELETE COMMENTS ===============================================================================================
    deleteComment: async (parent, { articleId, commentId }, context) => {
      const { username } = context.user

      const article = await Article.findById(articleId);

      if (article) {
        // finds the comment in the index of comments to delete it from
        const commentIndex = article.comments.findIndex(
          (c) => c.id === commentId
        );

        if (article.comments[commentIndex].username === username) {
          article.comments.splice(commentIndex, 1);
          await article.save();
          return article;
        } else {
          // throws error if user is trying to delete a comment that is not theirs
          throw new AuthenticationError('Action not allowed')
        }
      } else {
        throw new UserInputError('Article not found')
      }
    },

    // LIKE ARTICLE ==================================================================================================
    // GQ ERR - "Cannot read property 'find' of undefined"
    likeArticle: async (parent, { articleId }, context) => {
      if (context.user) {
        const { username } = context.user;

        const article = await Article.findById(articleId).populate('user');
        if (article) {
          // if article exists user can like only once
          if (article.likes.find(like => like.username === username)) {
            // unlike article if already liked
            article.likes = article.likes.filter(
              (like) => like.username !== username
            );
            article;
          } else {
            article.likes.push({
              username,
              createdAt: new Date().toISOString(),
            });
          }
          await article.save();
          return article;

        } else throw new UserInputError('Article not found');
      } else {
        console.log('updateArticle Authentication Failed')
        throw new AuthenticationError("You need to be logged in!");
      }

    },




    // Counts the number of likes and comments


    //   Subscription: {
    //     newArticle: {
    //       notification: (parent, args, { pubsub }) => pubsub.asyncIterator('NEW_ARTICLE')
    //     }
    //   }
  },
};

module.exports = resolvers;

    // *************************** SUBSCRIPTION *******************************************
    // Server
    // typedef subscription
    // resolver
    // schema/index.js Subscription

    // graphql error
    // "error": "Could not connect to websocket endpoint ws://localhost:3001/graphql. Please check if the endpoint url is correct."

    // resolver function
    // Subscription: {
    //   newArticle: {
    //     notification: (parent, args, { pubsub }) => pubsub.asyncIterator('NEW_ARTICLE')
    //   }
    // }

    // create article
    // context.pubsub.publish('NEW_ARTICLE',{
    //   newArticle: Article
    // });

    // ******************************************************************************************



    // ADD NEW USER ===========================================================
    // addUser: async (parent, args) => {
    //   const user = await User.create(args);
    //   const token = signToken(user);

    //   return { token, user };
    // },

  // EMAIL LOGIN =============================================================================================
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