var directiveModule = angular.module('directives',['services']);

directiveModule.config(['$interpolateProvider', function($interpolateProvider){
    $interpolateProvider.startSymbol('<%');
    $interpolateProvider.endSymbol('%>');
}]);


directiveModule.directive('temperature', function() {
    var controller = function($scope, $timeout, WashingMachine, Refrigerator,CoffeeMaker) {
        $scope.clicked = false;
        $scope.editTemperature = function() {
            $scope.clicked = true;
            var result;
            aux = $scope.edit();
            switch (aux["tip"]) {
                case 'masina_spalat': 
                    result = WashingMachine.put(aux["id"],{temperatura:parseInt($scope.value, 10)})
                    break;

                case 'frigider': 
                    if(aux['field']=='refrigerator') {
                        result = Refrigerator.put(aux["id"],{temperatura_frigider:parseInt($scope.value, 10)})
                    } else {
                        result = Refrigerator.put(aux["id"],{temperatura_congelator:parseInt($scope.value, 10)})
                    }
                    break;
                case 'cafetiera': 
                    result = CoffeeMaker.put(aux["id"],{zahar:parseInt($scope.value, 10)})
                    break;
            };
            result.
            success(function() {
                $scope.success = true;
                $scope.feedback = "Success";
            })
            .error(function(){
                $scope.success = false;
                $scope.feedback = "Api error";
            });
            $timeout(function() {
                $scope.clicked = false;

            },1000);
        };

        $scope.editState = function() {
            $scope.clicked = true;
            $scope.state = !$scope.state;
            $scope.success = $scope.state;
            aux = $scope.edit();
            var result;
            switch (aux["tip"]) {
                case 'masina_spalat':
                    result = WashingMachine.put(aux["id"],{stare:$scope.state? 1 : 0})
                    break;
                case 'frigider':
                    result = Refrigerator.put(aux["id"],{stare:$scope.state? 1 : 0})
                    break;
                case 'cafetiera':
                    result = CoffeeMaker.put(aux["id"],{stare:$scope.state? 1 : 0})
                    break;
            }
            result .success(function() {
                        $scope.success = true;
                        $scope.feedback = "Success";
                    })
                    .error(function(){
                        $scope.success = false;
                        $scope.feedback = "Api error";
                    });

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
            changeState: '@',
            edit: '&'
        },
        templateUrl: '/static/directivesTemplates/temperature.html',
        controller: controller
    };
});


directiveModule.directive('rotations', function() {
    var controller = function($scope, $timeout, WashingMachine) {
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
    var controller = function($scope, $timeout, WashingMachine,CoffeeMaker) {
        
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
                case 'cafetiera':
                    CoffeeMaker.put(aux["id"],{tip:$scope.item})
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
            title: '@',
            id: '@',
            details: '@',
            icon: '@',
            item: '@',
            edit: '&'
        },
        templateUrl: '/static/directivesTemplates/itemcarddropdown.html',
        controller: controller
    };
});

directiveModule.directive('itemCard2', function() {
    var controller = function($scope, $timeout) {
        
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
            $scope.title = $scope.list[index].name;
            $scope.dropped = false;
        };

        $scope.drop = function() {
            $scope.dropped = !$scope.dropped;
        };
    },
    templateUrl: '/static/directivesTemplates/dropdown.html'
  };
});

