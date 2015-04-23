(function(){
	"use strict";

  // Application Instance
	window.App = Ember.Application.create();

  // Ember Data for Song and Album

  App.Album = Ember.Object.extend({
    // Computed Property for total duration of an album
    totalDuration: function() {
      var duration = 0;
      var songList = this.get('songs');
      for (var i = 0; i < songList.length; i++) {
        duration += songList[i].duration;
      }
      return duration;
    }.property('songs.@each.duration')
  });
  App.Song = Ember.Object.extend();

  // Main Application Route
  App.ApplicationRoute = Ember.Route.extend({

  });

  // Map Dynamic Routes
  // Ember creates index route for you, but here we are experimenting with nesting
  // Also need to tell where nested template to render into like outlet
  App.Router.map(function(){
    this.resource('index', { path: '/'}, function(){
      this.resource('album',{path: 'album/:album_id'}, function(){
        this.route('edit');
      });
    });
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
    },
    events: {
      play: function(song) {
        window.song = song;
        this.controllerFor('nowPlaying').set('model',song);
      }
    }
  });

  // You can go and reach up, because edit nested in album?
  App.AlbumEditRoute = Ember.Route.extend({
    model: function() {
      return this.modelFor('album');
    }
  });

  // Create object controller for nowplaying template

  App.NowPlayingController = Ember.ObjectController.extend();

  // Handlebars helper to display seconds
  // Takes number of seconds and displays in MM:SS
  // So 125 = 2:05
  Ember.Handlebars.helper("format-duration",function(time) {
    // Return Variable
    var result = "";
    // Get number of minutes
    var minutes = Math.floor(time / 60);
    // Get number of seconds since the last minute
    var seconds = time % 60;
    // Edge case for 10 seconds so result won't be xx:1, but xx:01
    if (seconds < 10) {
      seconds = "0" + seconds.toString();
    }
    // Build return string
    result = minutes.toString() + ":" + seconds;
    return result;
  });

})();

// Alternative without a model hook
// // create ember object
//   App.Album = Ember.Object.extend();
// // define a find function, that rertusn an album object with the correct id
//   App.Album.find = function(id) {
//     return App.Album.create(App.ALBUM_FIXTURES.findProperty('id',id));
//   };


//   // Default if not provide a model hook
//   App.AlbumRoute = Ember.Route.extend({
//     model: function(params) {
//       return App.Album.find(params.album_id);
//     }
//   });
// //     // Ember creates index route for you, but here we are experimenting with nesting
//   App.Router.map(function(){
//     this.resource('album',{path: 'album/:album_id'});
//   });
// resource vs edit   Last login: 11/29/13 5:00 PM
//

// api handlebars helper transform values from model pu into dom
// apply transfomration
// number to text etc.
// moment/js
// add in helpers
