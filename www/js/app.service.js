'use strict';

angular.module('cyborgs-ts')

.constant('AUTH_SERVICE', "https://cyborgs-ts-auth-service.herokuapp.com/")

.factory('AuthFactory', function($http, AUTH_SERVICE){
  let auth = {};

  auth.authenticateUser = (loginCredentials)=>{
    return $http.post(AUTH_SERVICE+"/authenticate", loginCredentials)
    .then((response)=>{
        return response;
    })
  };

  return auth;
})
