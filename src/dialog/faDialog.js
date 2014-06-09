angular.module('flex4angular.dialog', ['pascalprecht.translate', 'ui.bootstrap'])

.run(["$templateCache",
	function($templateCache) {
		$templateCache.put("template/framework/dialog.html",
			"<div class=\"{{windowClass}}\">" +
			"	<div class=\"modal-header\">" +
			"		<h4 class=\"modal-title\">{{options.messageTitle | translate}}</h4>" +
			"	</div>" +
			"	<div class=\"modal-body\" ng-bind-html=\"toHTML(options.message)\"></div>" +
			"	<div class=\"modal-footer\" id=\"footerModal\">" +
			"		<span ng-repeat=\"button in options.buttons\" ng-click=\"action(button)\" class=\"btn btn-default\" " +
			"			ng-class=\"{active : button == defaultButton}\" >{{button.label | translate}}</span>" +
			"	</div>" +
			"</div>");
	}
]);

angular.module('flex4angular.dialog')
/**
  Factory para exibição da caixa de dialogo

	EX:
	$faDialog.confirm('Deseja excluir esse registro?', 'Exclusão', function(action) {
		if (action == $faDialog.btYES.action)
			console.log("registro excluído"); 
		});		
**/
.factory('$faDialog', ['$modal', '$sce', '$window', '$timeout',
	function($modal, $sce, $window, $timeout) {

		var btOK = {
			label: 'BT_OK',
			action: 'OK'
		};

		var btYES = {
			label: 'BT_YES',
			action: 'YES'
		};

		var btNO = {
			label: 'BT_NO',
			action: 'NO'
		};

		var btCANCEL = {
			label: 'BT_CANCEL',
			action: 'CANCEL'
		};

		var alert = function(message, messageTitle, handler) {
			if (!messageTitle)
				messageTitle = 'MESSAGE_TITLE_ALERT';
			showAlert(message, messageTitle, [btOK], handler, btOK, "dialog-alert");
		};

		var error = function(message, messageTitle, handler) {
			if (!messageTitle)
				messageTitle = 'MESSAGE_TITLE_ERROR';
			showAlert(message, messageTitle, [btOK], handler, btOK, "dialog-error");
		};

		var information = function(message, messageTitle, handler) {
			if (!messageTitle)
				messageTitle = 'MESSAGE_TITLE_INFORMATION';
			showAlert(message, messageTitle, [btOK], handler, btOK, "dialog-information");
		};

		var success = function(message, messageTitle, handler) {
			if (!messageTitle)
				messageTitle = 'MESSAGE_TITLE_SUCCESS';
			showAlert(message, messageTitle, [btOK], handler, btOK, "dialog-success");
		};

		var confirm = function(message, messageTitle, handler, defaultButton) {
			if (!messageTitle)
				messageTitle = 'MESSAGE_TITLE_CONFIRM';
			if (!defaultButton)
				defaultButton = btYES;
			showAlert(message, messageTitle, [btYES, btNO], handler, defaultButton, "dialog-confirm");
		};

		var customized = function(message, messageTitle, buttons, handler, defaultButton, windowClass) {
			showAlert(message, messageTitle, buttons, handler, defaultButton, windowClass);
		};

		var showAlert = function(message, messageTitle, buttons, handler, defaultButton, windowClass) {

			var modalInstance = $modal.open({
				templateUrl: 'template/framework/dialog.html',
				controller: controllerAlert,
				backdrop: 'static',
				keyboard: false,
				resolve: {
					options: function() {
						return {
							message: message,
							messageTitle: messageTitle,
							buttons: buttons,
							handler: handler,
							defaultButton: defaultButton,
							windowClass: windowClass
						};
					}
				}
			});

		};

		var controllerAlert = function($scope, $modalInstance, options) {
			$scope.options = options;
			$scope.defaultButton = options.defaultButton;
			$scope.windowClass = options.windowClass;

			$scope.action = function(button) {
				angular.element($window).unbind('keydown keypress', $scope.keyFunction);
				$modalInstance.close();
				if ($scope.options.handler) {
					//delay para executar o handler só depois do modal estar fechado
					$timeout(function() {
						$scope.options.handler(button.action);
					}, 300);
				}
			};

			//função que permite a exibição do corpo da mensagem como html
			$scope.toHTML = function(text) {
				return $sce.trustAsHtml(text);
			};

			//controle de escolha das ações
			//13[enter], 32[space], 9[tab], 37[left], 39[right]
			$scope.keyFunction = function(e) {
				if (e.keyCode == 13 || e.keyCode == 32) {
					$scope.action($scope.defaultButton);
				} else if (e.keyCode == 9 || e.keyCode == 37 || e.keyCode == 39) {
					if (e.keyCode == 9)
						e.keyCode = e.shiftKey ? 37 : 39;
					var index = options.buttons.indexOf($scope.defaultButton);
					index += e.keyCode == 37 ? -1 : 1;
					if (index == options.buttons.length)
						index = 0;
					else if (index == -1)
						index = options.buttons.length - 1;

					$scope.defaultButton = options.buttons[index];
					$scope.$apply();
				}
				e.preventDefault();
			};

			angular.element($window).bind('keydown keypress', $scope.keyFunction);
		};

		return {
			alert: alert,
			error: error,
			information: information,
			success: success,
			confirm: confirm,
			customized: customized,
			btYES: btYES,
			btNO: btNO,
			btCANCEL: btCANCEL,
			btOK: btOK
		};
	}
]);