var SearchController = Ember.ArrayController.extend({
  queryParams: ['query'],
  query: null,

  results: function() {
    var regexp = new RegExp(this.get('query'), 'i');
    return this.store.filter('superhero', function(hero) {
        return regexp.test(hero.get('fullName'))
            || regexp.test(hero.get('city'))
            || regexp.test(hero.get('stateProv'))
            || regexp.test(hero.get('country'))
            || regexp.test(hero.get('superpowers'))
            || regexp.test(hero.get('whatILove'))
            || regexp.test(hero.get('whatIHate'))
            || regexp.test(hero.get('whatINeed'))
            || regexp.test(hero.get('priorities'));
    });
  }.property('query')
});

export default SearchController;
