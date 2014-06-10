angular.module("faSample").controller('DialogController', ['$scope', '$faDialog',
	function($scope, $faDialog) {

		$scope.alert = function() {
			$faDialog.alert('alert text here', 'alert title customized');
		};
		$scope.error = function() {
			$faDialog.error('text error here');
		};
		$scope.information = function() {
			$faDialog.information('text information here');
		};
		$scope.success = function() {
			$faDialog.success('text success here');
		};
		$scope.confirm = function() {
			$faDialog.confirm('text confirmation here?');
		};
		$scope.customized = function() {
			var btCustomized = {
				label: 'i am not shure!',
				action: 'Maybe'
			};
			$faDialog.customized('text customized here, usage return function to show alert click button.', 
                                 'title customized', [btCustomized, $faDialog.btNO, $faDialog.btCANCEL], 
                                 returnF, $faDialog.btNO);
		};
		var returnF = function(action) {
			window.alert(action);
		};
	}
]);