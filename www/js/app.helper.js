'use strict';

angular.module('cyborgs-ts')

  .constant('AUTH_SERVICE', "https://cyborgs-ts-auth-service.herokuapp.com/")


  .factory('AuthFactory', function($http, AUTH_SERVICE){
  let auth = {};

  auth.authenticateUser = (loginCredentials)=>{
    return $http.post(AUTH_SERVICE+"users/authenticate", loginCredentials)
    .then((response)=>{
        return response;
    })
  };

  return auth;
})

.service('AuthToken', function($window){
  this.parseToken = (token)=>{
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace('-','+').replace('_','/');
    return JSON.parse($window.atob(base64));
  }
});
