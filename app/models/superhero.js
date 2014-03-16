var attr = DS.attr;

var Superhero = DS.Model.extend({
  fullName: attr('string'),
  email: attr('string'),
  picUrl: attr('string'),
  assertiveness: DS.attr('number'),
  aggressiveness: DS.attr('number'),
  egoDrive: DS.attr('number'),
  empathy: DS.attr('number'),
  egoStrengthResilience: DS.attr('number'),
  riskTaking: DS.attr('number'),
  urgency: DS.attr('number'),
  cautiousness: DS.attr('number'),
  sociability: DS.attr('number'),
  gregariousness: DS.attr('number'),
  accommodation: DS.attr('number'),
  skepticism: DS.attr('number'),
  abstractReasoning: DS.attr('number'),
  ideaOrientation: DS.attr('number'),
  thoroughness: DS.attr('number'),
  flexibility: DS.attr('number'),
  selfStructure: DS.attr('number'),
  externalStructure: DS.attr('number')
});

Superhero.FIXTURES = [
  {
    id: 1,
    fullName:"Alaina Hardie",
    email: "alaina@precisionnutrition.com",
    picUrl: "http://placepuppy.it/300/200",
    assertiveness:93,
    aggressiveness:2,
    egoDrive:85,
    empathy:73,
    egoStrengthResilience:10,
    riskTaking:78,
    urgency:81,
    cautiousness:3,
    sociability:46,
    gregariousness:12,
    accommodation:67,
    skepticism:14,
    abstractReasoning:95,
    ideaOrientation:97,
    thoroughness:3,
    flexibility:84,
    selfStructure:18,
    externalStructure:2
  },
  {
    id: 29,
    fullName:"Krista Scott-Dixon",
    email: "krista@precisionnutrition.com",
    picUrl: "http://placepuppy.it/300/200",
    assertiveness:31,
    aggressiveness:2,
    egoDrive:9,
    empathy:68,
    egoStrengthResilience:34,
    riskTaking:95,
    urgency:42,
    cautiousness:62,
    sociability:4,
    gregariousness:27,
    accommodation:28,
    skepticism:85,
    abstractReasoning:99,
    ideaOrientation:99,
    thoroughness:91,
    flexibility:44,
    selfStructure:47,
    externalStructure:4
  }
];

export default Superhero;
