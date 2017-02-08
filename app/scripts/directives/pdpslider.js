'use strict';

/**
 * @ngdoc directive
 * @name pdpSliderApp.directive:pdpSlider
 * @description
 * # pdpSlider
 */
angular.module('pdpSliderApp')
    .directive('pdpSlider', function() {
        return {
            scope: {
                'curSlide': "=",
                'updateEvent': "@"
            },
            templateUrl: 'views/pdpslider.html',
            restrict: 'E',
            replace: true,
            transclude: true,
            controller: [
                '$scope',
                '$element',
                function(
                    $scope,
                    $element
                ) {
                    var that = this,
                        carouselElement = $element.find('ul')[0],
                        /** Swipe Function Variables */
                        onSwipeFn;

                    ///////////////
                    // Functions //
                    ///////////////

                    function updateSliderFn() {
                        var transformVal = "translate(-" + (100 * $scope.curSlide) + "%,0)";
                        carouselElement.style.webkitTransform = transformVal;
                        carouselElement.style.mozTransform = transformVal;
                        carouselElement.style.msTransform = transformVal;
                        carouselElement.style.oTransform = transformVal;
                        carouselElement.style.transform = transformVal;
                    }

                    onSwipeFn = function(num) {
                        var addBy = num;
                        return function() {
                            if (($scope.curSlide >= that.slides.length - 1 && addBy > 0) ||
                                ($scope.curSlide <= 0 && addBy < 0)) {
                                return
                            }
                            $scope.curSlide += addBy;
                            updateSliderFn();
                        };
                    };

                    //////////
                    // Init //
                    //////////
                    updateSliderFn();

                    /////////////////////////////
                    // Scope Property Bindings //
                    /////////////////////////////
                    /** Defaults */
                    $scope.curSlide = $scope.curSlide || 0;
                    $scope.updateEvent = $scope.updateEvent || "pdpUpdate";
                    /*************/
                    $scope.swipeLeft = onSwipeFn(1);
                    $scope.swipeRight = onSwipeFn(-1);

                    that.slides = {
                        'length': 0
                    };

                    /////////////////////
                    // Event Listeners //
                    /////////////////////
                    $scope.$on($scope.updateEvent, function(slide) {
                        $scope.$$postDigest(function() {
                            updateSliderFn();
                        });
                    });
                }
            ]
        };
    })
    .directive('pdpSliderItem', function() {
        return {
            restrict: 'E',
            require: "^pdpSlider",
            replace: true,
            transclude: true,
            template: "<li class=\"pdp-carousel-item\" ng-transclude></li>",
            link: function(scope, element, attrs, pdpSliderCtrl) {
                pdpSliderCtrl.slides.length++;
            }
        };
    });
