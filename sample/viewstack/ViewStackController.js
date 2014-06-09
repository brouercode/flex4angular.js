angular.module("faSample").controller('ViewStackController', ['$scope',
    function($scope) {
        $scope.selectedIndex = 0;
        $scope.selectVS = function(index) {
            $scope.selectedIndex = index;
        };
    }
]);