
// initialize bootstrap tooltips
    $(function () {
    $('[data-toggle="tooltip"]').tooltip()
    });


// function to make the sidebar as long as wrapper1
    var elongate_Sidebar = function() {
        $(".sidebar").height($("#wrapper1").height()-50);
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
        console.log("Sidebar toggle time")
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

// prototype clicks all open a modal
    var modal = "<div id='myModal' class='modal' style='display:none'> \
            <div class='modal-content'> \
            <p>Demo only - no active links</p> \
            </div> \
            </div>"

    // add a modal first
    $(modal).insertAfter("#sizing_base");
    // disable a job
    $("a").attr("href","javascript:void(0)")

    // form submission just shows modal
    $('form').submit(function (evt) {
        evt.preventDefault();
        $('.modal').show();
    });
    // anchor tag click shows modal
    $("a").click(function(){
        $('.modal').show();
    });
    // click on modal hides it
    $(".modal").click(function(){
        $(".modal").hide();
    });





