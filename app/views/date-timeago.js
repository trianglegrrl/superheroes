var DateTimeAgoView = Ember.View.extend({
  templateName: 'date-timeago',

  // technique suggested at http://mavilein.github.io/javascript/2013/08/01/Ember-JS-After-Render-Event/
  didInsertElement : function() {
    this._super();
    Ember.run.scheduleOnce('afterRender', this, this.afterRenderEvent);
  },

  afterRenderEvent : function() {
    // implement this hook in your own subclasses and run your jQuery logic there
    $('.timeago').timeago();
  }
});

export default DateTimeAgoView;
