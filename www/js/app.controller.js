angular.module('cyborgs-ts')

.controller('LoginController', ['AuthFactory', function(AuthFactory){
  console.log('loging controller');
  let self = this;

  self.loginCredentials = {};

  self.authenticateUser = ()=>{
    console.log('authenticate method called');
    AuthFactory.authenticateUser(self.loginCredentials).then((response)=>{
      //TODO: set session and navigate user to the user view
      console.log(response);
    })

  };


}])

.controller('QRGeneratorController', function($scope){
  console.log('qr code controller');

  $scope.qrcodeString = "123";
})
