'use strict';

// use this function in place of jQuery(document).ready(...)
!function(fn) {
  if (document.readyState != 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}(init);

function init() {
  // set last modified date
  var modified = new Date(document.lastModified);
  document.getElementById('last-modified').innerHTML = modified.toLocaleDateString();

  // set copyright date
  var today = new Date();
  var year = today.getFullYear();
  document.getElementById('year').innerHTML = (year == 2015 ? year : '2015-' + year);
}
