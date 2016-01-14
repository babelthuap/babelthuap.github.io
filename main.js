'use strict';

$(document).ready(function() {
  // set last modified date
  var modified = new Date(document.lastModified);
  $('#last-modified').text(modified.toLocaleDateString());

  // set copyright date
  var today = new Date();
  var year = today.getFullYear();
  $('#year').text(year == 2015 ? year : '2015-' + year);
});
