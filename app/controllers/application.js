var ApplicationController = Ember.Controller.extend({
  queryParams: ['query'],
  query: null,

  queryField: Ember.computed.oneWay('query'),
  actions: {
    search: function() {
      Ember.Logger.log('ApplicationController/actions:search');
      this.transitionToRoute('search', { queryParams: { query: this.get('queryField') }});
    }
  }
});

export default ApplicationController;
