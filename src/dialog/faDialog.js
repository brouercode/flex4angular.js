/**
     The Dialog control is a pop-up dialog box that can contain a message and action buttons

     EX:
     $faDialog.confirm('Do you want remove this line?', 'Confirm Remove', function(action) {
          if (action == $faDialog.btYES.action)
               console.log("line removed"); 
     });		
**/

angular.module('flex4angular.dialog', ['ui.bootstrap'])

    .factory('$faDialog', ['$modal', '$sce', '$window', '$timeout', 'faDialogConfig',
        function($modal, $sce, $window, $timeout, faDialogConfig) {

            var btOK = {
                label: faDialogConfig.okText,
                action: 'OK'
            };

            var btYES = {
                label: faDialogConfig.yesText,
                action: 'YES'
            };

            var btNO = {
                label: faDialogConfig.noText,
                action: 'NO'
            };

            var btCANCEL = {
                label: faDialogConfig.cancelText,
                action: 'CANCEL'
            };

            var alert = function(message, messageTitle, handler) {
                if (!messageTitle)
                    messageTitle = faDialogConfig.titleAlertText;
                showAlert(message, messageTitle, [btOK], handler, btOK, "dialog-alert");
            };

            var error = function(message, messageTitle, handler) {
                if (!messageTitle)
                    messageTitle = faDialogConfig.titleErrorText;
                showAlert(message, messageTitle, [btOK], handler, btOK, "dialog-error");
            };

            var information = function(message, messageTitle, handler) {
                if (!messageTitle)
                    messageTitle = faDialogConfig.titleInformationText;
                showAlert(message, messageTitle, [btOK], handler, btOK, "dialog-information");
            };

            var success = function(message, messageTitle, handler) {
                if (!messageTitle)
                    messageTitle = faDialogConfig.titleSuccessText;
                showAlert(message, messageTitle, [btOK], handler, btOK, "dialog-success");
            };

            var confirm = function(message, messageTitle, handler, defaultButton) {
                if (!messageTitle)
                    messageTitle = faDialogConfig.titleConfirmText;
                if (!defaultButton)
                    defaultButton = btYES;
                showAlert(message, messageTitle, [btYES, btNO], handler, defaultButton, "dialog-confirm");
            };

            var customized = function(message, messageTitle, buttons, handler, defaultButton, windowClass) {
                showAlert(message, messageTitle, buttons, handler, defaultButton, windowClass);
            };

            var showAlert = function(message, messageTitle, buttons, handler, defaultButton, windowClass) {

                var modalInstance = $modal.open({
                    templateUrl: 'template/flex4angular/dialog.html',
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

            var controllerAlert = ["$scope", "$modalInstance", "options" , function($scope, $modalInstance, options) {
                $scope.options = options;
                $scope.defaultButton = options.defaultButton;
                $scope.windowClass = options.windowClass;

                $scope.action = function(button) {
                    angular.element($window).unbind('keydown keypress', $scope.keyFunction);
                    $modalInstance.close();
                    if ($scope.options.handler) {
                        //delay to execute handler when the modal is closed
                        $timeout(function() {
                            $scope.options.handler(button.action);
                        }, 300);
                    }
                };

                //function to show html message in the body 
                $scope.toHTML = function(text) {
                    return $sce.trustAsHtml(text);
                };

                //key controls
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
            }];

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
    ])

    .run(["$templateCache",
        function($templateCache) {
            $templateCache.put("template/flex4angular/dialog.html",
                "<div class=\"{{windowClass}}\">" +
                "	<div class=\"modal-header\">" +
                "		<h4 class=\"modal-title\">{{options.messageTitle}}</h4>" +
                "	</div>" +
                "	<div class=\"modal-body\" ng-bind-html=\"toHTML(options.message)\"></div>" +
                "	<div class=\"modal-footer\" id=\"footerModal\">" +
                "		<span ng-repeat=\"button in options.buttons\" ng-click=\"action(button)\" class=\"btn btn-default\" " +
                "			ng-class=\"{active : button == defaultButton}\" >{{button.label}}</span>" +
                "	</div>" +
                "</div>");
        }
    ])

    .constant('faDialogConfig', {
        okText: 'OK',
        yesText: 'Yes',
        noText: 'No',
        cancelText: 'Cancel',
        titleAlertText: 'Alert',
        titleErrorText: 'Error',
        titleInformationText: 'Information',
        titleSuccessText: 'Success',
        titleConfirmText: 'Confirmation'
    });