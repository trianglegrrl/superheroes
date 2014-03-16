var SuperheroesRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('superhero');
  }
});

export default SuperheroesRoute;
