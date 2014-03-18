var attr = DS.attr;

var Superhero = DS.Model.extend({
  fullName: attr('string'),
  email: attr('string'),
  picUrl: attr('string'),
  discPicUrl: attr('string'),
  whatILove: attr('string'),
  whatIHate: attr('string'),
  whatINeed: attr('string'),
  majorDiscStyle: attr('string'),
  superpowers: attr('string'),
  priorities: attr('string'),
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
  externalStructure: DS.attr('number'),

  discStyles: {
    'iD': 'influence/Dominance',
    'i' : 'influence',
    'iS': 'influence/Support',
    'Si': 'Support/influence',
    'S' : 'Support',
    'SC': 'Support/Conscientiousness',
    'CS': 'Conscientiousness/Support',
    'C' : 'Conscientiousness',
    'CD': 'Conscientiousness/Dominance',
    'DC': 'Dominance/Conscientiousness',
    'D' : 'Dominance',
    'Di': 'Dominance/influence'
  },
  discStyleDescription: function() {
    var style = this.get('majorDiscStyle');
    var styles = this.get('discStyles');
    return(styles[style]);
  }.property('majorDiscStyle', 'discStyles')
});

Superhero.FIXTURES = [
  {
    id: 1,
    fullName:"Alaina Hardie",
    email: "alaina@precisionnutrition.com",
    picUrl: "http://placepuppy.it/200/150",
    discPicUrl: "/assets/SampleDISC.png",
    whatILove: "Red wine, long walks on the beach, and classless subnetting.",
    whatIHate: "Nazis, snakes, and Nazis.",
    whatINeed: "Compassion, commitment, and $100,000 in unmarked US currency.",
    majorDiscStyle: 'SC',
    superpowers: "Pushups, counting to 10, drop-kicking ill-behaved children.",
    priorities: "Eating, sleeping, making life difficult for The Man.",
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
    id: 2,
    fullName:"Ralph Wiggum",
    email: "ralph@precisionnutrition.com",
    picUrl: "http://placepuppy.it/200/150",
    discPicUrl: "/assets/SampleDISC.png",
    whatILove: "Red wine, long walks on the beach, and classless subnetting.",
    whatIHate: "Nazis, snakes, and Nazis.",
    whatINeed: "Compassion, commitment, and $100,000 in unmarked US currency.",
    majorDiscStyle: 'SC',
    superpowers: "Pushups, counting to 10, drop-kicking ill-behaved children.",
    priorities: "Eating, sleeping, making life difficult for The Man.",
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
  },
  {
    id: 3,
    fullName:"Kaywinnet Lee Frye",
    email: "kaylee@precisionnutrition.com",
    picUrl: "http://placepuppy.it/200/150",
    discPicUrl: "/assets/SampleDISC.png",
    whatILove: "Red wine, long walks on the beach, and classless subnetting.",
    whatIHate: "Nazis, snakes, and Nazis.",
    whatINeed: "Compassion, commitment, and $100,000 in unmarked US currency.",
    majorDiscStyle: 'Si',
    superpowers: "Pushups, counting to 10, drop-kicking ill-behaved children.",
    priorities: "Eating, sleeping, making life difficult for The Man.",
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
  },
  {
    id: 4,
    fullName:"Hipster Douchebag",
    email: "yolo@precisionnutrition.com",
    picUrl: "http://placepuppy.it/200/150",
    discPicUrl: "/assets/SampleDISC.png",
    whatILove: "Red wine, long walks on the beach, and classless subnetting.",
    whatIHate: "Nazis, snakes, and Nazis.",
    whatINeed: "Compassion, commitment, and $100,000 in unmarked US currency.",
    majorDiscStyle: 'SC',
    superpowers: "Pushups, counting to 10, drop-kicking ill-behaved children.",
    priorities: "Eating, sleeping, making life difficult for The Man.",
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
  },
  {
    id: 29,
    fullName:"Krista Scott-Dixon",
    email: "krista@precisionnutrition.com",
    picUrl: "http://placepuppy.it/200/150",
    discPicUrl: "/assets/SampleDISC.png",
    whatILove: "Red wine, long walks on the beach, and classless subnetting.",
    whatIHate: "Nazis, snakes, and Nazis.",
    whatINeed: "Compassion, commitment, and $100,000 in unmarked US currency.",
    majorDiscStyle: 'i',
    superpowers: "Pushups, counting to 10, drop-kicking ill-behaved children.",
    priorities: "Eating, sleeping, making life difficult for The Man.",
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
  },
  {
    id: 33,
    fullName:"Smashy Smashy Egg Face",
    email: "smashysmashy@precisionnutrition.com",
    picUrl: "http://placepuppy.it/200/150",
    discPicUrl: "/assets/SampleDISC.png",
    whatILove: "Red wine, long walks on the beach, and classless subnetting.",
    whatIHate: "Nazis, snakes, and Nazis.",
    whatINeed: "Compassion, commitment, and $100,000 in unmarked US currency.",
    superpowers: "Pushups, counting to 10, drop-kicking ill-behaved children.",
    priorities: "Eating, sleeping, making life difficult for The Man.",
    assertiveness:1,
    aggressiveness:99,
    egoDrive:2,
    empathy:3,
    egoStrengthResilience:95,
    riskTaking:13,
    urgency:12,
    cautiousness:93,
    sociability:23,
    gregariousness:88,
    accommodation:48,
    skepticism:84,
    abstractReasoning:5,
    ideaOrientation:3,
    thoroughness:97,
    flexibility:12,
    selfStructure:88,
    externalStructure:98
  }
];

export default Superhero;
