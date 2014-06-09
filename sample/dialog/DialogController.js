angular.module("faSample").controller('DialogController', ['$scope', '$fwDialog',
	function($scope, $fwDialog) {

		$scope.alert = function() {
			$fwDialog.alert('texto alerta<br>teste<b>bold</b><br><br><br>aas<br><br>aasdasd', 'titulo alerta customizado', returnF);
		};
		$scope.error = function() {
			$fwDialog.error('texto error<br>asd', null);
		};
		$scope.information = function() {
			$fwDialog.information('texto information', null);
		};
		$scope.success = function() {
			$fwDialog.success('texto success', null);
		};
		$scope.confirm = function() {
			$fwDialog.confirm('Deseja mostrar um alerta?', null, returnF);
		};
		$scope.customized = function() {

			var btSera = {
				label: 'Talvez',
				action: 'SERA'
			};
			$fwDialog.customized('texto', 'title', [btSera, $fwDialog.btNO, $fwDialog.btCANCEL], returnF, $fwDialog.btNO);
		};

		var returnF = function(action) {
			if (action == $fwDialog.btYES.action)
				window.alert(action);
		};
	}
]);