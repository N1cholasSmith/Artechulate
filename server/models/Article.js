const { Schema, model } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const articleSchema = new Schema({
   // saved article id 
   articleId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  // WAS [ARRAY]
  username: {
      type: String,
    },
  body: {
    type: String,
    required: true,
  },
  // image: {
  //   type: String,
  // },
  // link: {
  //   type: String,
  // },
  createdAt: {
    type: String
  },
  comments: [
    {
      body: String,
      username: String,
      createdAt: String
    }
  ],
  likes: [
    {
      username: String,
      createdAt: String,
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
});


const Article = model('Article', articleSchema);

module.exports = { Article, articleSchema };
