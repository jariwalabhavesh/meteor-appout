// Collections goes here
AppOutConfig = new Meteor.Collection("appOutConfig");

// Some default values
AppOut = {
	appOutConfigObject: 'appOutConfigObject'
};


Meteor.startup(function () {
	if (Meteor.isServer) {

		// Check if object not found then create one
		var configObject = AppOutConfig.findOne({
			'name': AppOut.appOutConfigObject
		});
		if(!configObject) {
			AppOutConfig.insert({
				name: AppOut.appOutConfigObject,
				messageForForceUpdate: 'Hello, User',
				messageForUpdateAvailable: 'Hello, User',
				androidCurrentAppVersion: '1.0',
				iosCurrentAppVersion: '1.0',
				androidMinAppVersion: '0.1',
				iosMinAppVersion: '0.1',
				linkAndroid: '',
				linkiOS: '',
			});
			console.log('[APP_OUT] Config Object has been created with default values');
		} else {
			console.log('[APP_OUT] Got the Config Object - ', configObject);
		}

		// Othe Stuff
	}
});

if(Meteor.isServer) {

	// CREDITS - http://stackoverflow.com/questions/6832596/how-to-compare-software-version-number-using-js-only-number
	var versionCompare = function(v1, v2, options) {
		var lexicographical = options && options.lexicographical,
			zeroExtend = options && options.zeroExtend,
			v1parts = v1.split('.'),
			v2parts = v2.split('.');

		function isValidPart(x) {
			return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
		}

		if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
			return NaN;
		}

		if (zeroExtend) {
			while (v1parts.length < v2parts.length) v1parts.push("0");
			while (v2parts.length < v1parts.length) v2parts.push("0");
		}

		if (!lexicographical) {
			v1parts = v1parts.map(Number);
			v2parts = v2parts.map(Number);
		}

		for (var i = 0; i < v1parts.length; ++i) {
			if (v2parts.length == i) {
				return 1;
			}

			if (v1parts[i] == v2parts[i]) {
				continue;
			}
			else if (v1parts[i] > v2parts[i]) {
				return 1;
			}
			else {
				return -1;
			}
		}

		if (v1parts.length != v2parts.length) {
			return -1;
		}

		return 0;
	}

	Meteor.methods({

		updateAppOutConfig: function(object) {
			AppOutConfig.update({
				name:AppOut.appOutConfigObject
			}, {
				$set: {
					androidCurrentAppVersion: object.androidCurrentAppVersion,
					iosCurrentAppVersion: object.iosCurrentAppVersion,
					linkAndroid: object.linkAndroid,
					linkiOS: object.linkiOS,
					messageForForceUpdate: object.messageForForceUpdate,
					messageForUpdateAvailable: object.messageForUpdateAvailable,
					androidMinAppVersion: object.androidMinAppVersion,
					iosMinAppVersion: object.iosMinAppVersion
				}
			});
		},

		getAppOutConfig: function() {
			return AppOutConfig.findOne({
				name: AppOut.appOutConfigObject
			});
		},

		/**
			Returns : {
				status: 'true' means correcly called/executed the method, 'false' means not worked correctly.
				appUpdateRequired: true means, User must update app, don't let them use the app,
				appUpdateAvailable: true means, New App Update is available.
				latestVerionOfAppLive: '4.1.2'
				linkAndroid: link to show in Android Devices,
				linkiOS: link to show in iOS Device,
			}
		*/
		getAppSpecs: function(currentAppVersion, platform) {

			if(!currentAppVersion) {
				console.log('One must provide the Current App Version to get correct response.');
				return {
					status: true,
					message: 'Argument missing - CURRENT_APP_VERSION.'
				}
			}

			console.log('[APP_OUT] [getAppSpecs] Hello World Metor Package. Args - ', currentAppVersion, ' User ID - ', Meteor.userId());

			// Check if object not found then create one
			var configObject = AppOutConfig.findOne({
				'name': AppOut.appOutConfigObject
			});

			
			// Just for Double Checking, if something is wrong.
			if(!configObject) {
				return {
					status: false,
					message: 'Something went wrong, Please contact support.'
				};
			}

			// According platform we have to check app version
			var minAppVersion = platform.toLowerCase() == 'android' ? configObject.androidMinAppVersion : configObject.iosMinAppVersion;
			var currentLiveAppVersion = platform.toLowerCase() == 'android' ? configObject.androidCurrentAppVersion : configObject.iosCurrentAppVersion;

			// Now, config object retrived & sending the details
			var returnObject = {
				status: true,
				linkiOS: configObject.linkiOS,
				linkAndroid: configObject.linkAndroid,
			};
	
			// Check App versions now.
			if(versionCompare(minAppVersion, currentAppVersion) == 1) {
				returnObject.appUpdateRequired = true;
				returnObject.message = configObject.messageForForceUpdate,
				console.log('[APP_OUT] [getAppSpecs] App Version is out of date');
				return returnObject;
			}
			console.log('[APP_OUT] [getAppSpecs] MiniMum version is yet lower than currentAppVersion, so allowing User to Use App');


			if(versionCompare(currentLiveAppVersion, currentAppVersion) == 1) {
				returnObject.appUpdateAvailable = true;
				returnObject.message = configObject.messageForUpdateAvailable,
				console.log('[APP_OUT] [getAppSpecs] New App Update available.');
				return returnObject;
			}

			return {
				status: true,
				message: "All Ok..!"
			}
		}
	});
}