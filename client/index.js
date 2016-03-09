if (Meteor.isClient) {
	
	AppOutConfig = new Meteor.Collection("appOutConfig");

	angular.module('app-version-limit',['angular-meteor','ui.router'])
	.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider, AuthService) {
		console.log('Setting up the routes for App - Version - Limit.');
		$stateProvider.state('appVersionLimit', {
				url: '/appVersionLimit',
				views:{
					'container@': {
						templateUrl: '/packages/jumpbyte:packagetest/client/templates/settings.ng.html',
						controller: 'SettingsController'
					}
				},
			})
/*
			.state('root.home', {
				url: "/home",
				views: {
					'container@': {
						templateUrl: "client/templates/home.ng.html",
						controller: "HomeController"
					}
				}
			})
*/
	}])

	.config( [
		'$compileProvider',
		function($compileProvider){
			$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|skype|tel):/);
		}
	])

	.factory('AppOutObjectName', function() {
		return 'appOutConfigObject';
	})
}