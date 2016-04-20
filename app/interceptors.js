angular.module('interceptors', []).factory('authInterceptor', [
  '$q', '$sessionStorage', 'apiService', '$location', 'city', function($q, $sessionStorage, apiService, $location, city) {
    return {
      request: function(config) {
        if (config.url.indexOf('http://' + $location.$$host + ':8001/api/') > -1) {
          config.headers['x-city'] = city.getCode();
          if ($sessionStorage.user) {
            config.headers['x-token'] = $sessionStorage.token;
          }
        }
        return config || $q.when(config);
      }
    };
  }
]).config([
  '$httpProvider', function($httpProvider) {
    return $httpProvider.interceptors.push('authInterceptor');
  }
]);

//# sourceMappingURL=interceptors.js.map
