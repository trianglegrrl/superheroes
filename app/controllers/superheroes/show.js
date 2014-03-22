var SuperheroesShowController = Ember.ObjectController.extend({
  /*
   * have to do this to allow us to observe this computed property
   * http://stackoverflow.com/questions/19345553/ember-js-observer-on-computed-property-not-working-example-from-guides
   */
  init: function() {
    this.get('similarityMatrix');
  },

  /* similarityMatrix is a computed property
   * it triggers once per route transition - when the id of the controller's model changes
   * it really depends on all of the Caliper attributes, but expressing that dependency causes
   * it to fire once per attribute, and there seems to be no way to ask which attribute
   * caused it to trigger.
   * Returns an object indexed by the attributes, containing "similar" and "dissimilar"
   * arrays of superheroes
   */
  similarityMatrix: function() {
    // loop through the attribute names, building a list of the most different superheroes for each name
    var attributes = ['assertiveness', 'aggressiveness', 'egoDrive', 'empathy', 'egoStrengthResilience', 'riskTaking', 'urgency', 'cautiousness', 'sociability', 'gregariousness', 'accommodation', 'skepticism', 'abstractReasoning', 'ideaOrientation', 'thoroughness', 'flexibility', 'selfStructure', 'externalStructure'];

    // this won't mean the same thing inside the loop so hang on to it
    var controller = this;

    // accumulate similarities here, indexed by attribute
    var attributeSimilarities = {};

    /* FIXME - implement KSD's algorithm for dissimilar heroes
     *
     * "least like me" = >40 points
     * thus "least like me" with a 20 would have to be a 60 or more
     * and "least like me" could be <10 or >90 with a 50
     */
    attributes.forEach(function(attribute) {
      // get all the heroes but the current one
      var rankedHeroes = controller.store.all('superhero');
      rankedHeroes = rankedHeroes.rejectBy('id',controller.get('id'));

      // sort the heroes in order of their absolute difference from the current hero
      rankedHeroes = rankedHeroes.sort(function(a, b) { return Math.abs(controller.get(attribute) - a.get(attribute)) - Math.abs(controller.get(attribute) - b.get(attribute)); });

      // .reverse() reverses the array in place, so stash the results away before building the object
      var similar = rankedHeroes.slice(0,5);
      var dissimilar = rankedHeroes.reverse().slice(0,5);
      attributeSimilarities[attribute] = { similar: similar, dissimilar: dissimilar };
    });

    return attributeSimilarities;
  }.property('id')
});

export default SuperheroesShowController;
