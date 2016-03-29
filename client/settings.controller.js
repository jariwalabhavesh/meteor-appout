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
		$meteor.call('getAppOutConfig').then(
			function(result) {
				$scope.appOutConfig = result;
			}, function(error) {
				console.log("[APP_OUT] Error while fetching the appOutConfig Object from Server - ", error);
			}
		);

		$scope.save = function() {
			if($scope.myForm.$valid) {
				console.log('[APP_OUT] Saving App Config Object - ', $scope.appOutConfig);

				$meteor.call('updateAppOutConfig', $scope.newNotification).then(
					function(result) {
						alert('Config updated correctly.');          
						console.log("[APP_OUT] Updated Successfully: ", result);
					}, function(error) {
						console.log("[APP_OUT] Error while updating Configs:", error);
					}
				);
			}
		}
	}
])
