var App;

module('Acceptances - Superheroes/show', {
    setup: function() {
        App = startApp();
    },
    teardown: function() {
        Ember.run(App, 'destroy');
    }
});

test('Superheroes/show renders', function() {
    expect(9);

    visit('/superheroes/1').then(function() {
      ok(exists('a.navbar-brand:contains("PN Superheroes")'));

      ok(exists('h2:contains("Team")'));
      equal($('.superhero').length, 36);

      ok(exists( 'h2:contains("Caliper Attributes")'));
      equal($('.caliper-attribute').length, 18);

      ok(exists('h4:contains("About Me")'));

      ok(exists('h4:contains("Comparisons")'));

      ok(exists('h4:contains("DiSC style for Alaina Hardie")'));

      ok(exists('h4:contains("Caliper Profile for Alaina Hardie")'));
    });
});

