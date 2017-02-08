'use strict';

describe('Directive: pdpSlider', function () {

  // load the directive's module
  beforeEach(module('pdpSliderApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<pdp-slider></pdp-slider>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the pdpSlider directive');
  }));
});
