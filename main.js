'use strict';

// ping Friend Finder
$.get('http://young-favorite-users.herokuapp.com');
// ping Green it!
$.get('https://vast-sierra-7757.herokuapp.com/');

$(document).ready(function() {
  // keep thumbnails square
  var $thumbnails = $('.thumbnail');
  function squareThumbnails() {
    $thumbnails.css('height', $thumbnails.css('width'));
  }
  squareThumbnails();
  $(window).resize(squareThumbnails);

  // set last modified date
  var modified = new Date(document.lastModified);
  $('#last-modified').text(modified.toLocaleDateString());

  // set copyright date
  var today = new Date();
  var year = today.getFullYear();
  $('#year').text(year == 2015 ? year : '2015-' + year);

  // set email
  var $email = $('<a>').attr('href', 'mailto:nicholas.babelthuap@gmail.com')
                   .text('nicholas.babelthuap (at) gmail.com');
  $('#mah-email').append($email);

  // set phone number
  $('#mah-numba').text('651-491-4928');
});
