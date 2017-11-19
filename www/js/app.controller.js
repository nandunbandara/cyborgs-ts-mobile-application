angular.module('starter')

.controller('LoginController', function(){
  console.log('loging controller');
})

.controller('QRGeneratorController', function($scope){
  console.log('qr code controller');

  $scope.qrcodeString = "123";
})
