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