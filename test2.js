App = Ember.Application.create();

App.Router.map(function() {
});

/*
 * ApplicationRoute
 */
App.ApplicationRoute = Ember.Route.extend({
  actions: {
    showModal: function(name, model) {
      this.render(name, {
        into: 'application',
        outlet: 'modal',
        model: model
      });
    },
    removeModal: function() {
      this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'application'
      });
    }
  }
});

/*
 * IndexRoute
 */
App.IndexRoute = Ember.Route.extend({
  model: function() {
    return Ember.Object.create({ name: 'My name' });
  }
});

/*
 * SettingsModalController
 */
App.SettingsModalController = Ember.ObjectController.extend({
  actions: {
    save: function() {
      // save to server
    }
  }
});

/*
 * LogoutModalController
 */
App.LogoutModalController = Ember.Controller.extend({
  actions: {
    logout: function() {
      alert('logout');
    }
  }
});

/*
 * MyModalComponent
 */
App.MyModalComponent = Ember.Component.extend({
  actions: {
    ok: function() {
      this.$('.modal').modal('hide');
      this.sendAction('ok');
    }
  },
  show: function() {
    this.$('.modal').modal().on('hidden.bs.modal', function() {
      this.sendAction('close');
    }.bind(this));
  }.on('didInsertElement')
});
