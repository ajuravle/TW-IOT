var directiveModule = angular.module('directives',['services']);

directiveModule.config(['$interpolateProvider', function($interpolateProvider){
    $interpolateProvider.startSymbol('<%');
    $interpolateProvider.endSymbol('%>');
}]);


directiveModule.directive('temperature', function() {
    var controller = function($scope, $timeout, WashingMachine) {
        $scope.clicked = false;
        console.log("temp",$scope);
        $scope.editTemperature = function() {
            $scope.clicked = true;

            aux = $scope.edit();
            switch (aux["tip"]) {
                case 'masina_spalat': 
                    WashingMachine.put(aux["id"],{temperatura:parseInt($scope.value, 10)})
                    .success(function() {
                        $scope.success = true;
                        $scope.feedback = "Success";
                    })
                    .error(function(){
                        $scope.success = false;
                        $scope.feedback = "Api error";
                    }); break;
            }

            $timeout(function() {
                $scope.clicked = false;

            },1000);
        };

        $scope.editState = function() {
            $scope.clicked = true;
            $scope.state = !$scope.state;
            $scope.success = $scope.state;
            aux = $scope.edit();
            switch (aux["tip"]) {
                case 'masina_spalat':

                    WashingMachine.put(aux["id"],{stare:$scope.state? 1 : 0})
                    .success(function() {
                        $scope.success = true;
                        $scope.feedback = "Success";
                    })
                    .error(function(){
                        $scope.success = false;
                        $scope.feedback = "Api error";
                    }); break;
            }

            $timeout(function() {
                $scope.clicked = false;
            },1000);
        };
    };

    return {
        restrict: 'E',
        scope: {
            value: '@',
            state: '=',
            id: '@',
            title: '@',
            rangeText: '@',
            min: '@',
            max: '@',
            edit: '&'
        },
        templateUrl: '/static/directivesTemplates/temperature.html',
        controller: controller
    };
});


directiveModule.directive('rotations', function() {
    var controller = function($scope, $timeout, WashingMachine) {
       // console.log($scope);
         $scope.clicked = false;
        $scope.editRotations = function() {
            $scope.clicked = true;
            aux = $scope.edit();
            switch (aux["tip"]) {
                case 'masina_spalat': 
                    WashingMachine.put(aux["id"],{nr_rotatii:parseInt($scope.value, 10)})
                    .success(function() {
                        $scope.success = true;
                        $scope.feedback = "Success";
                    })
                    .error(function(){
                        $scope.success = false;
                        $scope.feedback = "Api error";

                    }); break;
            }
            $timeout(function() {
                $scope.clicked = false;

            },1000);
        };
    };

    return {
        restrict: 'E',
        scope: {
            value: '@',
            state: '=',
            id: '@',
            title: '@',
            rangeText: '@',
            edit: '&'
        },
        templateUrl: '/static/directivesTemplates/rotations.html',
        controller: controller
    };
});

directiveModule.directive('itemCard', function() {
    var controller = function($scope, $timeout, WashingMachine) {
        
        $scope.clicked = false;
        $scope.editProgram = function() {
            $scope.clicked = true;
            aux = $scope.edit();
            switch (aux["tip"]) {
                case 'masina_spalat': 
                    WashingMachine.put(aux["id"],{program:$scope.item})
                    .success(function() {
                        $scope.success = true;
                        $scope.feedback = "Success";
                    })
                    .error(function(){
                        $scope.success = false;
                        $scope.feedback = "Api error";

                    }); break;
            }

            $timeout(function() {
                $scope.clicked = false;

            },1000);
        };
    };

    return {
        restrict: 'E',
        scope: {
            state: '=',
            list: '=',
            title: '=',
            id: '@',
            details: '@',
            icon: '@',
            item: '=',
            edit: '&'
        },
        templateUrl: '/static/directivesTemplates/itemcarddropdown.html',
        controller: controller
    };
});

directiveModule.directive('itemCard2', function() {
    var controller = function($scope, $timeout) {
        
        console.log("itemcard2",$scope, $scope.item);
        $scope.clicked = false;
        $scope.editProgram = function() {
            $scope.clicked = true;
            $scope.success = false;
            $scope.feedback = "Success";

            $timeout(function() {
                $scope.clicked = false;

            },1000);
        };
    };

    return {
        restrict: 'E',
        scope: {
            state: '=',
            list: '=',
            title: '=',
            id: '@',
            icon: '@',
            item: '=',
            edit: '&'
        },
        templateUrl: '/static/directivesTemplates/addDeviceDropDown.html',
        controller: controller
    };
});

