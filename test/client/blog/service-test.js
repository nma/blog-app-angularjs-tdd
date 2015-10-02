describe('blogService testing', function() {
	var blogService;

	beforeEach(module('blogApp'));

	beforeEach(inject(function($injector) {
		blogService = $injector.get('blogService');
	}));

	it("should define the getPosts", function() {
		expect(blogService.getPosts).to.exist;
		expect(blogService.savePost).to.exist;
		expect(blogService.deletePost).to.exist;
	});

});