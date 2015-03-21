(function(){
	"use strict";
	window.App = Ember.Application.create();
})();

// Creating route, which wills supply model to the application template

App.ApplicationRoute = Ember.Route.extend({
	model: function() {
		return {
			name: "hubert"		
		}
	}
})