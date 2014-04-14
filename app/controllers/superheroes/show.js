var SuperheroesShowController = Ember.ObjectController.extend({
  /*
   * have to do this to allow us to observe this computed property
   * http://stackoverflow.com/questions/19345553/ember-js-observer-on-computed-property-not-working-example-from-guides
   */
  init: function() {
    this.get('similarityMatrix');
  },


  discStyles: {
    'iD': {
            name: 'influence/Dominance',
            opposites: ['CS', 'C', 'SC'],
            similar: ['Di', 'iD', 'i']
          },
    'i' : {
            name: 'influence',
            opposites: ['C', 'CD', 'CS'],
            similar: ['iD', 'i', 'iS']
          },
    'iS': {
            name: 'influence/Support',
            opposites: ['CD', 'C', 'D'],
            similar: ['iS', 'i', 'Si']
          },
    'Si': {
            name: 'Support/influence',
            opposites: ['DC', 'CD', 'D'],
            similar: ['Si', 'S', 'iS']
          },
    'S' : {
            name: 'Support',
            opposites: ['D', 'DC', 'Di'],
            similar: ['S', 'Si', 'SC']
          },
    'SC': {
            name: 'Support/Conscientiousness',
            opposites: ['Di', 'D', 'iD'],
            similar: ['SC', 'S', 'CS']
          },
    'CS': {
            name: 'Conscientiousness/Support',
            opposites: ['iD', 'i', 'Di'],
            similar: ['CS', 'SC', 'C']
          },
    'C' : {
            name: 'Conscientiousness',
            opposites: ['iD', 'i', 'iS'],
            similar: ['C', 'CD', 'CS']
          },
    'CD': {
            name: 'Conscientiousness/Dominance',
            opposites: ['iS', 'i', 'Si'],
            similar: ['CD', 'C', 'DC']
          },
    'DC': {
            name: 'Dominance/Conscientiousness',
            opposites: ['Si', 'S', 'iS'],
            similar: ['DC', 'CD', 'D']
          },
    'D' : {
            name: 'Dominance',
            opposites: ['SC', 'S', 'Si'],
            similar: ['D', 'DC', 'Di']
          },
    'Di': {
            name: 'Dominance/influence',
            opposites: ['SC', 'S', 'CS'],
            similar: ['D', 'Di', 'iD']
          }
  },

  discStyleDescription: function() {
    var style = this.get('model.majorDiscStyle');
    var styles = this.get('discStyles');

    if(!style || !styles)
	return '';

    return(styles[style].name);
  }.property('majorDiscStyle', 'discStyles'),


  discStyleOpposites: function() {
    var style = this.get('model.majorDiscStyle');
    var styles = this.get('discStyles');

    if(!style || !styles)
	return '';

    var opposites = styles[style].opposites;

    var controller = this;

    var heroes = controller.store.all('superhero');
    heroes = heroes.rejectBy('id',controller.get('id'));

    var results = [];
    var heroesWhoAreOpposites = [];

    opposites.forEach(function(opposite) {
      heroesWhoAreOpposites = heroes
                                .filterBy('majorDiscStyle', opposite);

      if (!heroesWhoAreOpposites) {
        return([]);
      }

      heroesWhoAreOpposites.forEach(function (opp){
        results = $.merge(results, [opp]).slice(0, 5);
      });
    });

    return(results);
  }.property('majorDiscStyle', 'discStyles'),

  discStyleSimilar: function() {
    var style = this.get('model.majorDiscStyle');
    var styles = this.get('discStyles');

    if(!style || !styles)
	return '';

    var similar = styles[style].similar;

    var controller = this;

    var heroes = controller.store.all('superhero');
    heroes = heroes.rejectBy('id',controller.get('id'));

    var results = [];
    var heroesWhoAreSimilar = [];

    similar.forEach(function(obj) {
      heroesWhoAreSimilar = heroes
                              .filterBy('majorDiscStyle', obj);

      if (!heroesWhoAreSimilar) {
        return([]);
      }

      heroesWhoAreSimilar.forEach(function (obj){
        results = $.merge(results, [obj]).slice(0, 5);
      });
    });

    return(results);
  }.property('majorDiscStyle', 'discStyles'),

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

    attributes.forEach(function(attribute) {
      // get all the heroes but the current one
      var rankedHeroes = controller.store.all('superhero');
      rankedHeroes = rankedHeroes.rejectBy('id',controller.get('id'));

      // sort the heroes in order of their absolute difference from the current hero
      rankedHeroes = rankedHeroes.sort(function(a, b) { return Math.abs(controller.get(attribute) - a.get(attribute)) - Math.abs(controller.get(attribute) - b.get(attribute)); });

      // .reverse() reverses the array in place, so stash the results away before building the object
      var similar = rankedHeroes.slice(0,5);

      // weed out everyone who is less than 40 off
      var dissimilar = rankedHeroes.reject(function(hero) { return Math.abs(hero.get(attribute) - controller.get(attribute)) < 41; }).reverse().slice(0,5);
      attributeSimilarities[attribute] = { similar: similar, dissimilar: dissimilar };
    });

    return attributeSimilarities;
  }.property('assertiveness', 'aggressiveness', 'egoDrive', 'empathy', 'egoStrengthResilience', 'riskTaking', 'urgency', 'cautiousness', 'sociability', 'gregariousness', 'accommodation', 'skepticism', 'abstractReasoning', 'ideaOrientation', 'thoroughness', 'flexibility', 'selfStructure', 'externalStructure'),

  globalCaliperScoreDiffs: function() {
    var heroes = this.store.all('superhero').rejectBy('id',this.get('id'));
    var rankedHeroes = [];

    var me = this;

    heroes.forEach(function(hero) {
        var attributes = ['assertiveness', 'aggressiveness', 'egoDrive', 'empathy', 'egoStrengthResilience', 'riskTaking', 'urgency', 'cautiousness', 'sociability', 'gregariousness', 'accommodation', 'skepticism', 'abstractReasoning', 'ideaOrientation', 'thoroughness', 'flexibility', 'selfStructure', 'externalStructure'];
        var average = 0;

  attributes.forEach(function(attr, i) {
          average *= i;
          average += Math.abs(hero.get(attr) - me.get(attr));
          average /= i + 1;
        });

        rankedHeroes.push({score: parseInt(average, 10), hero: hero});
      });

      return rankedHeroes.sort(function(a,b) { return a.score - b.score; });
    }.property('assertiveness', 'aggressiveness', 'egoDrive', 'empathy', 'egoStrengthResilience', 'riskTaking', 'urgency', 'cautiousness', 'sociability', 'gregariousness', 'accommodation', 'skepticism', 'abstractReasoning', 'ideaOrientation', 'thoroughness', 'flexibility', 'selfStructure', 'externalStructure'),

  globalCaliperMostLike: function() {
    return this.get('globalCaliperScoreDiffs').slice(0, 5);
  }.property('globalCaliperScoreDiffs'),

  globalCaliperLeastLike: function() {
    return this.get('globalCaliperScoreDiffs').slice(-5).reverse();
  }.property('globalCaliperScoreDiffs'),

  /*
   * generate and return a vCard for this hero
   * Mac Address Book/Contacts and Google Contacts can import vCards
   * http://en.wikipedia.org/wiki/VCard
   */
  vCard: function() {
    var vCard = '';
    var firstName = '';
    var lastName = '';

    /* split the full name on whitespace boundaries
     * join all but the last name together as the first name
     */
    var names = this.get('fullName').trim().split(/\s/);
    if(names) {
      lastName = names.pop();
      firstName = names.join(' ');
    } else
      firstName = this.get('fullName');

    vCard += 'BEGIN:VCARD\n';
    vCard += 'VERSION:3.0\n';
    vCard += 'N:' + lastName + ';' + firstName + ';;;\n';
    vCard += 'FN:' + this.get('fullName') + '\n';
    vCard += 'ORG:Precision Nutrition\\, Inc.\n';
    vCard += 'EMAIL;TYPE=PREF,INTERNET:' + this.get('email') + '\n';

    // only set social profile fields if we have them
    if(this.get('twitterUrl'))
     vCard += 'X-SOCIALPROFILE;type=twitter:' + this.get('twitterUrl') + '\n';
    if(this.get('facebookUrl'))
     vCard += 'X-SOCIALPROFILE;type=facebook:' + this.get('facebookUrl') + '\n';
    if(this.get('gpUrl'))
     vCard += 'X-SOCIALPROFILE;type=googleplus:' + this.get('gpUrl') + '\n';

    // set their PN Profile page to be their primary URL
    if(this.get('pnProfileUrl'))
     vCard += 'URL:' + this.get('pnProfileUrl') + '\n';

    // use a default picture unless we have a picUrl and it starts with http
    // TESTME: we may need TYPE=[GIF|JPG|PNG]: before the actual URL
    // FIXME: photo URLs are just not working
    if(this.get('picUrl') && new RegExp(/^http/).test(this.get('picUrl')) )
      vCard += 'PHOTO;VALUE=URL;TYPE=JPG:' + this.get('picUrl') + '\n';
    else
      vCard += 'PHOTO;VALUE=URL;TYPE=PNG:https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/t1.0-1/c7.0.100.100/p100x100/305996_277385985698373_679123386_a.png\n';

    /* this is silly but I didn't manage to find an unadorned PN logo elsewhere and didn't want to spend more time on it
     * also, not sure if any software actually uses the LOGO field
     */
    vCard += 'LOGO;VALUE=URL;TYPE=PNG:https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/t1.0-1/c7.0.100.100/p100x100/305996_277385985698373_679123386_a.png\n';
    vCard += 'CATEGORIES:PN Superheroes\n';
    vCard += 'END:VCARD\n';

    return vCard;
  }.property('fullName', 'email', 'picUrl', 'twitterUrl', 'facebookUrl', 'gpUrl', 'pnProfileUrl'),

  lastUpdatedISO: function() {
    return this.get('lastUpdated').toISOString();
  }.property('lastUpdated')
});

export default SuperheroesShowController;
