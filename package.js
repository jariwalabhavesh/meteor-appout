Package.describe({
	name: 'jumpbyte:appout',
	version: '0.0.1',
	// Brief, one-line summary of the package.
	summary: 'For App Version Management.',
	// URL to the Git repository containing the source code for this package.
	git: 'http://github.com/jumpbytehq',
	// By default, Meteor will default to using README.md for documentation.
	// To avoid submitting documentation, set this field to null.
	documentation: 'README.md'
});

Package.onUse(function(api) {
	api.versionsFrom('1.2.1');
	// api.use('ecmascript');
	api.use('angular');
	api.addFiles('appout.js');
	api.addFiles('client/index.js', 'client');
	api.addFiles('client/settings.controller.js', 'client');
	api.addFiles('client/templates/settings.ng.html', 'client');

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