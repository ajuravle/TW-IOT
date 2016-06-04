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