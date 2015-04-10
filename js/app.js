(function(){
	"use strict";

  // Application Instance
	window.App = Ember.Application.create();

  // Main Application Route
  App.ApplicationRoute = Ember.Route.extend({

  });

  // Map Dynamic Routes
  App.Router.map(function(){
    this.resource('album',{path: 'album/:album_id'});
  });

  // Index Route
  App.IndexRoute = Ember.Route.extend({
     model: function(){
      return App.ALBUM_FIXTURES;
    }
  });

  //Album Route
  App.AlbumRoute = Ember.Route.extend({
    model: function(params) {
      return App.ALBUM_FIXTURES.findProperty('id',params.album_id);
    }
  });

})();
