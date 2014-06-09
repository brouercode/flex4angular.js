angular.module("faSample").controller('TreeController', ['$scope',
    function($scope) {
        $scope.dataProvider = [
            {name: "Node 1", children: [
                {name: "Node 1.1", children:[
                    {name: "Node 1.1.1"},
                    {name: "Node 1.1.2"}    
                ]},
                {name: "Node 1.2", children:[
                    {name: "Node 1.2.1"},
                    {name: "Node 1.2.2"}    
                ]}
            ]},
            {name: "Node 2"},
            {name: "Node 3"},
            {name: "Node 4"}
        ];
    }
]);