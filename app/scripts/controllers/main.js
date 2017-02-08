'use strict';

/**
 * @ngdoc function
 * @name pdpSliderApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pdpSliderApp
 */
angular.module('pdpSliderApp')
    .controller('MainCtrl', [
        '$scope',
        function(
            $scope
        ) {
            ///////////////
            // Functions //
            ///////////////
            function setToStartFn() {
                $scope.curSlide = 1;
                $scope.$broadcast('pdpUpdate');
            }

            function setToEndFn() {
                $scope.curSlide = 8;
                $scope.$broadcast('pdpUpdate');
            }

            /////////////////////////////
            // Scope Property Bindings //
            /////////////////////////////
            $scope.slides = [
                "images/img1.jpg",
                "images/img2.jpg",
                "images/img3.jpg",
                "images/img1.jpg",
                "images/img2.jpg",
                "images/img3.jpg",
                "images/img1.jpg",
                "images/img2.jpg",
                "images/img3.jpg"
            ];

            $scope.curSlide = 7;

            $scope.setToStart = setToStartFn;
            $scope.setToEnd = setToEndFn;
        }
    ]);
