var myApp = angular.module('myApp', []);

myApp.controller('MailController', ['MailService', function(MailService){
    var mailer = this;

    mailer.submitForm = function(info){
        MailService.sendEmail(info);
    };
}]);

myApp.factory('MailService', ['$http', function($http){
  return {
    sendEmail: function(info){
      $http.post('/mail', info).then(function(response){
        console.log(response.data);
      });
    }
  };
}]);
