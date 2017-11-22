angular.module('cyborgs-ts',['ionic'])

.config(($stateProvider, $urlRouterProvider)=>{
  console.log('config loaded');
  $stateProvider
    .state('login',{
      url: '/',
      templateUrl: 'templates/login.html',
      controller: 'LoginController as login'
    })

    .state('home',{
      url: '/home',
      templateUrl: 'templates/home.html',
      controller: 'HomeController as home'
    })

    .state('home.main',{
      url: '/main',
      templateUrl: 'templates/home-main.html',
      controller: 'HomeController as home'
    })

    .state('home.history',{
      url: '/history',
      templateUrl: 'templates/trip-history.html',
      controller: 'HistoryController as history'
    })

    .state('qr',{
      url: '/qr',
      templateUrl: 'templates/qr-view.html',
      controller: 'QRGeneratorController'
    })

    $urlRouterProvider.otherwise('/');
});
