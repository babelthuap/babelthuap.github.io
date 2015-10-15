$(document).ready(function(){
    // set last modified date
    var modified = document.lastModified; // -> "MM/DD/YYYY hr:min:sec"
    modified = modified.slice(0, modified.indexOf(' '));
    $('#last-modified').text(modified);

    // set copyright date
    var today = new Date();
    var year = today.getFullYear();
    $('#year').text(year == 2015 ? year : "2015-" + year);
});
