var servicesModule = angular.module('services',[]);

servicesModule.service('Camere',['$http', function($http) {

    this.get_all = function() {
        return $http.get('/api/camera');
    }
}]);

servicesModule.service('WashingMachine',['$http', function($http) {

    this.get_one = function(id) {
        return $http.get('/api/masina_spalat/' + id);
    }
    this.put = function(id, body) {
        return $http.put('/api/masina_spalat/' + id, body);
    }
}]);

servicesModule.service('Refrigerator',['$http', function($http) {

    this.get_one = function(id) {
        return $http.get('/api/frigider/' + id);
    }
    this.put = function(id, body) {
        return $http.put('/api/frigider/' + id, body);
    }
}]);

servicesModule.service('Lights',['$http', function($http) {

    this.get_one = function(id) {
        return $http.get('/api/sistem_de_iluminat/' + id);
    }
    this.put = function(id, body) {
        return $http.put('/api/sistem_de_iluminat/' + id, body);
    }
}]);

servicesModule.service('TV',['$http', function($http) {

    this.get_one = function(id) {
        return $http.get('/api/televizor/' + id);
    }
    this.put = function(id, body) {
        return $http.put('/api/televizor/' + id, body);
    }
    this.get_channels = function() {
        return $http.get('/api/canal');
    }

    this.get_channel = function(id) {
        return $http.get('/api/canal/'+id);
    }
}]);

servicesModule.service('Admin',['$http', function($http) {

    this.get_useri = function() {
        return $http.get('/api/user');
    }
    this.get_camere = function() {
        return $http.get('/api/camera');
    }
    
}]);

servicesModule.service('CoffeeMaker',['$http', function($http) {

    this.get_one = function(id) {
        return $http.get('/api/cafetiera/' + id);
    }
    this.put = function(id, body) {
        return $http.put('/api/cafetiera/' + id, body);
    }
}]);

servicesModule.service('Thermostat',['$http', function($http) {

    this.get_one = function(id) {
        return $http.get('/api/termostat/' + id);
    }
    this.put = function(id, body) {
        return $http.put('/api/termostat/' + id, body);
    }
}]);

servicesModule.service('UserInfo',['$http', function($http) {

    this.getIdUser = function() {
        return $http.get('/user_id');
    }
}]);

servicesModule.service('ActivitateCafetiera',['$http', function($http) {

    this.getInfo = function(id) {
        return $http.get('/api/activitate_cafetiera/'+id+"?ora=true");
    }
}]);

servicesModule.service('ActivitateTV',['$http', function($http) {

    this.getInfo = function(id) {
        return $http.get('/api/activitate_tv/'+id+"?ora=true");
    }
}]);

servicesModule.service('ActivitateSI',['$http', function($http) {

    this.getInfo = function(id) {
        return $http.get('/api/activitate_si/'+id+"?ora=true");
    }
}]);