/*
 * The SuperheroesCheckerController provides several computed properties
 * which return arrays of heroes who are lacking useful information
 */
var SuperheroesCheckerController = Ember.Controller.extend({
  // return array of heroes lacking a picture
  missingPic: function() {
    return this.store.all('superhero').reject(function(hero) { return hero.get('picUrl'); });
  }.property('superhero@each.picUrl'),

  // return array of heroes lacking a Precision Nutrition Profile
  missingPnProfile: function() {
    return this.store.all('superhero').reject(function(hero) { return hero.get('pnProfileUrl'); });
  }.property('superhero@each.pnProfileUrl'),

  // return an array of heroes lacking a Facebook URL
  missingFacebook: function() {
    return this.store.all('superhero').reject(function(hero) { return hero.get('facebookUrl'); });
  }.property('superhero@each.facebookUrl'),

  // return an array of heroes lacking a Twitter URL
  missingTwitter: function() {
    return this.store.all('superhero').reject(function(hero) { return hero.get('twitterUrl'); });
  }.property('superhero@each.twitterUrl'),

  // return an array of heroes lacking an email address
  missingEmail: function() {
    return this.store.all('superhero').reject(function(hero) { return hero.get('email'); });
  }.property('superhero@each.email'),

  // return an array of heroes lacking a Facebook URL
  missingDiSC: function() {
    return this.store.all('superhero').reject(function(hero) { return hero.get('majorDiscStyle'); });
  }.property('superhero@each.majorDiscStyle'),

  // return an array of heroes with a completely empty profile
  emptyProfile: function() {
    return this.store.all('superhero').filter(function(hero) { return Ember.isEmpty(hero.get('whatILove'))
                                                                   && Ember.isEmpty(hero.get('whatIHate'))
                                                                   && Ember.isEmpty(hero.get('whatINeed'))
                                                                   && Ember.isEmpty(hero.get('superpowers'));
                                                              });
  }.property('superhero.@each.whatILove','superhero.@each.whatIHate','superhero.@each.whatINeed','superhero.@each.superpowers'),

  // return an array of heroes who do not have all Caliper attributes
  incompleteCaliper: function() {
    var attributes = ['assertiveness', 'aggressiveness', 'egoDrive', 'empathy', 'egoStrengthResilience', 'riskTaking', 'urgency', 'cautiousness', 'sociability', 'gregariousness', 'accommodation', 'skepticism', 'abstractReasoning', 'ideaOrientation', 'thoroughness', 'flexibility', 'selfStructure', 'externalStructure'];

    var heroes = this.store.all('superhero');
    var incomplete_heroes = [];

    heroes.forEach(function(hero){
      var missing_attribute_count = 0;
      attributes.forEach(function( a ) { if(Ember.isEmpty(hero.get(a))) missing_attribute_count++; });

      if(missing_attribute_count)
        incomplete_heroes.push(hero);
      });

    return incomplete_heroes;

/* this didn't work
    return this.store.all('superhero').filter(function(hero) {
      attributes.forEach(function(attr) {
        return Ember.isEmpty(hero.get(attr));
      });
*/

 }.property('superhero@each.assertiveness', 'superhero@each.aggressiveness', 'superhero@each.egoDrive', 'superhero@each.empathy', 'superhero@each.egoStrengthResilience', 'superhero@each.riskTaking', 'superhero@each.urgency', 'superhero@each.cautiousness', 'superhero@each.sociability', 'superhero@each.gregariousness', 'superhero@each.accommodation', 'superhero@each.skepticism', 'superhero@each.abstractReasoning', 'superhero@each.ideaOrientation', 'superhero@each.thoroughness', 'superhero@each.flexibility', 'superhero@each.selfStructure', 'superhero@each.externalStructure')

});

export default SuperheroesCheckerController;
