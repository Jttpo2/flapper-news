var app = angular.module('flapperNews',['ui.router']);

app.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('home', {
    url: '/home',
    templateUrl: '/home.html',
    controller: 'MainCtrl',
    resolve: {
      postPromise: ['posts', function(posts) {
        return posts.getAll();
      }]
    }
  })
  .state('posts', {
    url: '/posts/{id}',
    templateUrl: '/posts.html',
    controller: 'PostsCtrl'
  });

  $urlRouterProvider.otherwise('home');
}]);

app.factory('posts', ['$http', function($http) {

  var o = {
    posts: [
      // {title:'post1', upvotes: 3, comments: [
      //   {author: 'Bla', body: 'asum stuff', upvotes: 0},
      //   {author: 'Alice', body: 'sheit', upvotes: 0},
      // ]},
      // {title:'post2', upvotes: 4},
      // {title:'post3', upvotes: 3},
      // {title:'post4', upvotes: 25},
    ]
  };

  o.getAll = function() {
    return $http.get('/posts').success(function(data) {
      angular.copy(data, o.posts);
    });
  };

  o.create = function(post) {
    return $http.post('/posts', post).success(function(data) {
      o.posts.push(data);
    });
  };

  return o;
}]);

app.controller('PostsCtrl', ['$scope',
'$stateParams',
'posts',
function($scope, $stateParams, posts) {

  $scope.post = posts.posts[$stateParams.id];

  $scope.addComment = function(){
    if($scope.body === '') { return; }
    $scope.post.comments.push({
      body: $scope.body,
      author: 'user',
      upvotes: 0
    });
    $scope.body = '';
  };

}]);

app.controller('MainCtrl', [ '$scope',
'posts',
function($scope, posts){

  $scope.posts = posts.posts;


  $scope.addPost = function() {
    // if (!$scope.title || $scope.title === '') {return;}

    posts.create({
      title: $scope.title,
      link: $scope.link
    });

    $scope.title = '';
    $scope.link = '';


    // $scope.posts.push({
    //   title: $scope.title,
    //   link: $scope.link,
    //   upvotes: 0,
    //   comments: [
    //     {author: 'Bla', body: 'asum stuff', upvotes: 0},
    //     {author: 'Alice', body: 'sheit', upvotes: 0},
    //   ]
    // });
    // $scope.title = '';
    // $scope.link = '';


  };

  $scope.incrementUpvotes = function(post) {
    post.upvotes += 1;
    console.log("voted up");
  };

}]);
