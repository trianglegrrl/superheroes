var IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('superheroes');
  }
});

export default IndexRoute;
