import { test, moduleFor } from 'ember-qunit';
import Route from 'appkit/routes/superheroes/show';

moduleFor('route:superheroes/show', "Unit - SuperheroesShowRoute");

test("it exists", function(){
  ok(this.subject() instanceof Route);
});
