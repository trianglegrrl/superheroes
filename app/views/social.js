var SocialView = Ember.View.extend({
  classNames: ['pull-left', 'social-button'],

  templateName: function() {
    var socialType = this.get('socialType');
    // Requires a template named socialType_link (e.g. twitter_link.hbs)
    return(socialType + '_link');
  }.property('socialType')
});

export default SocialView;
