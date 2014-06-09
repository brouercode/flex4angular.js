angular.module("faSample").controller('SortController', ['$scope', '$filter', '$faUtil',
    function($scope, $filter, $faUtil) {
        $scope.dataProvider = [{label:"Nome 1"},{label:"Nome 3"},{label:"Nome 2"}];
        $scope.order = function(asc){
             $scope.dataProvider = $filter('faSort')($scope.dataProvider, "label", !$faUtil.toBoolean(asc))
        };
    }
]);