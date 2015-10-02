(function(app) {
	app.controller('blogController', ['$scope', 'blogService', function($scope, blogService) {
		angular.extend($scope, {
			posts: [],
			addPost: function() {
				var post = {
					id: blogService.getNextId(),
					title: 'Untitled Post',
					creationDate: new Date().getTime(),
					content: '',
					views: 0
				};

				$scope.posts[post.id] = post;
				$scope.editPost(post);
			},
			editPost: function(post) {
				post.is_editing = true;
			},
			viewPost: function(post) {
				post.views++;
				blogService.savePost(post);
			},
			savePost: function(post) {
				// strip is_editing state
				delete post.is_editing;

				blogService.savePost(post);
			},
			deletePost: function(post) {
				delete $scope.posts[post.id];
				blogService.deletePost(post);
			}
		});

		// initiate our first batch of posts in our scope
		blogService.getPosts().then(function(posts) {
			$scope.posts = posts;
		});
	}]);

	app.directive('blogPost', [function() {
		return {
			restrict: 'A',
			scope: {
				post: '=ngModel'
			},
			template: "" +
				"<div>" +
					"<h1><a ng-click='view()'>{{post.title}}</a></h1>" +
					"<em>{{ post.creationDate | date:'medium' }}</em>" +
					"<p>{{post.content}}</p>" +
					"<button class='btn btn-success' ng-click='edit()'>Edit Blog Post</button>" +
				"</div>",
			link: function($scope)
			{
				$scope.edit = function()
				{
					$scope.$parent.editPost($scope.post);
				};

				$scope.view = function()
				{
					$scope.$parent.viewPost($scope.post);
				};
			}
		};
	}]);

	app.directive('blogPostEditor', [function() {
		return {
			restrict: 'A',
			scope: {
				post: '=ngModel'
			},
			template: "" +
				"<div class='form-group'>" +
					"<h1><input type='text' ng-model='post.title' /></h1>" +
					"<em>{{ post.creationDate | date:'medium' }}</em>" +
					"<textarea class='form-control' ng-model='post.content' rows='10'></textarea>" +
				"</div>" +
				"<div class='form-group pull-right'>" +
					"<button class='btn btn-default' ng-click='delete()'>Delete</button>" +
					"<button class='btn btn-success' ng-click='save()'>Publish</button>" +
				"</div>",
			link: function($scope)
			{
				angular.extend($scope, {
					delete: function()
					{
						$scope.$parent.deletePost($scope.post);
					},
					save: function()
					{
						$scope.$parent.savePost($scope.post);
					}
				});
			}
		};
	}]);

	app.factory('blogService', ['$http', function($http) 
	{
		return {
			getPosts: function()
			{
				return $http.get('http://localhost:3000/posts')
					.then(function(response) {
						return response.data;
					});
			},
			savePost: function(post)
			{
				return $http.put('http://localhost:3000/posts/' + post.id, post);
			},
			deletePost: function(post)
			{
				return $http.delete('http://localhost:3000/posts/' + post.id);
			},
			getNextId: function()
			{
				return $http.get('http://localhost:3000/posts/next')
					.then(function(response) {
						return response.data;
					});
			}
		};
	}]);

})(angular.module('blogApp', []));;