angular.module('cyborgs-ts')

.controller('LoginController', ['AuthFactory', '$location', '$ionicLoading', '$window', 'AuthToken', function(AuthFactory, $location, $ionicLoading, $window, AuthToken){
  console.log('loging controller');
  let self = this;

  self.loginCredentials = {};

  self.authenticateUser = ()=>{
    console.log('authenticate method called');
    $ionicLoading.show({
      template: '<ion-spinner icon="lines"></ion-spinner><br>Logging in ...'
    });

    AuthFactory.authenticateUser(self.loginCredentials).then((response)=>{
      $ionicLoading.hide();
      //TODO: set session and navigate user to the user view
      console.log(response);
      if(response.data.success){
        $window.sessionStorage.setItem('token', response.data.token);
        let json = AuthToken.parseToken(response.data.token);
        $window.sessionStorage.setItem('name', json.name);
        $window.sessionStorage.setItem('permission', json.permission);
        $location.path('/home');
      }else{
        //TODO: show error message
      }
    })

  };


}])

.controller('HomeController',function($window){
  let self = this;

  self.name = $window.sessionStorage.getItem('name');
  self.permission = $window.sessionStorage.getItem('permission');


})

.controller('QRGeneratorController', function($scope){
  console.log('qr code controller');

  $scope.qrcodeString = "123";
})
