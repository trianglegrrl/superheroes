{ attr } = DS;

SuperheroesApp.Superhero = DS.Model.extend
  firstName: attr 'string'
  lastName: attr 'string'
  email: attr 'string'
