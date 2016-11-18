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