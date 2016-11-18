// back to top script
$(document).ready(function(){
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('#back-to-top').fadeIn();
        } else {
            $('#back-to-top').fadeOut();
        }
    });
    // scroll body to 0px on click
    $('#back-to-top').click(function () {
        $('#back-to-top').tooltip();
        $('body,html').animate({
        scrollTop: 0
        }, 800);
        return false;
    });

    $('#back-to-top').tooltip();

});


// initialize bootstrap tooltips
    $(function () {
    $('[data-toggle="tooltip"]').tooltip()
    });

    $('input[rel="txtTooltip"]').tooltip({
        container: 'body'
    });



// element height listener
    // set sidebar min-height to height of wrapper2
    var wrapper2 = document.getElementById('wrapper2');
    new ResizeSensor(wrapper2, function() {
        wrapper2_height = wrapper2.clientHeight
        // console.log('Wrapper2 height changed to ' + wrapper2_height);
        $(".sidebar").css("min-height",wrapper2_height);
        $("#footer").css("top", wrapper2_height + $('.header_bar').outerHeight());
    });
    
    // if the sidebar gets very tall, it will expand itself
    // but, bc it's positioned absolutely, the footer will need
    // to be instructed where to go
    var sidebar = document.getElementsByClassName('sidebar')[0];
    new ResizeSensor(sidebar, function() {
        cur_sidebar_height = sidebar.clientHeight
        // console.log('Sidebar height changed to ' + cur_sidebar_height);
        $("#footer").css("top", cur_sidebar_height + $('.header_bar').outerHeight());
    });




// Clicking an expando also toggles visibility of the next checkbox
    $(".checkbox-hider").click( function() {
        setTimeout( function() {
          // delay to ensure boostrap class change complete
          $(".btn-sidebar.checkbox-hider:not(.collapsed)").next().css('display', 'inline');
          $(".btn-sidebar.checkbox-hider.collapsed").next().css('display', 'none');
          $(".btn-mainbody.checkbox-hider:not(.collapsed)").prev().css('display', 'inline');
          $(".btn-mainbody.checkbox-hider.collapsed").prev().css('display', 'none');
        }, 10);

        // Clicking expando also changes document height, so let's change sidebar too
        // resizesensor should take care of this on its own
        // setTimeout(elongate_Sidebar, 375);
        
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

                if (table_headers[j].length >= 20) {
                        // break into 2 rows
                        new_rule = "." + table_classes[i] + " td:nth-of-type("
                    + (j+1).toString() + ") { min-height: 3.15em; }\n"
                    }
                new_css += new_rule                    

                // when done maunally, the css rule looks like this
                // .series-timeline-table td:nth-of-type(1):before { content: "Key Date"; }
            };
        };
        new_css +="\n}"
        $("<style>").prop("type", "text/css").html(new_css).appendTo("head")
        console.log("Created new style rules for table classes:", table_classes);
    
        // first row of text gets a height of 1.6em
        // second row gets 2.54
        // $("tr").width() returns width in px of entire row
        // 

    };

// expand all button
    var ExpandAll = function() {
        $(".btn-mainbody.collapsed").click();
    }

    var CollapseAll = function() {
        $(".btn-mainbody:not(.collapsed)").click();
    }


// table stuff for on page load
    table_Headers_For_Mobile();

// sidebar stuff to run on page load
    $(autocollapse_Sidebar);
    $(window).resize(autocollapse_Sidebar);


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





