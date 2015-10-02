describe('blog-post directive', function() {
	var compile, scope, directiveElem;

	beforeEach(function(){
		module('blogApp');

		inject(function($compile, $rootScope){
			compile = $compile;
			scope = $rootScope.$new();
		});

		directiveElem = getCompiledElement();
	});

	function getCompiledElement(){
		var element = angular.element('<div blog-post></div>');
		var compiledElement = compile(element)(scope);
		scope.$digest();
		return compiledElement;
	}

	it('should have an em element', function () {
		var emElement = directiveElem.find('em');
		expect(emElement).to.exist;
	});
});
