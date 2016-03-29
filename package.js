Package.describe({
	name: 'jumpbyte:appout',
	version: '0.0.2',
	// Brief, one-line summary of the package.
	summary: 'Simple App Version Managemener for mobile Apps.',
	// URL to the Git repository containing the source code for this package.
	git: 'https://github.com/jumpbytehq/meteor-appout.git',
	// By default, Meteor will default to using README.md for documentation.
	// To avoid submitting documentation, set this field to null.
	documentation: 'README.md'
});

Package.onUse(function(api) {
	api.versionsFrom('1.1.0.2');
	// api.versionsFrom('1.2.1');
	// api.use('ecmascript');
	// api.use('angular');
	api.addFiles('appout.js');
	api.addFiles('client/index.js', 'client');
	api.addFiles('client/settings.controller.js', 'client');
	if (api.addAssets) {
		api.addAssets('client/templates/settings.ng.html', 'client');
	} else {
		api.addFiles('client/templates/settings.ng.html', 'client');
	}	

	api.export("SettingsController", "client")

	// Server Code
	api.addFiles('server/main.js', 'server');
});

Package.onTest(function(api) {
	// api.use('ecmascript');
	api.use('tinytest');
	api.use('jumpbyte:appout');
	api.addFiles('appout-tests.js');
});
