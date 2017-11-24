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
        $window.sessionStorage.setItem('userId', json.userId);
        $location.path('/home/main');
      }else{
        //TODO: show error message
      }
    })

  };


}])

.controller('HomeController',function($window, $location, $ionicPopup, AccountFactory, $ionicPlatform){
  let self = this;

  self.name = $window.sessionStorage.getItem('name');
  self.permission = $window.sessionStorage.getItem('permission');
  self.userId = $window.sessionStorage.getItem('userId');

  self.account = {};

  self.account.balance = 0;

  self.getAccountBalance = ()=>{
    AccountFactory.getAccountBalance(self.userId).then((response)=>{
      self.account = response.data.result[0];
    })
  };

  self.getAccountBalance();

  self.logout = ()=>{

    let confirmPopup = $ionicPopup.confirm({
      title: 'Logout',
      template: 'Are you sure you want to logout?'
    });

    confirmPopup.then(function(res) {
      if(res) {
        $window.sessionStorage.removeItem('name');
        $window.sessionStorage.removeItem('permission');
        $window.sessionStorage.removeItem('token');
        $window.sessionStorage.removeItem('userId');
        $location.path('/');
      } else {
        console.log('You are not sure');
      }
    });
  }

//  scan qr code
  self.scanBarCode = ()=>{
    console.log('scan');
    cordova.plugins.barcodeScanner.scan(function(imageData) {
      alert(imageData.text);
      console.log("Barcode Format -> " + imageData.format);
      console.log("Cancelled -> " + imageData.cancelled);
    }, function(error) {
      console.log("An error happened -> " + error);
    });
  }
})

.controller('QRGeneratorController', function($scope){
  console.log('qr code controller');

  $scope.qrcodeString = "123";
})

.controller('HistoryController', function(TripFactory, $window, $ionicLoading){

  let self = this;

  self.userId = $window.sessionStorage.getItem('userId');

  self.getTripHistory = ()=>{

    $ionicLoading.show({
      template: '<ion-spinner icon="lines"></ion-spinner><br>Loading ...'
    });

    TripFactory.getTripHistoryByUser(self.userId).then((response)=>{
      self.history = response.data.result;
      console.log('history:',self.history);
      $ionicLoading.hide();
    })
  };

  self.getTripHistory();

});

