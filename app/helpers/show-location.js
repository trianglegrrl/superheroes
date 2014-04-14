var isEmpty = Ember.isEmpty;

export default Ember.Handlebars.makeBoundHelper(function (hero) {
  var postalCode = hero.get("postalCode") || '';

  if(isEmpty(hero.get("city")) && isEmpty(hero.get("stateProv")) && isEmpty(hero.get("country")))
    return '';

  if(isEmpty(hero.get("city")) && isEmpty(hero.get("stateProv")))
    return hero.get("country");

  if(isEmpty(hero.get("city")))
    return hero.get("stateProv") + hero.get("country");

  return hero.get("city") + ", " + hero.get("stateProv") + " " + hero.get("country");
}, "street", "city", "stateProv", "country") ;
