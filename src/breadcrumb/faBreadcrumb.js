/**
 * Classe responsável por monitorar o router e montar o breadcrumb
 */
angular.module("flex4angular.breadcrumb", [])
	.factory('$faBreadcrumb', ['$location', '$rootScope', '$route',
		function($location, $rootScope, $route) {

			var breadcrumbs = [],
				routes = $route.routes;

			$rootScope.$on('$routeChangeSuccess', function(event, current) {
				breadcrumbs = [];

				var paths = $location.path().split('/'), 
					i;

				paths.shift();
				for (i = 0; i < paths.length; i++) {

					var path = '/' + (paths.slice(0, i + 1)).join('/');
					var route = routes[path];
					if (route && route.pageTitle) {
						breadcrumbs.push({
							label: route.pageTitle,
							path: path
						});

					}
				}
			});

			var list = function() {
				return breadcrumbs;
			};

			return {
				list: list
			};

		}
	]);