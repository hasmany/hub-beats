(function() {
"use strict";

window.App = Ember.Application.create();

/////////
// ROUTES
/////////

App.Router.map(function() {
  this.resource('album', { path: '/album/:album_id' });
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return App.ALBUM_FIXTURES;
  }
});

App.AlbumRoute = Ember.Route.extend({

  model: function(params) {
    return App.ALBUM_FIXTURES.findProperty('id', params.album_id);
  },

  events: {
    play: function(song) {
      this.controllerFor('nowPlaying').set('model', song);
    }
  },

});



////////////////////
// EMBER CONTROLLERS
///////////////////

App.NowPlayingController = Ember.ObjectController.extend();

App.SongItemController = Ember.ObjectController.extend({
  // Explicity tells we needs access to the controller
  needs: "nowPlaying",
  isPlaying: function() {
    // return true of this model is the same as the nowplaying model
    return this.get('model') === this.get('controllers.nowPlaying.model');
  }.property('controllers.nowPlaying.model')
});

// Set ObjectController for the nowPlaying footer
App.NowPlayingController = Ember.ObjectController.extend();

/////////////////
// EMBER OBJECTS
/////////////////

App.Song = Ember.Object.extend();
App.Album = Ember.Object.extend({
  totalDuration: function() {
    var sum = 0;

    var foo = "bar";
    this.get('songs').forEach(function(song) {
      eval('');
      sum += song.get('duration');
    });

    return sum;
  }.property('songs.@each.duration')
});

///////////////////
// EMBER COMPONENTS
///////////////////

App.AudioTimeComponent = Ember.Component.extend({
  remainingTime: function() {
    return this.get("duration") - this.get("currentTime");
  }.property("duration","currentTime"),

  click: function() {
    this.toggleProperty("isShowingRemaining");
  }
});

App.AudioPlayerComponent = Ember.Component.extend({
  classNames: 'audio-control',

  duration: null,
  currentTime: 0,
  isLoaded: false,
  isPlaying: false,
  toggleDuration: true,
  actions: {
    play: function(){
      this.$('audio')[0].play();
    },

    pause: function(){
      this.$('audio')[0].pause();
    },

    toggleTime: function() {

      if (this.toggleDuration) {
        this.$('p').html(this.currentTime);
        this.toggleDuration = false;
      } else {
        this.$('p').html(this.duration);
        this.toggleDuration = true;
      }
    },
  },

  didInsertElement: function() {
    var $audio = this.$('audio'),
        $input = this.$('input'),
        component = this;

    $input.attr('min',0);
    $audio.on('loadeddata', function() {
      component.set('duration', Math.floor(this.duration));
      component.set('isLoaded', true);
      $input.attr('max',Math.floor(component.duration));
    });

    $audio.on('timeupdate', function() {
      component.set('currentTime', Math.floor(this.currentTime));
      $input.val(Math.floor(this.currentTime));
    });

    $audio.on('play', function() {
      component.set('isPlaying', true);
    });

    $audio.on('pause', function() {
      component.set('isPlaying', false);
    });

    $input.on('change',function(e) {
      e.preventDefault();
      e.stopPropagation();
      $audio.trigger('move');
    });

    $audio.on('move',function(e) {
      e.preventDefault();
      e.stopPropagation();
      this.currentTime = $input.val();
    })

  }
});

////////////////////
// HANDLEBAR HELPERS
////////////////////

  Ember.Handlebars.helper('format-duration', function(seconds) {
    var minutes = Math.floor(seconds/60);
    var remainingSeconds = seconds % 60;

    var result = '';
    if (remainingSeconds < 10) {
      result = "0";
    }

    result += String(remainingSeconds);

    result = minutes + ":" + result;

    return result;
  });

})();

// Animation


