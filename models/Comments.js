var mongoose = require('mongoose');

var CommentSchema = new mongooseSchema({
    body: String,
    author: String,
    upvotes: {type: Number, default: 0},
    posts: { type: mongoose.Schema.Types.ObjectId, ref: 'Post'}


});

mongoose.model('Comment', CommentSchema);
