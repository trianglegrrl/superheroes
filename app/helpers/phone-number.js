// cribbed formating code from https://github.com/commondream/handlebars-helpers-examples/blob/master/phone-helper.html
export default Ember.Handlebars.makeBoundHelper(function (phoneNumber) {
  if(Ember.isEmpty(phoneNumber))
    return '';

  phoneNumber = phoneNumber.toString();
  return new Em.Handlebars.SafeString('<a href="tel:' + phoneNumber + '">' + '(' + phoneNumber.substr(0,3) + ') ' + phoneNumber.substr(3,3) + '-' + phoneNumber.substr(6,4) + '</a>');
});
