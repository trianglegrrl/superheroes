var SuperheroesShowController = Ember.ObjectController.extend({
  /*
   * have to do this to allow us to observe this computed property
   * http://stackoverflow.com/questions/19345553/ember-js-observer-on-computed-property-not-working-example-from-guides
   */
  init: function() {
    this.get('similarityMatrix');
  }
});

export default SuperheroesShowController;
