var SuperheroesCaliperRoute = Ember.Route.extend({
  model: function(params) {
    var data = this.modelFor('superheroes');

    this.set('attributeName', params.attrib);

    var contentArray = data.map(function(item, index, enumerable) {
      return {
        label: item.get('fullName'),
        value: item.get(params.attrib)
      };
    });

    return contentArray;
  },

  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set('attributeName', this.get('attributeName'));
  }
});

export default SuperheroesCaliperRoute;

