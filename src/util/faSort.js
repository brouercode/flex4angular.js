angular.module('flex4angular.util.sort', []).filter("faSort", ['$faUtil',
    function($faUtil) {
        return function(array, property, reverseOrder) {
            if(!angular.isArray(array)) return array;
            if(!property || !angular.isString(property)) return array;
            var arrayCopy = [];
            for(var i = 0; i < array.length; i++) {
                arrayCopy.push(array[i]);
            }
            return arrayCopy.sort(comparator(compareValues, reverseOrder));

            function comparator(comp, descending) {
                return $faUtil.toBoolean(descending) ? function(a, b) {
                    return comp(b, a);
                } : comp;
            }

            function compareValues(a, b) {
                return $faUtil.compareValues(a, b, property);
            }
        };
    }
]);