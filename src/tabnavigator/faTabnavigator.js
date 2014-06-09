angular.module('flex4angular.tabnavigator', [])

.directive(
	'faTabnavigator', [

		function() {
			return {
				restrict: 'E',
				transclude: true,
				scope: {},
				replace: true,
				link: function($scope, tElement, tAtrrs) {
					$scope.panes = [];

					angular.forEach(tElement[0].children[1].children, function(pane) {
						pane.classList.add('tab-pane');
						$scope.panes.push(pane);
					});

					$scope.selectItem = function(p) {
						var i = 0;

						angular.forEach($scope.panes, function(pane) {
							if (p === pane) {
								pane.classList.add('active');
								pane.active = true;
							} else {
								pane.classList.remove("active");
								pane.active = false;
							}

							i++;
						});
					};

					if (tAtrrs.selectedIndex !== null) {
						$scope.$parent.$watch(tAtrrs.selectedIndex, function(index) {
							var i = index;
							if (angular.isUndefined(i)) {
								i = 0;
							}
							$scope.selectItem(tElement[0].children[1].children[i]);
						});
					}

				},
				template: 
                    '<div class="tabbable">' +
                        '<ul class="nav nav-tabs">' +
                            '<li ng-repeat="pane in panes" ng-class="{active:pane.active}">' +
                                '<a href="" ng-click="selectItem(pane)">{{pane.title}}</a>' +
                            '</li>' +
                        '</ul>' +
                        '<div class="tab-content" ng-transclude></div>' +
                    '</div>',
			};
		}
	]);