directiveModule.directive('clock', function() {
    var controller = function($scope, $timeout, $interval, WashingMachine) {
        $scope.clicked = false;
        $scope.afisSetTime = true;
        $scope.afisFinal = false;
        console.log($scope);
        $scope.editClock = function() {
        $scope.clicked = true;  
        id_m=$scope.edit()
        console.log(id_m)
        $scope.minn = parseInt($scope.minn, 10);
        $scope.hour = parseInt($scope.hour, 10);
        WashingMachine.put(id_m['id'],{timp_ramas:$scope.minn+$scope.hour*60})
        .success(function(){
            $scope.success=true;
            $scope.afisSetTime = false;
            $scope.feedback="Success";
            
            var inter=$interval(function() { 
                if($scope.minn > 0) {
                    $scope.minn -=1;
                } else {
                    if($scope.minn <= 1) {
                        if($scope.hour == 0) {
                            console.log("a");
                            $interval.cancel(inter);
                            $scope.minn = " ";
                            $scope.hour = " ";
                            $scope.afisFinal = true;
                            $scope.afisSetTime = true;
                            $timeout(function() {
                                $scope.afisFinal = false;
                            },2000);
                            
                        } else {

                            $scope.hour -= 1;
                            $scope.minn = 59;
                        }
                    }
                }

            },1000);
        })
            .error(function(){
                $scope.success=false;
                $scope.feedback="Api error";
                $scope.afisSetTime = true;
            })

        
    

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
            rangeText: '@',
            titleFin: '@',
            hour: '@',
            minn: '@',
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
    var controller = function($scope, $timeout,TV) {
        $scope.clicked = false;
        $scope.editVolume = function() {
            $scope.clicked = true;
            $scope.success = false;

            details=$scope.edit();
            TV.put(details['id'],{volum:parseInt($scope.value,10)})
            .success(function(){
                $scope.success=true;
                $scope.feedback="Success";
            })
            .error(function(){
                $scope.success=false;
                $scope.feedback="Api error";
            })

            $timeout(function() {
                $scope.clicked = false;

            },1000);
        };

        $scope.editStateTV = function() {
            $scope.clicked = true;
            $scope.state = !$scope.state;

            details=$scope.edit();

            TV.put(details['id'],{stare:$scope.state?1:0})
            .success(function(res){
                $scope.success=true;
                $scope.feedback="Success";
            })
            .error(function(){
                $scope.success=false;
                $scope.feedback="Api error";
            })


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
        templateUrl: '/static/directivesTemplates/volume.html',
        controller: controller
    };
});

directiveModule.directive('brightness', function() {
    var controller = function($scope, $timeout,TV) {
         $scope.clicked = false;
        $scope.editBrightness = function() {
            $scope.clicked = true;
            $scope.success = false;

            details=$scope.edit();
            TV.put(details['id'],{luminozitate:parseInt($scope.value,10)})
            .success(function(){
                $scope.success=true;
                $scope.feedback="Success";
            })
            .error(function(){
                $scope.success=false;
                $scope.feedback="Api error";
            })

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
        templateUrl: '/static/directivesTemplates/brightness.html',
        controller: controller
    };
});

directiveModule.directive('clockTv', function() {
        var controller = function($scope, $timeout, $interval, TV) {
        $scope.clicked = false;
        $scope.afisSetTime = true;
      
        $scope.editClockTV = function() {
        $scope.clicked = true;  
        
        $scope.minn = parseInt($scope.minn, 10);
        $scope.hour = parseInt($scope.hour, 10);
        
            $scope.success=true;
            $scope.afisSetTime = false;
            $scope.feedback="Success";
            
            var inter = $interval(function() { 
                if($scope.minn > 0) {
                    $scope.minn -=1;
                } else {
                    if($scope.minn <= 1) {
                        if($scope.hour == 0) {
                            
                            $interval.cancel(inter);
                            console.log("mergeee");
                            $scope.state = false;
                            details=$scope.edit();

                            TV.put(details['id'],{stare:$scope.state?1:0})
                            .success(function(res){
                               $scope.afisSetTime = true;
                               $scope.minn = " ";
                               $scope.hour = " ";
                               $interval.cancel();
                            })
                            .error(function(){
                                $scope.success=false;
                                $scope.feedback="Api error";
                            });
                            
                        } else {

                            $scope.hour -= 1;
                            $scope.minn = 59;
                        }
                    }
                }

            },1000);

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
            rangeText: '@',
            titleFin: '@',
            hour: '@',
            minn: '@',
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
    var controller = function($scope, $timeout,ActivitateTV) {
        var id_q=$scope.edit();
        $scope.detaliiTV = {}
        ActivitateTV.getInfo(id_q['id'])
        .success(function(result) {
            $scope.detaliiTV = result;
            ActivitateTV.getChannel(result['id_canal'])
            .success(function(result1) {
                $scope.detaliiTV.numeCanal = result1['denumire'];
                
            })
        })
        .error(function(){
            $scope.feedback="error";
        })
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
        controller:controller
    };
});

directiveModule.directive('channel', function() {
    var controller = function($scope, $timeout,TV) {
        
    var get_id_canal=function(){
        for(i=0;i<$scope.list.length;i++){
            if ($scope.list[i]["name"]==$scope.item)
                return $scope.list[i]["value"];
        }
    }

        $scope.clicked = false;
        $scope.editChannel = function() {
            $scope.clicked = true;
            $scope.success = false;

             details=$scope.edit();
            TV.put(details['id'],{id_canal:get_id_canal()})
            .success(function(){
                $scope.success=true;
                $scope.feedback="Success";
            })
            .error(function(){
                $scope.success=false;
                $scope.feedback="Api error";
            })



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
            edit: '&',
            item: '@'
        },
        templateUrl: '/static/directivesTemplates/channels.html',
        controller: controller
    };
});


/* directive pentru tv*/

directiveModule.directive('nrBulbs', function() {
    var controller = function($scope, $timeout,Lights) {
        $scope.clicked = false;
        $scope.editNrBulbs = function() {
            $scope.clicked = true;
            $scope.success = false;
            details=$scope.edit();
            Lights.put(details['id'],{nr_becuri_aprinse:parseInt($scope.value,10)})
            .success(function(){
                $scope.success=true;
                $scope.feedback="Success";
            })
            .error(function(){
                $scope.success=false;
                $scope.feedback="Api error";
            })

            $timeout(function() {
                $scope.clicked = false;

            },1000);
        };

        $scope.editStateLights = function() {
            $scope.clicked = true;
            $scope.state = !$scope.state;
            
            details=$scope.edit();
            Lights.put(details['id'],{stare:$scope.state?1:0})
            .success(function(){
                $scope.success=true;
                if ($scope.state==true)
                    $scope.feedback = "Set on";
                else
                    $scope.feedback = "Set off";
            })
            .error(function(){
                $scope.success=false;
                $scope.feedback="Api error";
            })

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
        templateUrl: '/static/directivesTemplates/bulbs.html',
        controller: controller
    };
});

directiveModule.directive('lightIntensity', function() {
    var controller = function($scope, $timeout,Lights) {
         $scope.clicked = false;
        $scope.editIntensity = function() {
            $scope.clicked = true;
            $scope.success = false;
            details=$scope.edit();
            Lights.put(details['id'],{intensitate:parseInt($scope.value,10)})
            .success(function(){
                $scope.success=true;
                $scope.feedback="Success";
            })
            .error(function(){
                $scope.success=false;
                $scope.feedback="Api error";
            })

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
        templateUrl: '/static/directivesTemplates/lightIntensity.html',
        controller: controller
    };
});

directiveModule.directive('textLightsDetails', function() {
    var controller = function($scope, $timeout,ActivitateSI) {
        var id_q=$scope.edit();
        $scope.detaliiSI = {}
        ActivitateSI.getInfo(id_q['id'])
        .success(function(result) {
            $scope.detaliiSI = result;
        })
        .error(function(){
                $scope.feedback="error";
            })
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
        controller:controller
    };
});

/* directive pentru thermostat*/

directiveModule.directive('temp', function() {
    var controller = function($scope, $timeout,Thermostat) {
        $scope.clicked = false;
        $scope.editThermostat = function() {
            $scope.clicked = true;
            $scope.success = false;

            details=$scope.edit();
            Thermostat.put(details['id'],{temperatura:parseInt($scope.value,10)})
            .success(function(){
                $scope.success=true;
                $scope.feedback="Success";
            })
            .error(function(){
                $scope.success=false;
                $scope.feedback="Api error";
            })



            $timeout(function() {
                $scope.clicked = false;

            },1000);
        };

        $scope.editStateTherm = function() {
            $scope.clicked = true;
            $scope.state = !$scope.state;
            $scope.feedback = "Set on";

            details=$scope.edit();
            Thermostat.put(details['id'],{stare:$scope.state?1:0})
            .success(function(){
                $scope.success=true;
                $scope.feedback="Success";
            })
            .error(function(){
                $scope.success=false;
                $scope.feedback="Api error";
            })

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
    var controller = function($scope, $timeout, Thermostat) {
        $scope.meteo = {}
        Thermostat.get_meteo("Iasi")
        .success(function(result) {
            console.log("meteo", result);
            $scope.meteo = result;
        })
        .error(function(res){
            console.log("err", res);
        })
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
        controller: controller
    };
});

directiveModule.directive('adminTable', function() {
    var controller = function($scope, $timeout, Admin) {
        $scope.useri = []
        $scope.drepturi = [];
        $scope.camere = [];
        var done = 0;

         //initalizare drepturi
        var getPozitiiCamere = function(camere) {
            list_pozitii = []
            if(camere.length == 0) {
                return list_pozitii;
            }
            for( u = 0; u < camere.length; u++) {
                for( j = 0; j < $scope.camere.length; j++) {
                    if(camere[u]['id_camera'] == $scope.camere[j]['id_camera']) {
                        list_pozitii.push(j);
                    }
                }
            }
            return list_pozitii;
        }
        var initDrepturi = function(){
            for( i = 0; i < $scope.useri.length; i++) {
                var item = [];
                for( j = 0; j < $scope.camere.length; j++){
                    item[j] = false;
                }
                $scope.drepturi.push(item);
            }
            for( i = 0; i < $scope.useri.length; i++ ) {
                list_poz = getPozitiiCamere($scope.useri[i].camere);
                for( j = 0; j < list_poz.length;j++) {
                    $scope.drepturi[i][list_poz[j]] = true
                }
            }
        }

        Admin.get_useri()
        .success(function(result) {
            $scope.useri = [];
            for(i=0; i<result.length;i++){
                if(result[i]['tip'] == 'admin') {
                    continue;
                }
                delete result[i]['mail']
                delete result[i]['tip']
                $scope.useri.push(result[i]);
            }
            done++;
            if(done == 2) {
                initDrepturi();
            }
        });

        Admin.get_camere()
        .success(function(result) {
            for(i=0; i<result.length;i++){
                delete result[i]['dispozitive']
            }
            $scope.camere = result
            done++;
            if(done == 2) {
                initDrepturi();
            }
        });
        $scope.updated = []
        $scope.test = function(ind,p){
            item_update = {}
            item_update['id_user'] = $scope.useri[p]['id_user'];
            item_update['id_camera'] = $scope.camere[ind]['id_camera'];
            if($scope.drepturi[p][ind]) {
                item_update['actiune'] = 'adauga';
            } else {
                item_update['actiune'] = 'sterge';
            }
            for( i = 0; i < $scope.updated.length; i++) {
                if( ($scope.updated[i]['id_user'] == item_update['id_user']) && ($scope.updated[i]['id_camera'] == item_update['id_camera']) ) {
                    $scope.updated.splice(i,1);
                    i--;
                }
            }
            $scope.updated.push(item_update);
        }
        $scope.save = function() {
            for( i = 0; i < $scope.updated.length; i++) {
                ac = {}
                ac['actiune'] = $scope.updated[i]['actiune'];
                ac['id_camera'] = $scope.updated[i]['id_camera']
                Admin.put($scope.updated[i]['id_user'],ac)
                .success(function(res) {
                })
                .error(function(res) {
                    console.log(res);
                });
            }
            $scope.updated =[]
        }


    };
    return {
        restrict: 'E',
        templateUrl: '/static/directivesTemplates/adminTables.html',
        controller: controller
    };
});


directiveModule.directive('adminTableDispozitive', function() {
    var controller = function($scope, $timeout, Admin) {
        $scope.dis = []
        $scope.drepturi = [];
        $scope.camere = [];
        var done = 0;

         //initalizare drepturi
        var getPozitiiCamere = function(dispozitive_camera) {
            list_pozitii = []
            if(dispozitive_camera.length == 0) {
                return list_pozitii;
            }
            for(u = 0; u < dispozitive_camera.length; u++) {
                for( j = 0; j < $scope.dis.length; j++) {
                    if(dispozitive_camera[u]['id_dispozitiv'] == $scope.dis[j]['id_dispozitiv']) {
                        list_pozitii.push(j);
                    }
                }
            }

            return list_pozitii;
        }
        var initDrepturi = function(){
            for( i = 0; i < $scope.dis.length; i++) {
                var item = [];
                for( j = 0; j < $scope.camere.length; j++){
                    item[j] = false;
                }
                $scope.drepturi.push(item);
            }
            for( i = 0; i < $scope.camere.length; i++ ) {
                list_poz = getPozitiiCamere($scope.camere[i].dispozitive);
                for( j = 0; j < list_poz.length; j++) {
                    $scope.drepturi[list_poz[j]][i] = true;
                }
            }
        }

        Admin.get_dispozitive()
        .success(function(result) {
            for(i=0; i<result.length;i++){
                delete result[i]['stare']
            }
            $scope.dis = result
            done++;
            if(done == 2) {
                initDrepturi();
            }
        });

        Admin.get_camere()
        .success(function(result) {
            for(i=0; i<result.length;i++){
            }
            $scope.camere = result
            done++;
            if(done == 2) {
                initDrepturi();
            }
        });
        $scope.updated = []
        $scope.test = function(ind,p){
            item_update = {}
            item_update['id_dispozitiv'] = $scope.dis[p]['id_dispozitiv'];
            item_update['id_camera'] = $scope.camere[ind]['id_camera'];
            item_update['tip'] = $scope.dis[p]['tip']
            if($scope.drepturi[p][ind]) {
                item_update['actiune'] = 'adauga';
            } else {
                item_update['actiune'] = 'sterge';
            }
            for( i = 0; i < $scope.updated.length; i++) {
                if( ($scope.updated[i]['id_dispozitiv'] == item_update['id_dispozitiv']) && ($scope.updated[i]['id_camera'] == item_update['id_camera']) ) {
                    $scope.updated.splice(i,1);
                    i--;
                }
            }
            $scope.updated.push(item_update);
        }
        $scope.save = function() {
            for( i = 0; i < $scope.updated.length; i++) {
                ac = {}
                ac['actiune'] = $scope.updated[i]['actiune'];
                ac['id_dispozitiv'] = $scope.updated[i]['id_dispozitiv']
                ac['tip'] = $scope.updated[i]['tip'];
                Admin.put_camere($scope.updated[i]['id_camera'],ac)

            }
            $scope.updated = [];
        }

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
        templateUrl: '/static/directivesTemplates/adminTableDispozitive.html',
        controller: controller
    };
});

directiveModule.directive('textRefrigeratorDetails', function() {
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
        templateUrl: '/static/directivesTemplates/textRefrigerator.html',
    };
});

directiveModule.directive('textCoffeeDetails', function() {
    var controller = function($scope, $timeout,ActivitateCafetiera) {
        var id_q=$scope.edit();
        $scope.detaliiCafetiera = {}
        ActivitateCafetiera.getInfo(id_q['id'])
        .success(function(result) {
            $scope.detaliiCafetiera = result;
            $scope.detaliiCafetiera.ore="";
            for (i=0;i<result.ora_start.length;i++)
                $scope.detaliiCafetiera.ore=$scope.detaliiCafetiera.ore+result.ora_start[i]+", ";
            $scope.detaliiCafetiera.ore=$scope.detaliiCafetiera.ore.slice(0 ,-2);
        })
        .error(function(res){
            console.log("err", res);
        })
        
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
        templateUrl: '/static/directivesTemplates/textCoffee.html',
        controller:controller
    };
});