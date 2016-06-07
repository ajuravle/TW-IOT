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
    };
    this.delete_user = function(id) {
        return $http.delete('/api/user/' + id)
    };
    this.get_camere = function() {
        return $http.get('/api/camera');
    };
    this.delete_camera = function(id) {
        return $http.delete('/api/camera/' + id);
    };
    this.get_dispozitive = function() {
        return $http.get('/api/dispozitive');
    };
    this.delete_dispozitive = function(id, tip) {
        return $http.delete('/api/dispozitive/' + id + '/' + tip);
    };
    this.put = function(id, body) {
        return $http.put('/api/user/' + id, body);
    };
    this.put_camere = function(id, body) {
        return $http.put('/api/camera/' + id, body);
    };
    this.add_dispozitive = function(body) {
        return $http.post('/api/dispozitive', body);
    };
    this.add_camera = function(body) {
        return $http.post('/api/camera', body);
    };
    this.send_mail = function(body) {
        return $http.post('/send_mail_register', body);
    };
    this.get_info = function() {
        return $http.get('/api/info');
    }; 
    this.put_oras = function(body) {
        return $http.put('/api/info', body);
    };
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
    this.get_meteo = function(oras) {
        return $http.get('http://api.openweathermap.org/data/2.5/weather?q=' + oras + '&units=metric&APPID=ab86b21e315e69d1331608e7e80488e3');
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
    this.getChannel = function(id) {
        return $http.get('/api/canal/'+id);
    }
}]);

servicesModule.service('ActivitateSI',['$http', function($http) {

    this.getInfo = function(id) {
        return $http.get('/api/activitate_si/'+id+"?ora=true");
    }
}]);

servicesModule.service('Profile',['$http', function($http) {

    this.getInfo = function() {
        return $http.get('/user_id');
    }

    this.putInfo = function(body) {
        return $http.put('/api/user',body);
    }
}]);