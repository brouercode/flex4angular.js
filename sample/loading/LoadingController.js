angular.module("faSample").controller('LoadingController', ['$scope', '$faLoading',
	function($scope, $faLoading) {

		$scope.isLoading = false;

		$scope.showLoad = function() {
			$faLoading.start();
			$scope.isLoading = true;
		};

		$scope.hideLoad = function() {
			$faLoading.stop();
			$scope.isLoading = false;
		};

	}
]);