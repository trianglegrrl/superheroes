var SuperheroesShowController = Ember.ObjectController.extend({
  /* this method will be called whenever 'id' changes
   * it computes the list of most different heroes for each quality
   * and stashes it in the controller so that the template
   * can use the lists as tooltips
   *
   * FIXME: this is the OLD way we generated tooltips - just left in for reference for now; needs to be removed
   */
  computeSimilarity: function() {
    // copied and pasted from http://www.calipermedia.calipercorp.com/collateral/CaliperTraits.pdf
    var explanations = {
      assertiveness: 'Potential to communicate information and ideas in a direct manner. Individuals scoring high on this quality should be willing to communicate their ideas and opinions. People with low Assertiveness scores may be uncomfortable expressing their viewpoints.',
      aggressiveness: 'Inclination to push forcefully. People who have high scores in Aggressiveness tend to be forceful when defending their ideas or actions. Individuals with low scores would be unlikely to take a firm approach.',
      egoDrive: 'Degree of satisfaction gained from persuading others. Highly ego-driven individuals should be motivated to win others’ commitment. People with low scores on this attribute are unlikely to invest much effort into gaining consensus. According to Caliper’s Performance Models, Ego-Drive can sometimes inhibit performance. In those Job Families, individuals with strong Ego-Drive could overemphasize gaining people’s agreement at the expense of accomplishing work goals. Those with low scores would be unlikely to allow the need to convince others to interfere with their job performance.',
      empathy: 'Potential to perceive others’ feelings and read social cues. An empathic individual is likely to be perceptive of people’s feelings and capable of reading social cues. Low scorers may misinterpret or be inattentive to others’ needs or feelings.',
      egoStrengthResilience: 'Capacity to handle rejection and criticism. Individuals with high scores on Ego-Strength tend to be unconcerned by setbacks. On the other hand, people who score low on this scale may be sensitive to criticism or rejection.',
      riskTaking: 'Willingness to take chances. Individuals scoring high on this attribute are likely to take chances on untested initiatives. People with low scores tend to be reluctant to risk failure.',
      urgency: 'The tendency to take quick action in order to obtain immediate results. High scorers on this attribute tend to be driven to act quickly. Individuals with low levels of Urgency are inclined to take time when handling tasks.',
      cautiousness: 'Inclination to make decisions carefully and think through relevant facts and alternatives. High scorers tend to be careful when deliberating options and calculating outcomes. By contrast, low scores on this attribute suggest a tendency to act without thinking things through.',
      sociability: 'The enjoyment of being around people and working with others. Individuals who score high on Sociability are likely to be motivated to interact with others. Low scorers on this attribute could be uninterested in having frequent social interaction. Caliper’s Performance Models show that Sociability can detract from job performance in some Job Families. In those circumstances, a highly sociable person would be apt to socialize with others, perhaps at the expense of producing results, while those with low scores would be unlikely to allow socializing to become a distraction.',
      gregariousness: 'Comfort with meeting new people and initiating conversations. Highly gregarious people would likely be comfortable establishing contact and networking. Those who have low scores on this attribute may be uneasy about taking the initiative in social situations. Caliper’s Performance Models indicate that Gregariousness can inhibit performance in some Job Families. When this attribute is a Performance Inhibitor, people with high scores could be motivated to network, which may detract from fulfilling position requirements. By contrast low scorers are unlikely to let the desire to meet people interfere with job performance.',
      accommodation: 'Desire to help others. Individuals who have high scores on this attribute tend to be motivated to help people. Those with low scores might be uninterested in providing assistance. In certain Job Families, Accommodation can be a Performance Inhibitor. In such cases, people who are highly accommodating are apt to be motivated to assist others, which may detract from fulfilling position requirements. Individuals with low scores are unlikely to let the need to help people interfere with their job performance.',
      skepticism: 'Inclination to doubt or question others’ motives. Caliper’s research has shown that this attribute is a Performance Inhibitor in some Job Families. Highly skeptical individuals tend to be guarded and wary of others’ intentions. People with low levels on this scale are likely to be trusting and willing to give others the benefit of the doubt.',
      abstractReasoning: 'Potential to solve problems and understand the logical relationships among concepts. People who show a high level of Abstract Reasoning Ability should be capable of understanding complex issues and integrating information. Individuals with low levels tend to be most effective when handling issues that have straightforward solutions.',
      ideaOrientation: 'Preference for thinking creatively and generating new ways to solve problems. Individuals with high Idea Orientation are likely to be motivated to develop creative, original solutions, while low scorers are inclined to use well-established methods. In certain Job Families, high Idea Orientation can derail performance. In these Job Families, people who show high scores are apt to be distracted by their need to generate new ideas. Those with low scores are unlikely to allow the desire to innovate to become a disruption.',
      thoroughness: 'The tendency to pay attention to detail. Individuals who show high scores on this attribute tend to be attentive when handling detail-intensive tasks. Those who score low may be uninterested in focusing on fine points.',
      flexibility: 'Willingness to modify an approach and to adapt to changing circumstances. Individuals who score high on this measure should be adaptable to change. Those who show low scores are likely to be reluctant to change their approach.',
      selfStructure: 'Preference for independently determining work methods. Individuals with high scores are apt to be motivated to independently determine their work approach, while those who show low Self-Structure scores are unlikely to define their own work methods.',
      externalStructure: ': Degree to which a person is sensitive to existing rules. Individuals who show a high level of External Structure are likely to be receptive to a structured environment with rules. People with low scores could be unresponsive to authority. Caliper’s research shows that high scores in External Structure suggest weaker performance in certain Job Families. In such cases, high scorers are apt to allow following rules to detract from achieving objectives. By contrast, low scorers are unlikely to let rules interfere with accomplishing work goals.'
    };

    // "this" will be different in the loop, and we'll still need it
    var controller = this;

    // loop through the attribute names, building a list of the most different superheroes for each name
    var attributes = ['assertiveness', 'aggressiveness', 'egoDrive', 'empathy', 'egoStrengthResilience', 'riskTaking', 'urgency', 'cautiousness', 'sociability', 'gregariousness', 'accommodation', 'skepticism', 'abstractReasoning', 'ideaOrientation', 'thoroughness', 'flexibility', 'selfStructure', 'externalStructure'];

    attributes.forEach(function(attribute) {
      // get all the heroes but the current one
      var rankedHeroes = controller.store.all('superhero');
      rankedHeroes = rankedHeroes.rejectBy('id',controller.get('id'));

      // sort the heroes in order of their absolute difference from the current hero
      rankedHeroes = rankedHeroes.sort(function(a, b) { return Math.abs(controller.get(attribute) - a.get(attribute)) - Math.abs(controller.get(attribute) - b.get(attribute)); });

      // build the actual tooltip - rather have that in the template than here
      var tooltip = '<h4>' + attribute + ' - Your Score: ' + controller.get(attribute) + '</h4><p />';

      if( explanations[attribute] )
        tooltip += '<p>' + explanations[attribute] + '</p></p>';

      // add in the most and least like people
      tooltip += '<h4>People most like you:</h4><p />';
      rankedHeroes.slice(0,5).forEach(function(hero) {
        tooltip += hero.get('fullName') + ' (' + hero.get(attribute) + ')<br>';
      });

      tooltip += '<h4>Peoople least like you:</h4><p />';
      rankedHeroes.reverse().slice(0,5).forEach(function(hero) {
        tooltip += hero.get('fullName') + ' (' + hero.get(attribute) + ')<br>';
      });

      // stow it away for use in the template - named ATTRIBUTESimilarityTooltip
      controller.set(attribute + 'SimilarityTooltip', tooltip);
    });
  }.observes('id'),

  /* similarityMatrix is a computed property
   * it triggers once per route transition - when the id of the controller's model changes
   * it really depends on all of the Caliper attributes, but expressing that dependency causes
   * it to fire once per attribute, and there seems to be no way to ask which attribute
   * caused it to trigger.
   * Returns an object indexed by the attributes, containing "similar" and "dissimilar"
   * arrays of superheroes
   */
  similarityMatrix: function() {
    // loop through the attribute names, building a list of the most different superheroes for each name
    var attributes = ['assertiveness', 'aggressiveness', 'egoDrive', 'empathy', 'egoStrengthResilience', 'riskTaking', 'urgency', 'cautiousness', 'sociability', 'gregariousness', 'accommodation', 'skepticism', 'abstractReasoning', 'ideaOrientation', 'thoroughness', 'flexibility', 'selfStructure', 'externalStructure'];

    // this won't mean the same thing inside the loop so hang on to it
    var controller = this;

    // accumulate similarities here, indexed by attribute
    var attributeSimilarities = {};

    attributes.forEach(function(attribute) {
      // get all the heroes but the current one
      var rankedHeroes = controller.store.all('superhero');
      rankedHeroes = rankedHeroes.rejectBy('id',controller.get('id'));

      // sort the heroes in order of their absolute difference from the current hero
      rankedHeroes = rankedHeroes.sort(function(a, b) { return Math.abs(controller.get(attribute) - a.get(attribute)) - Math.abs(controller.get(attribute) - b.get(attribute)); });
      var similar = rankedHeroes.slice(0,5);
      var dissimilar = rankedHeroes.reverse().slice(0,5);
      attributeSimilarities[attribute] = { similar: similar, dissimilar: dissimilar };
    });


    return attributeSimilarities;
  }.property('model.id'),

  similaritySemaphore: function() {
    this.get('model').incrementProperty('similarityUpdateSemaphore');
  }.observes('id'),

  /* minimal computed function that I'm testing with to see if a helper whose argument
   * is a computed property rather than a model property will work right
   * answer seems to be no
   */
  computesto: function() {
    return this.get('id');
  }.property('id')
});

export default SuperheroesShowController;
