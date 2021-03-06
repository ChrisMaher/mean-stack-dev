'use strict';

// Coupons controller
angular.module('coupons').controller('CouponsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Coupons',
	function($scope, $stateParams, $location, Authentication, Coupons) {
		$scope.authentication = Authentication;

		// Create new Coupon
		$scope.create = function() {
			// Create new Coupon object
			var coupon = new Coupons ({
				name: this.name
			});

			// Redirect after save
			coupon.$save(function(response) {
				$location.path('coupons/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Coupon
		$scope.remove = function(coupon) {
			if ( coupon ) { 
				coupon.$remove();

				for (var i in $scope.coupons) {
					if ($scope.coupons [i] === coupon) {
						$scope.coupons.splice(i, 1);
					}
				}
			} else {
				$scope.coupon.$remove(function() {
					$location.path('coupons');
				});
			}
		};

		// Update existing Coupon
		$scope.update = function() {
			var coupon = $scope.coupon;

			coupon.$update(function() {
				$location.path('coupons/' + coupon._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Coupons
		$scope.find = function() {
			$scope.coupons = Coupons.query();
		};

		// Find existing Coupon
		$scope.findOne = function() {
			$scope.coupon = Coupons.get({ 
				couponId: $stateParams.couponId
			});
		};
	}
]);