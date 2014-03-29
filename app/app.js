import Resolver from 'ember/resolver';

var App = Ember.Application.extend({
  LOG_ACTIVE_GENERATION: true,
  LOG_MODULE_RESOLVER: true,
  LOG_TRANSITIONS: true,
  LOG_TRANSITIONS_INTERNAL: true,
  LOG_VIEW_LOOKUPS: true,
  modulePrefix: 'appkit', // TODO: loaded via config
  Resolver: Resolver['default']
});
App.Store = DS.Store.extend({
  revision: 13,
  adapter: DS.FixtureAdapter
});

Ember.View.reopen({
  init: function() {
    this._super();
    var self = this;

    // bind attributes beginning with 'data-'
    Em.keys(this).forEach(function(key) {
      if (key.substr(0, 5) === 'data-') {
        self.get('attributeBindings').pushObject(key);
      }
    });
  }
});

// from https://gist.github.com/InkSpeck/9145242
//Enables Use of the Data Tab in Ember inspector with Ember App kit
DS.DebugAdapter.reopen({
  getModelTypes: function() {
    var self = this;
    return Ember.keys(window.requirejs._eak_seen).filter(function(key) {
      return !!key.match(/^appkit\/models\//) && self.detect(window.require(key).default);
    }).map(function(key){
      var type = window.require(key).default, typeKey = key.match(/^appkit\/models\/(.*)/)[1];
      type.toString = function() { return typeKey; };
      return type;
    });
  }
});

export default App;

// This is necessary to make the Bootstrap tooltips work.
$(document).ready(function() {
  $('body').tooltip({
      selector: '[rel=tooltip]'
  });
});
