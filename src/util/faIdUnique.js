/**
 * gera um id único para o componente
 */
angular.module('flex4angular.util.idunique', []).
directive('faIdUnique',

	function() {
		return {
			priority: -1,
			restrict: 'A',
			controller: function($scope, $element, $attrs, $transclude) {
				var uniq = 'id' + (new Date()).getTime();
				var id = $element.attr('id');
				if (id === null || angular.isUndefined(id))
					$element.attr('id', uniq);
			}
		};
	}
);