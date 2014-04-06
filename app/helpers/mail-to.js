export default Ember.Handlebars.makeBoundHelper(function (emailAddress, label) {
  if(Ember.isEmpty(emailAddress))
    return '';

  emailAddress = Em.Handlebars.Utils.escapeExpression(emailAddress);
  label = (arguments.length === 2) ? emailAddress : Em.Handlebars.Utils.escapeExpression(label);

  var link =  '<div class="social-button">'
              + '<a href="mailto:'
              + emailAddress
              + '">'
              + '<i class="fa fa-3x fa-envelope"></i>'
              + '</a>'
              + '</div>';
  return new Em.Handlebars.SafeString(link);
});
