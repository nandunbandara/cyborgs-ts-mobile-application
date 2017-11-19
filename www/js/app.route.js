angular.module('cyborgs-ts',['ionic'])

.config(($stateProvider, $urlRouterProvider)=>{
  console.log('config loaded');
  $stateProvider
    .state('login',{
      url: '/',
      templateUrl: 'templates/login.html'
    })
    .state('home',{
      url: '/home',
      templateUrl: 'templates/home.html',
      controller: 'LoginController'
    })

    .state('qr',{
      url: '/qr',
      templateUrl: 'templates/qr-view.html',
      controller: 'QRGeneratorController'
    })

    $urlRouterProvider.otherwise('/');
});
