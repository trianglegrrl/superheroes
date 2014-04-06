var Router = Ember.Router.extend();

Router.map(function() {
  this.resource('superheroes', function() {
    this.route('show', { path: '/:id' });
    this.route('caliper', { path: '/caliper/:attrib' });
    this.route('checker');
  });
});

export default Router;
