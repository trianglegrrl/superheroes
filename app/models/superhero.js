 var Superhero = DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string')
});

Superhero.FIXTURES = [
  { id: 1, firstName: 'Alaina', lastName: 'Hardie', email: 'alaina@pn.com' },
  { id: 2, firstName: 'Krista', lastName: 'Scott-Dixon', email: 'krista@pn.com' },
  { id: 3, firstName: 'Erin', lastName: 'Weiss-Trainor', email: 'erin@pn.com' }
];

export default Superhero;
