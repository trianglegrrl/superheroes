import { test, moduleFor } from 'ember-qunit';
import SuperheroesShowController from 'appkit/controllers/superheroes/show';
import Superhero from 'appkit/models/superhero';

moduleFor("controller:superheroes/show", "Unit Tests - Superheroes/show");

/* not quite sure how to set up the controller with a specific
 * model so that we can test against it
 */
test("model", function() {
  var controller = this.subject();

  notEqual(controller, undefined);
  notEqual(controller, null);
  equal(controller.get('id'), 1);
});


/*
test("discStyleDescription", function() {
  var controller = this.subject();
});

test("discStyleOpposites", function() {
  var controller = this.subject();

});

test("discStyleSimilar", function() {
  var controller = this.subject();

});

test("similarityMatrix", function() {
  var controller = this.subject();

});

test("globalCaliperScoreDiffs", function() {
  var controller = this.subject();

});

test("globalCaliperMostLike", function() {
  var controller = this.subject();

});

test("globalCaliperLeastLike", function() {
  var controller = this.subject();

});

test("vCard", function() {
  var controller = this.subject();

});
*/
