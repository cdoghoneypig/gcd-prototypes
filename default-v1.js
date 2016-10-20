
// initialize bootstrap tooltips
$(function () {
$('[data-toggle="tooltip"]').tooltip()
});

// function to make the sidebar as long as wrapper1
var elongate_Sidebar = function() {
    // adjust height of sidebar so it goes full height of wrapper1
    var wrapper1Height = $("#wrapper1").height();
    $(".sidebar").height(wrapper1Height-50);
    }


// Clicking an expando also toggles visibility of the next checkbox
$(".checkbox-hider").click( function() {
    setTimeout( function() {
      // delay to ensure boostrap class change complete
      $(".checkbox-hider:not(.collapsed)").next().css('display', 'inline');
      $(".checkbox-hider.collapsed").next().css('display', 'none');
    }, 10);

    // Clicking expando also changes document height, so let's change sidebar too
    setTimeout(elongate_Sidebar, 375);
});


// sidebar collapse / expand toggle
$(".btn-sidebartoggle").click(function(e) {
    e.preventDefault();
    $("#wrapper1").toggleClass("sidebar-collapsed");
});

// function autocollapses sidebar at 600w, autoexpands at 1023w
var autocollapse_Sidebar = function() {
  var viewportWidth = $(window).width();
  if (viewportWidth < 600) {
      $("#wrapper1").addClass("sidebar-collapsed");
  }
  else if (viewportWidth > 1023){
      $("#wrapper1").removeClass("sidebar-collapsed");  
  };
};


// sidebar stuff to run on page load
$(elongate_Sidebar);
$(autocollapse_Sidebar);
$(window).resize(autocollapse_Sidebar);
$(window).resize(elongate_Sidebar);