directiveModule.directive('itemCard3', function() {
    var controller = function($scope, $timeout) {
        
        console.log("itemcard3",$scope, $scope.item);
        $scope.clicked = false;
        $scope.editProgram = function() {
            $scope.clicked = true;
            $scope.success = false;
            $scope.feedback = "Success";

            $timeout(function() {
                $scope.clicked = false;

            },1000);
        };
    };

    return {
        restrict: 'E',
        scope: {
            state: '=',
            list: '=',
            title: '=',
            id: '@',
            icon: '@',
            item: '=',
            edit: '&'
        },
        templateUrl: '/static/directivesTemplates/addDeviceDropDown.html',
        controller: controller
    };
});

directiveModule.directive('stringToNumber', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$parsers.push(function(value) {
        return '' + value;
      });
      ngModel.$formatters.push(function(value) {
        return parseInt(value, 10);
      });
    }
  };
});


directiveModule.directive('dropdown', function() {
  return {
    require: 'ngModel',
    scope: {
        list: '=',
        title: '='
    },
    controller: function($scope) {
        $scope.dropped = false;
        $scope.selectItem = function(index) {
            console.log(index);
            $scope.title = $scope.list[index].name;
            $scope.dropped = false;
        };

        $scope.drop = function() {
            console.log("dropped");
            $scope.dropped = !$scope.dropped;
        };
    },
    templateUrl: '/static/directivesTemplates/dropdown.html'
  };
});

directiveModule.directive('clock', function() {
    var controller = function($scope, $timeout) {
        $scope.clicked = false;
        $scope.editClock = function() {
            $scope.clicked = true;
            $scope.success = false;
            $scope.feedback = "Success";

            $timeout(function() {
                $scope.clicked = false;

            },1000);
        };
    };

    return {
        restrict: 'E',
        scope: {
            state: '=',
            list: '=',
            title: '@',
            id: '@',
            details: '@',
            icon: '@',
            edit: '&'
        },
        templateUrl: '/static/directivesTemplates/clock.html',
        controller: controller
    };
});


directiveModule.directive('textDetails', function() {
    var controller = function($scope, $timeout) {
    };
    return {
        restrict: 'E',
        scope: {
            value: '@',
            state: '@',
            id: '@',
            title: '@',
            rangeText: '@',
            edit: '&'
        },
        templateUrl: '/static/directivesTemplates/text.html',
    };
});



/* directive pentru tv*/

directiveModule.directive('volume', function() {
    var controller = function($scope, $timeout) {
        $scope.clicked = false;
        $scope.editVolume = function() {
            $scope.clicked = true;
            $scope.success = false;
            $scope.feedback = "Success";

            $timeout(function() {
                $scope.clicked = false;

            },1000);
        };

        $scope.editStateTV = function() {
            $scope.clicked = true;
            $scope.state = !$scope.state;
            $scope.feedback = "Set on";

            $timeout(function() {
                $scope.clicked = false;
            },1000);
        };
    };

    return {
        restrict: 'E',
        scope: {
            value: '@',
            state: '@',
            id: '@',
            title: '@',
            rangeText: '@',
            edit: '&'
        },
        templateUrl: '/static/directivesTemplates/volume.html',
        controller: controller
    };
});

directiveModule.directive('brightness', function() {
    var controller = function($scope, $timeout) {
       // console.log($scope);
         $scope.clicked = false;
        $scope.editBrightness = function() {
            $scope.clicked = true;
            $scope.success = false;
            $scope.feedback = "Success";

            $timeout(function() {
                $scope.clicked = false;

            },1000);
        };
    };

    return {
        restrict: 'E',
        scope: {
            value: '@',
            state: '@',
            id: '@',
            title: '@',
            rangeText: '@',
            edit: '&'
        },
        templateUrl: '/static/directivesTemplates/brightness.html',
        controller: controller
    };
});

directiveModule.directive('clockTv', function() {
    var controller = function($scope, $timeout) {
       // console.log($scope);
            $scope.clicked = false;
        $scope.editClockTV = function() {
            $scope.clicked = true;
            $scope.success = false;
            $scope.feedback = "Success";

            $timeout(function() {
                $scope.clicked = false;

            },1000);
        };
    };

    return {
        restrict: 'E',
        scope: {
            state: '=',
            list: '=',
            title: '@',
            id: '@',
            details: '@',
            icon: '@',
            edit: '&'
        },
        templateUrl: '/static/directivesTemplates/clockTV.html',
        controller: controller
    };
});


directiveModule.directive('textTvDetails', function() {
    var controller = function($scope, $timeout) {
    };
    return {
        restrict: 'E',
        scope: {
            value: '@',
            state: '@',
            id: '@',
            title: '@',
            rangeText: '@',
            edit: '&'
        },
        templateUrl: '/static/directivesTemplates/textTV.html',
    };
});

