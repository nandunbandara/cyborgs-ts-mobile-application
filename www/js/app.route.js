angular.module('starter',['ionic'])

.config(($stateProvider, $urlRouterProvider)=>{
  console.log('config loaded');
  $stateProvider
    .state('login',{
      url: '/',
      templateUrl: 'templates/login.html',
      controller: 'LoginController'
    })
});
