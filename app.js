(function(){
  
  var init = function(){
    var s = Snap("#svg");

    var vpWidth = $(window).outerWidth();
    var vpHeight = $(window).outerHeight();

    s.path("M 0 0 L " + vpWidth/2 + " 0 L 0 " + vpHeight + " L 0 0").attr({
        fill: "crimson",
        strokeWidth: 5
    });
    
    s.path("M " + vpWidth/2 + " 0 L " + vpWidth/2 + " 0 L 0 " + vpHeight + " L 0 0").attr({
        fill: "green",
        strokeWidth: 5
    });

    console.log(path);
  }


  window.onload = init
})()