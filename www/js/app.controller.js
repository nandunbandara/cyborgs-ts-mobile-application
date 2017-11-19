angular.module('cyborgs-ts')

.controller('LoginController', function(AuthFactory){
  console.log('loging controller');
  let self = this;

  self.athenticateUser = ()=>{
    let loginCredentials = {
      userId: self.username,
      password: self.password
    };

    AuthFactory.authenticateUser(loginCredentials).then((response)=>{
      //TODO: set session and navigate user to the user view
    })

  }
})

.controller('QRGeneratorController', function($scope){
  console.log('qr code controller');

  $scope.qrcodeString = "123";
})
