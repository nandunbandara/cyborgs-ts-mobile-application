'use strict';

angular.module('cyborgs-ts')

  .constant('AUTH_SERVICE', "https://cyborgs-ts-auth-service.herokuapp.com/")
  .constant('TRIP_SERVICE', "https://cyborgs-ts-trip-service.herokuapp.com/")
  .constant('PAYMENT_SERVICE', "https://cyborgs-ts-payment-service.herokuapp.com/")


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

  .factory('TripFactory', function($http, TRIP_SERVICE){
    let trip = {};

    trip.getTripHistoryByUser = (userId)=>{
      return $http.get(TRIP_SERVICE+"trips/"+userId).then((response)=>{
        console.log(response);
        return response;
      })
    };

    return trip;
  })

  .factory('AccountFactory', function($http, PAYMENT_SERVICE){
    let acc = {};

    acc.getAccountBalance = (userId)=>{
      return $http.get(PAYMENT_SERVICE+"accounts/"+userId).then((response)=>{
        return response;
      })
    };

    return acc;
  })

.service('AuthToken', function($window){
  this.parseToken = (token)=>{
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace('-','+').replace('_','/');
    return JSON.parse($window.atob(base64));
  }
});
