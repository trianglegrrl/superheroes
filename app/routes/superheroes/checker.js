var SuperheroesCheckerRoute = Ember.Route.extend({
  model: function(params) {
    return(this.store.find('superhero'));
  }
});

export default SuperheroesCheckerRoute;
