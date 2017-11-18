angular.module('starter',['ionic'])

.config(($stateProvider, $urlRouterProvider)=>{
  console.log('config loaded');
  $stateProvider
    .state('home',{
      url: '/',
      templateUrl: 'templates/home.html'
    })
    .state('login',{
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginController'
    })
});
