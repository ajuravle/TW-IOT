var directiveModule = angular.module('directives',[]);

directiveModule.config(['$interpolateProvider', function($interpolateProvider){
    $interpolateProvider.startSymbol('<%');
    $interpolateProvider.endSymbol('%>');
}]);


directiveModule.directive('temperature', function() {
    var controller = function($scope, $timeout) {
        $scope.clicked = false;
        $scope.editTemperature = function() {
            $scope.clicked = true;
            $scope.success = false;
            $scope.feedback = "Success";

            $timeout(function() {
                $scope.clicked = false;

            },1000);
        };

        $scope.editState = function() {
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
        templateUrl: '/static/directivesTemplates/temperature.html',
        controller: controller
    };
});

directiveModule.directive('rotations', function() {
    var controller = function($scope, $timeout) {
       // console.log($scope);
         $scope.clicked = false;
        $scope.editRotations = function() {
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
        templateUrl: '/static/directivesTemplates/rotations.html',
        controller: controller
    };
});

directiveModule.directive('itemCard', function() {
    var controller = function($scope, $timeout) {
        
        //console.log($scope);
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
            title: '@',
            id: '@',
            details: '@',
            icon: '@',
            edit: '&'
        },
        templateUrl: '/static/directivesTemplates/itemcarddropdown.html',
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
        title: '@'
    },
    controller: function($scope) {
        console.log("drop aici");
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
        templateUrl: '/static/directivesTemplates/clock.html',
    };
});


directiveModule.directive('textDetails', function() {
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
        templateUrl: '/static/directivesTemplates/text.html',
    };
});
