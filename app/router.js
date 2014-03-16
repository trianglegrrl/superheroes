var Router = Ember.Router.extend();

Router.map(function() {
  this.resource('superheroes', function() {
    this.route('show', { path: '/:id' });
  });
});

export default Router;
