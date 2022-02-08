const { Schema, model } = require('mongoose');


const articleSchema = new Schema({
   // saved article id 
  //  articleId: {
  //   type: String,
  //   required: true,
  // },
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
    type: String,
  },
  comments: [
    {
      body: String,
      username: String,
      createdAt: String,
    }
  ],
  likes: [
    {
      username: String,
      createdAt: String,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

articleSchema.virtual('commentCount').get(function () {
  return this.comments.length;
})

articleSchema.virtual('likeCount').get(function () {
  return this.likes.length;
})

const Article = model('Article', articleSchema);

module.exports = { Article, articleSchema };
