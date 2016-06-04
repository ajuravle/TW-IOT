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
            case 'frigider': $window.location.href = "http://" + $window.location.host + "/refrigerator/" + id; break;
        }
    }
}]);

app.controller('pag', ['$scope', function($scope) {

    $scope.list = [{name:"1", value:"1"}, {name:"2", value:"2"}, {name:"3", value:"3"}, {name:"4", value:"4"}];
}]);


app.controller('washing-machine',['$scope', '$location', '$interval', 'WashingMachine', function($scope, $location, $interval, WashingMachine) {
    var id = $location.absUrl().split('/')[4];
    /*var getDiferences = function(result) {
        console.log($scope.data,result)
        if($scope.data.length == 0) {
            $scope.data =  result;
        }
        if($scope.data['nr_rotatii'] != result['nr_rotatii']){
            $scope.data['nr_rotatii'] = result['nr_rotatii'];
        }

        if($scope.data['temperatura'] != result['temperatura']){
            $scope.data['temperatura'] = result['temperatura'];
        }
        if($scope.data['program'] != result['program']){
            $scope.data['program'] = result['program'];
        }
    }*/
    $scope.data = {}
    $scope.stare = true;
    $scope.list = [{name:'normal', value:'normal'},{name:'matase', value:'matase'}];
    var getData = function () {
        WashingMachine.get_one(id)
        .success(function(result) {
            $scope.data = result;
            if(result['stare'] == 0)
                $scope.stare = false;
            else
                $scope.stare = true;
            console.log(result['stare']);
        })
        .error(function(error) {
            console.log(error);
        });
    }
    getData();
    $interval(getData,5000);

    $scope.change = function() {
        return {tip:"masina_spalat", id:id};
    }
    //console.log()
}]);

app.controller('refrigerator',['$scope', '$location', '$interval', 'Refrigerator', function($scope, $location, $interval, Refrigerator) {
    var id = $location.absUrl().split('/')[4];
    $scope.data = {}
    $scope.stare = true;
    var getData = function() {
        console.log("da");    
        Refrigerator.get_one(id)
        .success(function(result) {
            $scope.data = result;
            if(result['stare'] == 0)
                $scope.stare = false;
            else
                $scope.stare = true;
            console.log($scope.data);
        })
        .error(function(error) {
            console.log(error);
        })
    };
    getData()
    $interval(getData,5000);

    $scope.changeRefrigerator = function() {
        return {tip:"frigider", id:id, field:'refrigerator'};
    }
    $scope.changeFreezer = function() {
        return {tip:"frigider", id:id, field:'con'};
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



