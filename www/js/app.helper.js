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

    trip.initiateTrip = (tripData)=>{
      return $http.post(TRIP_SERVICE+"trips/add", tripData).then((response)=>{
        return response;
      })
    };


    trip.updateTrip = (id, tripData)=>{
      return $http.put(TRIP_SERVICE+"trips/update/".concat(id), tripData).then((response)=>{
        return response;
      })
    };


    trip.getDistance = (origin, destination)=>{
      return $http.get('https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins='+origin+'&destinations='+destination+'&key=AIzaSyCzI0Kq4trjbtTvE0pXDcezIq--dVVBLiI')
        .then((response)=>{
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


  .factory('LocationFactory', function(){

    let loc = {};

    loc.getPlace = (latitude, longitude)=>{
       let location = new google.maps.LatLng(latitude, longitude);

       let map = new google.maps.Map(document.createElement('div'));

       let service = new google.maps.places.PlacesService(map);

       let request = {
         location: location,
         radius: 200
       };

       return new Promise((resolve, reject)=>{
         service.nearbySearch(request, (results,status)=>{
           if(status == google.maps.places.PlacesServiceStatus.OK){
             resolve(results);
           }else{
             reject(results);
           }
         })
       })
    };

    return loc;
  })

.service('AuthToken', function($window){
  this.parseToken = (token)=>{
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace('-','+').replace('_','/');
    return JSON.parse($window.atob(base64));
  }
});
