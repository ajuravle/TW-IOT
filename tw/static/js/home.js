var app = angular.module('home',['ngAnimate', 'directives', 'services'], function($locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
});

app.config(['$interpolateProvider', function($interpolateProvider){
    $interpolateProvider.startSymbol('<%');
    $interpolateProvider.endSymbol('%>');
}]);

app.controller('left-menu', ['$scope', '$window', 'Camere', function($scope, $window, Camere) {

    console.log("menuu");
    $scope.submenu = false;
    var getDispozitive = function(dispozitive) {
        var list = []
        for(var i=0;i < dispozitive.length; i++) {
            list.push(dispozitive[i]['denumire']);
        }
        return list;
    }
    $scope.menu_items = [];
    $scope.camere_dispozitive = [];
    Camere.get_all()
    .success(function(result) {
        for(var i=0; i < result.length;i++) {
            one_item = {}
            one_item['value'] = result[i]['denumire'];
            one_item['show'] = false
            one_item['submenu'] = getDispozitive(result[i]["dispozitive"]);
            $scope.menu_items.push(one_item);
        }
        $scope.camere_dispozitive = result;
    })
    .error(function(error) {
        console.log(error);
    });

    $scope.click = function(index) {
        $scope.menu_items[index]["show"] = !$scope.menu_items[index]["show"];
        for(i = 0; i < $scope.menu_items.length; i++) {
            if(i != index) {
                $scope.menu_items[i]["show"] = false;
            }
        }
    }

    $scope.clickSubMenu = function(indexParent,index) {
        var tip = $scope.camere_dispozitive[indexParent]['dispozitive'][index]['tip_dispozitiv'];
        var id = $scope.camere_dispozitive[indexParent]['dispozitive'][index]['id_dispozitiv'];
        switch (tip) {
            case 'masina_de_spalat': $window.location.href = "http://" + $window.location.host + "/washing_machine/" + id; break;

        }
    }
}]);

app.controller('pag', ['$scope', function($scope) {

    $scope.list = [{name:"1", value:"1"}, {name:"2", value:"2"}, {name:"3", value:"3"}, {name:"4", value:"4"}];
}]);


app.controller('washing-machine',['$scope', '$location', 'WashingMachine', function($scope, $location, WashingMachine) {
    var id = $location.absUrl().split('/')[4];
    $scope.data = {}
    $scope.list = [{name:'1', value:'1'},{name:'2', value:'2'}];
    WashingMachine.get_one(id)
    .success(function(result) {
        console.log(result);
        $scope.data = result;
    })
    .error(function(error) {
        console.log(error);
    });

    $scope.change = function() {
        return {tip:"masina_spalat", id:id};
    }
    //console.log()
}])

app.controller('add-device',['$scope', function($scope) {
   $scope.list=[{name:'Refrigerator',value:'device1'}, {name:'TV',value:'device1'}];
    //console.log()
}])

app.controller('add-device-room',['$scope', function($scope) {
   $scope.list=[{name:'Kitchen',value:'device1'}, {name:'Bedroom',value:'device1'}];
    //console.log()
}])



