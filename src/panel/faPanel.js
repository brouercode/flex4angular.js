angular.module('flex4angular.panel', []).directive('faPanel', [
    function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                title: '@title'
            },
            replace: true,
            template: '<div class="panel panel-default">' + '<div class="panel-heading">' + '<h3 class="panel-title">{{title}}</h3>' + '</div>' + '<div class="panel-body" ng-transclude>' + '</div>' + '</div>'
        };
    }
]);