directiveModule.directive('channel', function() {
    var controller = function($scope, $timeout) {
        
        //console.log($scope);
        $scope.clicked = false;
        $scope.editChannel = function() {
            $scope.clicked = true;
            $scope.success = false;
            $scope.feedback = "Success";

            $timeout(function() {
                $scope.clicked = false;

            },1000);
        };
    };

    return {
        restrict: 'E',
        scope: {
            state: '=',
            list: '=',
            title: '@',
            id: '@',
            details: '@',
            icon: '@',
            edit: '&'
        },
        templateUrl: '/static/directivesTemplates/channels.html',
        controller: controller
    };
});


/* directive pentru tv*/

directiveModule.directive('nrBulbs', function() {
    var controller = function($scope, $timeout) {
        console.log("clume");
        $scope.clicked = false;
        $scope.editNrBulbs = function() {
            $scope.clicked = true;
            $scope.success = false;
            $scope.feedback = "Success";

            $timeout(function() {
                $scope.clicked = false;

            },1000);
        };

        $scope.editStateLights = function() {
            $scope.clicked = true;
            $scope.state = !$scope.state;
            $scope.feedback = "Set on";

            $timeout(function() {
                $scope.clicked = false;
            },1000);
        };
    };

    return {
        restrict: 'E',
        scope: {
            value: '@',
            state: '@',
            id: '@',
            title: '@',
            rangeText: '@',
            edit: '&'
        },
        templateUrl: '/static/directivesTemplates/bulbs.html',
        controller: controller
    };
});

directiveModule.directive('lightIntensity', function() {
    var controller = function($scope, $timeout) {
       // console.log($scope);
         $scope.clicked = false;
        $scope.editIntensity = function() {
            $scope.clicked = true;
            $scope.success = false;
            $scope.feedback = "Success";

            $timeout(function() {
                $scope.clicked = false;

            },1000);
        };
    };

    return {
        restrict: 'E',
        scope: {
            value: '@',
            state: '@',
            id: '@',
            title: '@',
            rangeText: '@',
            edit: '&'
        },
        templateUrl: '/static/directivesTemplates/lightIntensity.html',
        controller: controller
    };
});

directiveModule.directive('textLightsDetails', function() {
    var controller = function($scope, $timeout) {
        console.log($scope);
    };
    return {
        restrict: 'E',
        scope: {
            value: '@',
            state: '@',
            id: '@',
            title: '@',
            rangeText: '@',
            edit: '&'
        },
        templateUrl: '/static/directivesTemplates/textLights.html',
    };
});

/* directive pentru thermostat*/

directiveModule.directive('temp', function() {
    var controller = function($scope, $timeout) {
        console.log("clume");
        $scope.clicked = false;
        $scope.editThermostat = function() {
            $scope.clicked = true;
            $scope.success = false;
            $scope.feedback = "Success";

            $timeout(function() {
                $scope.clicked = false;

            },1000);
        };

        $scope.editStateTherm = function() {
            $scope.clicked = true;
            $scope.state = !$scope.state;
            $scope.feedback = "Set on";

            $timeout(function() {
                $scope.clicked = false;
            },1000);
        };
    };

    return {
        restrict: 'E',
        scope: {
            value: '@',
            state: '@',
            id: '@',
            title: '@',
            rangeText: '@',
            edit: '&'
        },
        templateUrl: '/static/directivesTemplates/tempTherm.html',
        controller: controller
    };
});

directiveModule.directive('automat', function() {
    var controller = function($scope, $timeout) {

       /* $scope.clicked = false;
        $scope.editThermostat = function() {
            $scope.clicked = true;
            $scope.success = false;
            $scope.feedback = "Success";

            $timeout(function() {
                $scope.clicked = false;

            },1000);
        };*/

        $scope.editStAutomat = function() {
            $scope.clicked = true;
            $scope.state = !$scope.state;
            $scope.feedback = "Set on";

            $timeout(function() {
                $scope.clicked = false;
            },1000);
        };
    };

    return {
        restrict: 'E',
        scope: {
            value: '@',
            state: '@',
            id: '@',
            title: '@',
            rangeText: '@',
            edit: '&'
        },
        templateUrl: '/static/directivesTemplates/automat.html',
        controller: controller
    };
});

directiveModule.directive('textThermDetails', function() {
    var controller = function($scope, $timeout) {
        console.log($scope);
    };
    return {
        restrict: 'E',
        scope: {
            value: '@',
            state: '@',
            id: '@',
            title: '@',
            rangeText: '@',
            edit: '&'
        },
        templateUrl: '/static/directivesTemplates/textTherm.html',
    };
});