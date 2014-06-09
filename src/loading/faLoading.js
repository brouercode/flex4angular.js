/**
 * Módulo de bloqueio do sistema com tela de loading
 */
angular.module('flex4angular.loading', [])

/**
 * Factory para auxiliar o show é o hide da camada de bloqueio da tela
 */
.factory('$faLoading', ['$rootScope',
	function($rootScope) {
		$rootScope.loading = 0;
		return {
			start: function() {
				$rootScope.loading += 1;
			},
			stop: function() {
				$rootScope.loading -= 1;
			}
		};
	}
])

/**
 * Diretiva que coloca uma camada de bloqueio na tela
 * Obs. O show e hide deve ser inserido manualmente
 * EX:
 *		<fa-loading><!-- Desenhar a sua tela --></fa-loading>
 *
 */
.directive('faLoadingView', ['$rootScope', '$window',
	function($rootScope, $window) {
		return {
			scope: {},
			restrict: 'E',
			transclude: true,
			template: '<div class="loading" ng-transclude ng-show="loading"></div>',
			link: function($scope) {
				$scope.preventFunc = function(e) {
					e.preventDefault();
				};
				$rootScope.$watch('loading', function(newValue, oldValue, scope) {
					$scope.loading = newValue > 0;
					if (!oldValue && newValue > 0) {
						angular.element($window).bind('keydown keypress', $scope.preventFunc);
					}
					if (oldValue > 0 && !newValue) {
						angular.element($window).unbind('keydown keypress', $scope.preventFunc);
					}
				});
			}
		};
	}
]);