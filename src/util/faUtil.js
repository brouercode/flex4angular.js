angular.module('flex4angular.util.util', []).factory('$faUtil', ['$locale',
    function($locale) {
        var padding = function(value) {
            return "00000000000000000000".slice(value.length);
        },
            // convert um valor para string
            toString = function(value) {
                if(value === null || value === undefined) return '';
                return '' + value;
            },
            // Calcula o default ordem do mÃªs para uma data (dd/MM/yyyy vs MM/dd/yyyy)
            natDateMonthFirst = $locale.DATETIME_FORMATS.shortDate.charAt(0) === "M",
            // fix a data para comparaÃ§Ã£o
            fixDates = function(value) {
                return toString(value).replace(/(\d\d?)[-\/\.](\d\d?)[-\/\.](\d{4})/, function($0, $m, $d, $y) {
                    var t = $d;
                    if(!natDateMonthFirst) {
                        if(Number($d) < 13) {
                            $d = $m;
                            $m = t;
                        }
                    } else if(Number($m) > 12) {
                        $d = $m;
                        $m = t;
                    }
                    return $y + "-" + $m + "-" + $d;
                });
            },
            // Fix o nÃºmero com padding para comparaÃ§Ã£o
            //adicionado um z na frente para ordernar igual ao oracle (nÃºmeros depois)
            fixNumbers = function(value) {
                return value.replace(/(\d+)((\.\d+)+)?/g, function($0, integer, decimal, $3) {
                    if(decimal !== $3) {
                        return $0.replace(/(\d+)/g, function($d) {
                            return 'Z' + padding($d) + $d;
                        });
                    } else {
                        decimal = decimal || ".0";
                        return 'Z' + padding(integer) + integer + decimal + padding(decimal);
                    }
                });
            },
            // Fix um valor em nÃºmero ou data
            fixValue = function(value) {
                return fixNumbers(fixDates(value));
            },
            // convert um valor para boolean
            toBoolean = function(value) {
                if(typeof value === 'function') {
                    value = true;
                } else {
                    value = '' + value;
                    if(value && value.length !== 0) {
                        var v = angular.lowercase(value);
                        value = !(v == 'f' || v == '0' || v == 'false' || v == 'no' || v == 'n' || v == '[]');
                    } else {
                        value = false;
                    }
                }
                return value;
            },
            compareValues = function(a, b, property) {
                var v1 = fixValue(a[property]);
                var v2 = fixValue(b[property]);
                var t1 = typeof v1;
                var t2 = typeof v2;
                if(t1 == t2) {
                    if(t1 == "string") {
                        v1 = v1.toLowerCase();
                        v2 = v2.toLowerCase();
                    }
                    if(v1 === v2) return 0;
                    return v1 < v2 ? -1 : 1;
                } else {
                    return t1 < t2 ? -1 : 1;
                }
            };
        return {
            compareValues: compareValues,
            fixValue: fixValue,
            fixNumbers: fixNumbers,
            fixDates: fixDates,
            toBoolean: toBoolean
        };
    }
]);