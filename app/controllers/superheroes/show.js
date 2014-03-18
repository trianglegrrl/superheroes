var SuperheroesShowController = Ember.ObjectController.extend({
  /* this method will be called whenever 'id' changes
   * it computes the list of most different heroes for each quality
   * and stashes it in the controller so that the template
   * can use the lists as tooltips
   */
  computeDifferent: function() {
    var qualities = ['assertiveness', 'aggressiveness', 'egoDrive', 'empathy', 'egoStrengthResilience', 'riskTaking', 'urgency', 'cautiousness', 'sociability', 'gregariousness', 'accommodation', 'skepticism', 'abstractReasoning', 'ideaOrientation', 'thoroughness', 'flexibility', 'selfStructure', 'externalStructure'];

    // "this" will be different in the loop, and we'll still need it
    var controller = this;

    // loop through the quality names, building a list of the most different superheroes for each name
    qualities.forEach(function(quality) {
      var tooltip = "Least like you:<p />";

      // get all the heroes but the current one
      var rankedHeroes = controller.store.all('superhero');
      rankedHeroes = rankedHeroes.rejectBy('id',controller.get('id'));

      // sort the heroes in order of their absolute difference from the current hero
      rankedHeroes = rankedHeroes.sort(function(a, b) { return Math.abs(controller.get(quality) - b.get(quality)) - Math.abs(controller.get(quality) - a.get(quality)); });

      // we only need five
      rankedHeroes = rankedHeroes.splice(0,5);

      // build the actual tooltip - rather have that in the template than here
      rankedHeroes.forEach(function(hero) {
        tooltip += hero.get('fullName') + ' (' + hero.get(quality) + ")<br>";
      });
      controller.set(quality + 'LeastLikeTooltip', tooltip);
    });
  }.observes('id')
});

export default SuperheroesShowController;
