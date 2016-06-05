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

app.controller('left-menu', ['$scope', '$window', 'Camere','UserInfo', function($scope, $window, Camere, UserInfo) {

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
    .success(function(result) {console.log("result", result);
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

    UserInfo.getIdUser()
    .success(function(result) {
        $scope.nume = result['nume'];
        $scope.prenume = result['prenume'];
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
            case 'sistem_de_iluminat': $window.location.href = "http://" + $window.location.host + "/lights/" + id; break;
            case 'televizor': $window.location.href = "http://" + $window.location.host + "/tv/" + id; break;
            case 'cafetiera': $window.location.href = "http://" + $window.location.host + "/coffee_maker/" + id; break;
            case 'termostat': $window.location.href = "http://" + $window.location.host + "/thermostat/" + id; break;

        }
    }
}]);

app.controller('pag', ['$scope', function($scope) {

    $scope.list = [{name:"1", value:"1"}, {name:"2", value:"2"}, {name:"3", value:"3"}, {name:"4", value:"4"}];
}]);


app.controller('washing-machine',['$scope', '$location', '$interval', 'WashingMachine', function($scope, $location, $interval, WashingMachine) {
    var id = $location.absUrl().split('/')[4];

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

app.controller('lights',['$scope', '$location', '$interval', 'Lights', function($scope, $location, $interval, Lights) {
    var id = $location.absUrl().split('/')[4];
    $scope.data = {}
    $scope.stare = true;
    var getData = function() {
        console.log("da");    
        Lights.get_one(id)
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

    $scope.changeLights = function() {
        return {tip:"sistem_de_iluminat", id:id};
    }
    
    //console.log()
}])

app.controller('tv',['$scope', '$location', '$interval', 'TV', function($scope, $location, $interval, TV) {
    var id = $location.absUrl().split('/')[4];
    $scope.data = {}
    $scope.stare = true;
    $scope.list = [];
    $scope.chanel="";


    TV.get_channels(id)
        .success(function(result) {
            for (i=0;i<result.length;i++){
                var item={}
                item['name']=result[i]['denumire']
                item['value']=result[i]['id_canal']
                $scope.list.push(item);
            }
        })
        .error(function(error) {
            console.log(error);
        })

    var getData = function() {
        console.log("da");    
        TV.get_one(id)
        .success(function(result) {
            console.log(result);
            $scope.data = result;
            if(result['stare'] == 0)
                $scope.stare = false;
            else
                $scope.stare = true;
            TV.get_channel($scope.data["id_canal"])
                .success(function(result) {
                    $scope.channel = result["denumire"];
                })
                .error(function(error) {
                    console.log(error);
                })

        })
        .error(function(error) {
            console.log(error);
        })
    };
    getData()
    $interval(getData,5000);
    
    $scope.changeTV = function() {
        return {tip:"televizor", id:id};
    }
    
    //console.log()
}])

app.controller('coffee-maker',['$scope', '$location', '$interval', 'CoffeeMaker', function($scope, $location, $interval, CoffeeMaker) {
    var id = $location.absUrl().split('/')[4];
    $scope.data = {}
    $scope.stare = true;
    $scope.list = [{name:'normal', value:'normal'},{name:'cappuccino', value:'cappuccino'}];
    var getData = function() {
        console.log("da");    
        CoffeeMaker.get_one(id)
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

    $scope.changeCoffeeMaker = function() {
        return {tip:"cafetiera", id:id, field:'coffee_maker'};
    }
    
    //console.log()
}])

app.controller('thermostat',['$scope', '$location', '$interval', 'Thermostat', function($scope, $location, $interval, Thermostat) {
    var id = $location.absUrl().split('/')[4];
    $scope.data = {}
    $scope.stare = true;
    var getData = function() {   
        Thermostat.get_one(id)
        .success(function(result) {
            $scope.data = result;
            if(result['stare'] == 0)
                $scope.stare = false;
            else
                $scope.stare = true;

        })
        .error(function(error) {
            console.log(error);
        });

    };
    getData()
    $interval(getData,5000);

    $scope.changeThermostat = function() {
        return {tip:"termostat", id:id, field:'thermostat'};
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

app.controller('admin',['$scope', '$timeout', 'Admin', function($scope, $timeout, Admin) {
   $scope.list=[{name:'CoffeeMaker',value:'CoffeeMaker'},
                {name:'Refrigerator',value:'Refrigerator'},
                {name:'TV',value:'TV'},
                {name:'Lights',value:'Lights'},
                {name:'Thermostat',value:'Thermostat'},
                {name:'WashingMachine',value:'WashingMachine'},
                ];
    $scope.deviceName = "";
    $scope.noName = false;
    $scope.noDevice = false;
    $scope.ok = false;
    $scope.noRoom = false;
    $scope.okRoom = false;
    $scope.deviceType = "Device";
    $scope.addDevice = function() {
        $scope.noName = false;
        $scope.noDevice = false;
        if($scope.deviceName == ''){
            $scope.noName=true;
            $timeout(function(){
                $scope.noName = false;
            },1000);
            return;
        }
        if($scope.deviceType == 'Device') {
            $scope.noDevice = true;
            $timeout(function(){
                $scope.noDevice = false;
            },1000);
            return;
        }
        /*$timeout(function(){
            $scope.noName = false;
            $scope.noDevice = false;
            },1000);*/
        var tip = "";
        switch($scope.deviceType) {
            case "CoffeeMaker": tip = "cafetiera"; break;
            case "Refrigerator": tip = "frigider"; break;
            case "TV": tip = "televizor"; break;
            case "Lights": tip = "sistem_de_iluminat"; break;
            case "Thermostat": tip = "termostat"; break;
            case "WashingMachine": tip = "masina_de_spalat"; break;
        }

        Admin.add_dispozitive({denumire:$scope.deviceName, tip: tip})
        .success(function(){
            $scope.ok = true;
            $timeout(function(){
                $scope.ok = false;
            },1000);
        })
    }

    $scope.roomName = '';
    $scope.addRoom = function() {
        $scope.noRoom = false;
        $scope.okRoom = false;
        if($scope.roomName == '') {
            $scope.noRoom = true;
            $timeout(function(){
                $scope.noRoom = false;
            },1000);
            return;
        }
        Admin.add_camera({denumire:$scope.roomName})
        .success(function() {
            $scope.okRoom = true;
            $timeout(function(){
                $scope.okRoom = false;
            },1000);
        })
    }

    $scope.userName = '';
    $scope.addUser = function() {
        $scope.noUsername= false;
        $scope.noMail = false;
        $scope.okUsername = false;console.log($scope.userName);
        if($scope.userName == '') {
            $scope.noUsername = true;
            $timeout(function(){
                 $scope.noUsername = false;
             },1000);
            return;
        }

        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test($scope.userName)) {
            $scope.noMail = true;
            $timeout(function(){
                 $scope.noMail = false;
             },1000);
            return;
        }
        Admin.send_mail({email:$scope.userName})
        .success(function() {
            $scope.okUsername = true;
            $timeout(function(){
                $scope.okUsername = false;
            },1000);
        })
    }
}])

app.controller('profile',['$scope', '$timeout', 'Profile', function($scope, $timeout, Profile) {
    $scope.lastName = '';
    $scope.firstName = '';
    $scope.email = '';

   Profile.getInfo()
        .success(function(rez) {
            $scope.lastName = rez['nume'];
            $scope.firstName = rez['prenume'];
            $scope.email = rez['email'];
            
        })

    $scope.changeLastName = function() {
        $scope.invalidLastName = false;
        $scope.ok = false;
        if($scope.lastName == '') {
            $scope.invalidLastName = true;
            $timeout(function(){
                $scope.invalidLastName = false;
            },1000);
            return;
        }
        Profile.putInfo({nume:$scope.lastName})
        .success(function(rez) {
            $scope.ok = true;
            $timeout(function(){
                $scope.ok = false;
            },1000);
        })
    }

    $scope.changeFirstName = function() {
        $scope.invalidFirstName = false;
        $scope.okName = false;
        if($scope.firstName == '') {
            $scope.invalidFirstName = true;
            $timeout(function(){
                $scope.invalidFirstName = false;
            },1000);
            return;
        }
        Profile.putInfo({prenume:$scope.firstName})
        .success(function(rez) {
            $scope.okName = true;
            $timeout(function(){
                $scope.okName = false;
            },1000);
        })
    }


    $scope.changeEmail = function() {
        $scope.invalidEmail = false;
        $scope.okEmail = false;
        if($scope.email == '') {
            $scope.invalidEmail = true;
            $timeout(function(){
                $scope.invalidEmail = false;
            },1000);
            return;
        }
        Profile.putInfo({mail:$scope.email})
        .success(function(rez) {
            $scope.okEmail = true;
            $timeout(function(){
                $scope.okEmail = false;
            },1000);
        })
    }

$scope.password = '';
    $scope.changePassword = function() {
        $scope.invalidPassword = false;
        $scope.okPassword = false;
        if($scope.password == '') {
            $scope.invalidPassword = true;
            $timeout(function(){
                $scope.invalidPassword = false;
            },1000);
            return;
        }
        Profile.putInfo({parola:$scope.password})
        .success(function(rez) {
            $scope.okPassword = true;
            $timeout(function(){
                $scope.okPassword = false;
            },1000);
        })
    }
}])

