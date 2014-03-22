/* helper to decorate attributes with tooltips showing
 *   - explanation of the attribute
 *   - most similar heroes
 *   - least similar heroes
 *
 * Invoke with an attribute and it will capitalize the attribute name and wrap it in span which provides
 * the tooltip
 *
 * Invoke with an attribute and a label and it will wrap the label in the tooltipped span
 *
 * FIXME
 * 
 * Using instructions from http://iamstef.net/ember-app-kit/guides/using-modules.html
 *
 * Why doesn't this work? 
 *
 * app.js has this line in it:
 *
 * Ember.Handlebars.registerBoundHelper('attributeTooltip', attributeTooltipHelper, 'id', 'similarityUpdateSemaphore');
 *
 * and yet this helper does not refresh when id or similarityUpdateSemaphore changes
 *
 * Ultimately what I want to do is observe the computed property similarityMatrix - apparently this is
 * possible if you .get('similarityMatrix') in the controller's init. I don't want to mess with this
 * until I sort out the three issues above.
 * http://emberjs.com/blog/2013/08/29/ember-1-0-rc8.html
 */

export default function (attribute, label) {
  // copied and pasted from http://www.calipermedia.calipercorp.com/collateral/CaliperTraits.pdf
  var explanations = {
    abstractReasoning: 'Potential to solve problems and understand the logical relationships among concepts. People who show a high level of Abstract Reasoning Ability should be capable of understanding complex issues and integrating information. Individuals with low levels tend to be most effective when handling issues that have straightforward solutions.',
    accommodation: 'Desire to help others. Individuals who have high scores on this attribute tend to be motivated to help people. Those with low scores might be uninterested in providing assistance. In certain Job Families, Accommodation can be a Performance Inhibitor. In such cases, people who are highly accommodating are apt to be motivated to assist others, which may detract from fulfilling position requirements. Individuals with low scores are unlikely to let the need to help people interfere with their job performance.',
    aggressiveness: 'Inclination to push forcefully. People who have high scores in Aggressiveness tend to be forceful when defending their ideas or actions. Individuals with low scores would be unlikely to take a firm approach.',
    assertiveness: 'Potential to communicate information and ideas in a direct manner. Individuals scoring high on this quality should be willing to communicate their ideas and opinions. People with low Assertiveness scores may be uncomfortable expressing their viewpoints.',
    cautiousness: 'Inclination to make decisions carefully and think through relevant facts and alternatives. High scorers tend to be careful when deliberating options and calculating outcomes. By contrast, low scores on this attribute suggest a tendency to act without thinking things through.',    egoDrive: 'Degree of satisfaction gained from persuading others. Highly ego-driven individuals should be motivated to win others’ commitment. People with low scores on this attribute are unlikely to invest much effort into gaining consensus. According to Caliper’s Performance Models, Ego-Drive can sometimes inhibit performance. In those Job Families, individuals with strong Ego-Drive could overemphasize gaining people’s agreement at the expense of accomplishing work goals. Those with low scores would be unlikely to allow the need to convince others to interfere with their job performance.',
    egoStrengthResilience: 'Capacity to handle rejection and criticism. Individuals with high scores on Ego-Strength tend to be unconcerned by setbacks. On the other hand, people who score low on this scale may be sensitive to criticism or rejection.',
    empathy: 'Potential to perceive others’ feelings and read social cues. An empathic individual is likely to be perceptive of people’s feelings and capable of reading social cues. Low scorers may misinterpret or be inattentive to others’ needs or feelings.',
    externalStructure: ': Degree to which a person is sensitive to existing rules. Individuals who show a high level of External Structure are likely to be receptive to a structured environment with rules. People with low scores could be unresponsive to authority. Caliper’s research shows that high scores in External Structure suggest weaker performance in certain Job Families. In such cases, high scorers are apt to allow following rules to detract from achieving objectives. By contrast, low scorers are unlikely to let rules interfere with accomplishing work goals.',
    flexibility: 'Willingness to modify an approach and to adapt to changing circumstances. Individuals who score high on this measure should be adaptable to change. Those who show low scores are likely to be reluctant to change their approach.',
    gregariousness: 'Comfort with meeting new people and initiating conversations. Highly gregarious people would likely be comfortable establishing contact and networking. Those who have low scores on this attribute may be uneasy about taking the initiative in social situations. Caliper’s Performance Models indicate that Gregariousness can inhibit performance in some Job Families. When this attribute is a Performance Inhibitor, people with high scores could be motivated to network, which may detract from fulfilling position requirements. By contrast low scorers are unlikely to let the desire to meet people interfere with job performance.',
    ideaOrientation: 'Preference for thinking creatively and generating new ways to solve problems. Individuals with high Idea Orientation are likely to be motivated to develop creative, original solutions, while low scorers are inclined to use well-established methods. In certain Job Families, high Idea Orientation can derail performance. In these Job Families, people who show high scores are apt to be distracted by their need to generate new ideas. Those with low scores are unlikely to allow the desire to innovate to become a disruption.',
    riskTaking: 'Willingness to take chances. Individuals scoring high on this attribute are likely to take chances on untested initiatives. People with low scores tend to be reluctant to risk failure.',
    selfStructure: 'Preference for independently determining work methods. Individuals with high scores are apt to be motivated to independently determine their work approach, while those who show low Self-Structure scores are unlikely to define their own work methods.',
    skepticism: 'Inclination to doubt or question others’ motives. Caliper’s research has shown that this attribute is a Performance Inhibitor in some Job Families. Highly skeptical individuals tend to be guarded and wary of others’ intentions. People with low levels on this scale are likely to be trusting and willing to give others the benefit of the doubt.',
    sociability: 'The enjoyment of being around people and working with others. Individuals who score high on Sociability are likely to be motivated to interact with others. Low scorers on this attribute could be uninterested in having frequent social interaction. Caliper’s Performance Models show that Sociability can detract from job performance in some Job Families. In those circumstances, a highly sociable person would be apt to socialize with others, perhaps at the expense of producing results, while those with low scores would be unlikely to allow socializing to become a distraction.',    
    thoroughness: 'The tendency to pay attention to detail. Individuals who show high scores on this attribute tend to be attentive when handling detail-intensive tasks. Those who score low may be uninterested in focusing on fine points.',
    urgency: 'The tendency to take quick action in order to obtain immediate results. High scorers on this attribute tend to be driven to act quickly. Individuals with low levels of Urgency are inclined to take time when handling tasks.'
    };

  label = (arguments.length === 2) ? attribute.charAt(0).toUpperCase() + attribute.slice(1) : Em.Handlebars.Utils.escapeExpression(label);

  var tooltip = '<h4>' + label + ' - Your Score: ' + this.get(attribute) + '</h4><p />';

  if( explanations[attribute] )
    tooltip += '<p>' + Em.Handlebars.Utils.escapeExpression(explanations[attribute]) + '</p></p>';

  // add in the most and least like people
  tooltip += '<h4>People most like you:</h4><p />';

  // call the computed function - tried to bind on this but that doesn't seem to work
  var matrix = this.get('similarityMatrix');

  // FIXME - limit to +- 10 as per KSD (double check if returning none is okay)
  matrix[attribute].similar.forEach(function(hero) {
    tooltip += hero.get('fullName') + '(' + hero.get(attribute) + ')<br>';
  });

  tooltip += '<h4>Peoople least like you:</h4><p />';

  /* FIXME - get KSD's algorithm working
   * "least like me" = >40 points
   * thus "least like me" with a 20 would have to be a 60 or more
   * and "least like me" could be <10 or >90 with a 50
   */
  matrix[attribute].dissimilar.forEach(function(hero) {
    tooltip += hero.get('fullName') + '(' + hero.get(attribute) + ')<br>';
  });

  var output = '<span rel="tooltip" data-html="true" class="hoverable-tooltip" data-original-title="' + tooltip + '">' + label + '</span>';
  return new Em.Handlebars.SafeString(output);
}
