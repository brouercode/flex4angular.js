angular.module('flex4angular.tree', []).run(function($templateCache) {
    $templateCache.put('tree/faTreeView.html', 
                       '<div ng-repeat="data in dataprovider">' + 
                           '{{data.name}} ' + 
                           '<ul>' + 
                               '<li ng-repeat="data in data.children" ng-include="\'tree/faTreeView.html\'"></li>' + 
                           '</ul>' +
                       '<div>'
                      );
}).
directive('faTree', [
    function() {
        return {
            restrict: 'E',
            scope: {dataprovider: "@dataprovider"},
            replace: true,
            templateURL: 'tree/faTreeView.html',
        };
    }
]);