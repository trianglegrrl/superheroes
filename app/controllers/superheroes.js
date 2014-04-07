var SuperheroesController = Ember.ArrayController.extend({
  sortProperties: ['fullName'],

  caliperAttributes: [
      { name: 'assertiveness' },
      { name: 'aggressiveness' },
      { name: 'egoDrive' },
      { name: 'empathy' },
      { name: 'egoStrengthResilience' },
      { name: 'riskTaking' },
      { name: 'urgency' },
      { name: 'cautiousness' },
      { name: 'sociability' },
      { name: 'gregariousness' },
      { name: 'accommodation' },
      { name: 'skepticism' },
      { name: 'abstractReasoning' },
      { name: 'ideaOrientation' },
      { name: 'thoroughness' },
      { name: 'flexibility' },
      { name: 'selfStructure' },
      { name: 'externalStructure' }
  ],

  heroes: function() {
    return this.store.all('superhero');
  }.property('')
});

export default SuperheroesController;
