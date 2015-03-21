(function(){
	"use strict";
	window.App = Ember.Application.create();
})();

// Creating route, which will supply model to the application template
// App.ApplicationRoute = Ember.Route.extend({
// 	model:function() {
// 		// you want to return an array of objects
// 		var arrayObjs = [];
// 		// loop through fixture data
// 		for (var i = 0; i < App.ALBUM_FIXTURES.length; i++) {
// 			// push objects with artist name and song into array
// 			arrayObjs.push(
// 				{
// 					albumName: App.ALBUM_FIXTURES[i].name,
// 					albumArtist: App.ALBUM_FIXTURES[i].artist
// 				}
// 			)
// 		}
// 		// return array of objcts with album name and artist
// 		return arrayObjs;
// 	}
// })

// Simpler solution
// look at properties in fixture
// see that it is already an array of objects
// see that you can use its properties in the template
App.ApplicationRoute = Ember.Route.extend({
	model: function(){
		return App.ALBUM_FIXTURES;
	
	}
});