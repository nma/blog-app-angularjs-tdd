// in-memory cache to store blog posts
var posts = {
  1: {
    id: 1,
    title: 'A very long day',
    content: 'Today was a very long day',
    creationDate: new Date().getTime(),
    views: 0
  },
  2: {
    id: 2,
    title: 'Welcome to the blog',
    content: 'You must be new here!',
    creationDate: new Date().getTime() - 1307,
    views: 3
  }
};
var nextPostId = 3;

module.exports = {

  add: function(post) {
    posts[post.id] = post;
    nextPostId++;
    return post.id;
  },

  get: function(optId) {
    if (optId) {
      return posts.optId;
    }
    return posts;
  },

  del: function(id) {
    // remove the post from the cache
    delete posts[id];
  },

  update: function(id, post) {
    // update the post in the cache
    posts[post.id] = post;
    return post;
  },

  getNextId: function() {
    return nextPostId;
  }

};
