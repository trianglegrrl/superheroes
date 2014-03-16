 var SuperheroesShowRoute = Ember.Route.extend({
  model: function(params) {
    return(this.store.find('superhero', params.id));
  }
});

export default SuperheroesShowRoute;
