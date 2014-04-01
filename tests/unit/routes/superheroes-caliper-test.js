import { test, moduleFor } from 'ember-qunit';
import Route from 'appkit/routes/superheroes/caliper';

moduleFor('route:superheroes/caliper', "Unit - SuperheroesCaliperRoute");

test("it exists", function(){
  ok(this.subject() instanceof Route);
});
