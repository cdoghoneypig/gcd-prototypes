
// initialize bootstrap tooltips
    $(function () {
    $('[data-toggle="tooltip"]').tooltip()
    });


// function to make the sidebar as long as wrapper1
    var elongate_Sidebar = function() {
        if (!document.getElementById("wrapper1")) {
            // console.log("no wrapper1");
            $("#footer").css("margin-top","4em");
            return;
        }

        // console.log("Initial sidebar outerHeight at", $(".sidebar").outerHeight());
        
        // sum of heights of child elements in sidebar div
        // excluding the toggle button, which is height 100%
        var sum_of_children = 0
        $(".sidebar").children().not(".btn-sidebartoggle").each(function(){
            sum_of_children += $(this).outerHeight(true);
            console.log($(this),$(this).outerHeight(true));
        });
        // console.log("sum of children",sum_of_children);

        // height of wrapper 1
        var height_of_wrapper1 = $("#wrapper1").outerHeight();
        // console.log("wrapper1",height_of_wrapper1);

        var min_height = 920;
        // using 900 as a minimum
        var best_sidebar_height = Math.max(sum_of_children, height_of_wrapper1, min_height);
        // some fudge factor
        var margin_of_error = 40;
        // console.log("best sidebar height is",best_sidebar_height);
        $(".sidebar").height(best_sidebar_height + margin_of_error);
        
        // if sidebar length changes, shift footer top
        if (best_sidebar_height === min_height) {
            $("#footer").css("top",best_sidebar_height+60);
            // console.log("footer top set at min",best_sidebar_height+60)
            // for issue page this is 40 over...

        }
        else {
            $("#footer").css("top",best_sidebar_height+100);
            // console.log("footer top set at",best_sidebar_height+100)
        }
        

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
    elongate_Sidebar();
    $(autocollapse_Sidebar);
    $(window).resize(autocollapse_Sidebar);
    $(window).resize(elongate_Sidebar);

// one-time action to set min-height of wrapper2 to match sidebar - footer height
    $("#wrapper2").css("min-height", $(".sidebar").outerHeight() );
    

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





