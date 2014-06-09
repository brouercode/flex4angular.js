angular.module("faSample").controller('DialogController', ['$scope', '$faDialog',
	function($scope, $faDialog) {

		$scope.alert = function() {
			$faDialog.alert('texto alerta', 'titulo alerta customizado', returnF);
		};
		$scope.error = function() {
			$faDialog.error('texto error', null);
		};
		$scope.information = function() {
			$faDialog.information('texto information', null);
		};
		$scope.success = function() {
			$faDialog.success('texto success', null);
		};
		$scope.confirm = function() {
			$faDialog.confirm('Deseja mostrar um alerta?', null, returnF);
		};
		$scope.customized = function() {

			var btSera = {
				label: 'Talvez',
				action: 'SERA'
			};
			$faDialog.customized('texto', 'title', [btSera, $faDialog.btNO, $faDialog.btCANCEL], returnF, $faDialog.btNO);
		};

		var returnF = function(action) {
			if (action == $faDialog.btYES.action)
				window.alert(action);
		};
	}
]);