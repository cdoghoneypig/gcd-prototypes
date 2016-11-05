
// initialize bootstrap tooltips
    $(function () {
    $('[data-toggle="tooltip"]').tooltip()
    });


// function to make the sidebar as long as wrapper1
    var elongate_Sidebar = function() {
        // if there's no wrapper1, there's no sidebar so
        // skip the below code and just add a top margin to the footer
        if (!document.getElementById("wrapper1")) {
            // console.log("no wrapper1");
            $("#footer").css("margin-top","4em");
            return;
        }
        else {
            // console.log("Initial sidebar outerHeight at", $(".sidebar").outerHeight());
            
            // sum of heights of child elements in sidebar div
            // excluding the toggle button, which is height 100%
            var sum_of_children = 0
            $(".sidebar").children().not(".btn-sidebartoggle").each(function(){
                sum_of_children += $(this).outerHeight(true);
                // console.log($(this),$(this).outerHeight(true));
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
        };

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

// set td:before for tables so they squish better
    // make a list of all table classes for tables
    // this could be a problem if we later add more classes to tables!
    var table_Headers_For_Mobile = function() {
        if (! $("table").length) {
            // if no tables, skip the rest
            return;
        };
        var table_classes = [];
        $("table").each( function() {
            var this_table_class_list = $(this).attr("class").split(' ')        
            table_classes.push(this_table_class_list);
            table_classes = [].concat.apply([], table_classes);
        });

        // remove the generic class .listing from this array
        table_classes = table_classes.filter( function(item) 
                {return item != "listing"});

        // prepare a chunk of css style
        var new_css = "@media only screen and (max-width: 760px), \
        (min-device-width: 768px) and (max-device-width: 1024px)  {\n"

        // for each table, extract text from each th
        for (i = 0; i < $("table").length; i++) { 
            var cur_table = $("table." + table_classes[i]);
            var table_headers = []
            cur_table.find("th").each(function(index) 
                 {  // we replace single quotes with an escaped single quote
                    var header_text = $.trim($(this).text()).split("'").join("\'")
                    table_headers.push(header_text) });

            for (j = 0; j < table_headers.length; j++) {
                // use text from header in css rule for td within a table of a class

                var new_rule = "." + table_classes[i] + " td:nth-of-type("
                    + (j+1).toString() + "):before { content: \""
                    + table_headers[j] + "\"; }\n"
                new_css += new_rule
                // when done maunally, the css rule looks like this
                // .series-timeline-table td:nth-of-type(1):before { content: "Key Date"; }
            };
        };
        new_css +="\n}"
        $("<style>").prop("type", "text/css").html(new_css).appendTo("head")
        console.log("Created new style rules for table classes:", table_classes);
    };


// table stuff for on page load
    table_Headers_For_Mobile();

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





