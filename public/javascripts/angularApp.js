var app = angular.module('flapperNews',['ui.router']);

app.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('home', {
    url: '/home',
    templateUrl: '/home.html',
    controller: 'MainCtrl'
  })
  .state('posts', {
    url: '/posts{id}',
    templateUrl: 'posts.ejs',
    controller: 'PostsCtrl'
  });

  $urlRouterProvider.otherwise('home');
}]);

app.factory('posts', [function() {

  var o = {
    posts: [
      {title:'post1', upvotes: 3},
      {title:'post2', upvotes: 4},
      {title:'post3', upvotes: 3},
      {title:'post4', upvotes: 25},
    ]
  };
  return o;
}]);

app.controller('PostsCtrl', [
  '$scope',
  '$stateParams',
  'posts',
  function($scope, $stateParams, posts) {

    $scope.post = posts.posts[$stateParams.id];

}]);

app.controller('MainCtrl', [
  '$scope',
  'posts',
  function($scope, posts){

    $scope.test = 'Hello world!';

    // $scope.posts = [
    //   {title:'post1', upvotes: 3},
    //   {title:'post2', upvotes: 4},
    //   {title:'post3', upvotes: 3},
    //   {title:'post4', upvotes: 25},
    // ];

     $scope.posts = posts.posts;



    $scope.addPost = function() {
      // if (!$scope.title || $scope.title === '') {return;}


      $scope.posts.push({
        title: $scope.title,
        link: $scope.link,
        upvotes: 0,
        comments: [
          {author: 'Bla', body: 'asum stuff', upvotes: 0},
          {author: 'Alice', body: 'sheit', upvotes: 0},
        ]
      });
      $scope.title = '';
      $scope.link = '';


    };

    $scope.incrementUpvotes = function(post) {
      post.upvotes += 1;
    };


  }]);
