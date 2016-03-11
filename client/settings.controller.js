angular.module("app-version-limit")

.controller('SettingsController', ["$scope", "$state", "$meteor", "$rootScope", 'AppOutObjectName', 
	function($scope, $state, $meteor, $rootScope, AppOutObjectName) {
		console.log("[APP_OUT] Starting the App Update/Out Utility. Credits: www.jumpbyte.com");
		
		/*$meteor.call('getAppSpecs', '0.2').then(
			function(data){
				console.log('success inviting', data);
			},
			function(err){
				console.log('failed', err);
			}
		);*/
		$scope.appOutConfig = AppOutConfig.findOne({
			name: AppOutObjectName
		});;

		$scope.save = function() {
			if($scope.myForm.$valid) {
				console.log('[APP_OUT] Saving App Config Object - ', $scope.appOutConfig);

				// Saving App Config Object
				// var object = AppOutConfig.findOne({
				// 	name: AppOutObjectName
				// });
				AppOutConfig.update({
					_id: $scope.appOutConfig._id
				}, {
					$set: {
						androidCurrentAppVersion: $scope.appOutConfig.androidCurrentAppVersion,
						iosCurrentAppVersion: $scope.appOutConfig.iosCurrentAppVersion,
						linkAndroid: $scope.appOutConfig.linkAndroid,
						linkiOS: $scope.appOutConfig.linkiOS,
						messageForForceUpdate: $scope.appOutConfig.messageForForceUpdate,
						messageForUpdateAvailable: $scope.appOutConfig.messageForUpdateAvailable,
						androidMinAppVersion: $scope.appOutConfig.androidMinAppVersion,
						iosMinAppVersion: $scope.appOutConfig.iosMinAppVersion
					}
				}, function(error, docsUpdated) {
					if(docsUpdated == 1) {
						alert('Config updated correctly.');
					}
				});
			}
		}
	}
])
