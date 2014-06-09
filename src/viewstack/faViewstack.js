angular.module('flex4angular.viewstack', [])

.directive(
	'faViewstack', [

		function() {
			var panes = [],
				select = function(index) {
					var i = 0;
					if (angular.isUndefined(index)) {
						index = 0;
					}
					angular.forEach(panes, function(pane) {
						if (index === i) {
							pane.classList.add('active');
						} else {
							pane.classList.remove("active");
						}

						i++;
					});
				};
			return {
				restrict: 'E',
				transclude: true,
				scope: {},
				replace: true,
				link: function($scope, tElement, tAtrrs) {
					angular.forEach(tElement[0].children, function(pane) {
						pane.classList.add('tab-pane');
						panes.push(pane);
					});

					if (tAtrrs.selectedIndex !== null) {
						$scope.$parent.$watch(tAtrrs.selectedIndex, function(index) {
							select(index);
						});
					}
				},
				template: '<div class="tab-content" ng-transclude></div>',
			};
		}
	]);