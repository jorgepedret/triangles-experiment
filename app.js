(function(){
  
  var init = function(){
    var s = Snap("#svg");

    var vpWidth = $(window).outerWidth();
    var vpHeight = $(window).outerHeight();

    var triangles = [
      {
        points: [[0,0], [vpWidth/2, 0], [0, vpHeight]],
        attr: {
          fill: "crimson",
          strokeWidth: 5
        }
      },
      {
        points: [[vpWidth/2,0], [vpWidth, vpHeight], [0, vpHeight]],
        attr: {
          fill: "orange",
          strokeWidth: 5
        }
      },
      {
        points: [[vpWidth/2,0], [vpWidth, 0], [vpWidth, vpHeight]],
        attr: {
          fill: "green",
          strokeWidth: 5
        }
      }
    ];

    var makeTriangle = function(points, attr) {
      return s.path("M " + points[0][0] + " " + points[0][1] + " L " + points[1][0] + " " + points[1][1] + " L " + points[2][0] + " " + points[2][1] + " L " + points[0][0] + " " + points[0][1]).attr(attr);
    }

    for (var i in triangles) {
      t = triangles[i];
      triangles[i].path = makeTriangle(t.points, t.attr);
    }

  }

  window.onload = init
})()