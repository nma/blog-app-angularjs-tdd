describe('blogController', function() {
	beforeEach(module('blogApp'));

	describe('controller init', function() {
		var $controller, serviceMock, blogService;

		var posts = [{
		    id: 1,
		    title: 'A very long day',
		    content: 'Today was a very long day',
		    creationDate: new Date().getTime(),
		    views: 0
		  },
		  {
		    id: 2,
		    title: 'Welcome to the blog',
		    content: 'You must be new here!',
		    creationDate: new Date().getTime() - 1307,
		    views: 3
		  }
		];

		// setup prepare and instantiate our blogService
		beforeEach(inject([
                'blogService',
                '$controller',
               function (_blogService, _$controller) {
                    blogService = _blogService;
                    $controller = _$controller;
               }
            ]));

		// setup a sinon sandbox to mock out our blogService calls
        beforeEach(function() {
			serviceMock = sinon.sandbox.create();
			serviceMock.stub(blogService, 'getPosts').returns({
				then: function(fn) {
					fn(posts);
				}
			});
        });

		it ('should request the first batch of posts on init', function() {
			var scope = {};

			$controller('blogController', {$scope: scope, blogService: blogService});

			// verify that our posts are submitted correctly on initialization
			expect(blogService.getPosts.calledOnce).to.be.true;
			expect(scope.posts).to.equal(posts);
		});

		it ('should instantiate all functions needed to operate', function() {
			var scope = {};

			$controller('blogController', {$scope: scope, blogService: blogService});

			// verify that our scope methods exist and work as intended
			expect(scope.viewPost).to.exist;
			expect(scope.addPost).to.exist;
			expect(scope.savePost).to.exist;
			expect(scope.deletePost).to.exist;
			expect(scope.editPost).to.exist;
		});
	});
});
