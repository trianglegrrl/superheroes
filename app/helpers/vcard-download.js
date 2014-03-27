// stuff the current hero's vCard in an A tag as a data URI for download
// again, not triggering on vCard changes unless vCard is an argument :(
export default Ember.Handlebars.makeBoundHelper(function(vCard) {
  return new Em.Handlebars.SafeString('<a href="data:text/vcard,' + escape(vCard) + '" download="' + this.get('fullName') + '.vcf">Download to Contacts</a>');
}, 'vCard');
