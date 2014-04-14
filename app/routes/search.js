var SearchRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('superhero');
  }
});

export default SearchRoute;
