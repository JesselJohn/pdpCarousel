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
        }
    ]);
