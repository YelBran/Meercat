angular.module('services', []).service('city', [
  '$location', function($location) {
    return {
      'getCode': function() {
        var cities, city, host;
        host = $location.$$host;
        city = host.substring(0, 2).toUpperCase();
        cities = ['CD', 'SZ'];
        if (cities.indexOf(city) < 0) {
          return 'CD';
        } else {
          return city;
        }
      }
    };
  }
]).service('userContext', [
  '$q', '$location', 'signSvc', function($q, $location, signSvc) {
    return {
      tokenExpired: function() {
        var deferred;
        deferred = $q.defer();
        signSvc.expired().then(function() {
          return deferred.resolve();
        }, function() {
          deferred.reject();
          return window.location = '/sign?action=in&r=' + $location.$$url;
        });
        return deferred.promise;
      }
    };
  }
]).service('apiService', [
  '$location', 'city', function($location, city) {
    return {
      uploadImgUrl: 'http://' + $location.$$host + ':8888/api/',
      url: 'http://' + $location.$$host + ':8001/api/',
      imgUrl: 'http://' + $location.$$host + ':8888/images/' + city.getCode() + '/',
      thumbUrl: 'http://' + $location.$$host + ':8888/thumbs/' + city.getCode() + '/',
      pdfUrl: 'http://' + $location.$$host + ':8001/Pdf/'
    };
  }
]).service('uploader', [
  'FileUploader', '$rootScope', 'apiService', function(FileUploader, $rootScope, apiService) {
    return {
      create: function(imageType) {
        return new FileUploader({
          url: apiService.uploadImgUrl + 'image/' + imageType,
          autoUpload: true,
          filters: [
            {
              name: 'fileSize',
              fn: function(item) {
                if (item.size > 1024 * 512 * 10) {
                  $rootScope.$broadcast("alert", {
                    text: "文件大小不能超过5MB！",
                    type: "danger"
                  });
                  return false;
                }
                if (item.type.indexOf("jpeg") < 0 && item.type.indexOf("jpg") < 0 && item.type.indexOf("jpeg") < 0 && item.type.indexOf("png") < 0 && item.type.indexOf("bmp") < 0 && item.type.indexOf("gif") < 0) {
                  $rootScope.$broadcast("alert", {
                    text: "文件格式不正确，只能上传：jpeg、jpg、png、bmp、gif文件！",
                    type: "danger"
                  });
                  return false;
                }
                return true;
              }
            }
          ]
        });
      }
    };
  }
]);

//# sourceMappingURL=services.js.map
