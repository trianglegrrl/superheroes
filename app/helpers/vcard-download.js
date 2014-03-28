// stuff the current hero's vCard in an A tag as a data URI for download
// again, not triggering on vCard changes unless vCard is an argument :(
export default Ember.Handlebars.makeBoundHelper(function(vCard) {
  var string =  '<div class="social-button">'
                + '<a href="data:text/vcard,'
                + escape(vCard)
                + '" download="'
                + this.get('fullName')
                + '.vcf">'
                + '<i class="fa fa-3x fa-folder-open"></i>'
                + '</a>'
                + '</div>';
  return new Em.Handlebars.SafeString(string);
}, 'vCard');
