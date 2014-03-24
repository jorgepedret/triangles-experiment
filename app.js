var palettes = [

    [
      "#e8f4f8",
      "#99cfe0",
      "#7FC5E7",
      "#3D6777",
      "#white",
      "#c1e1ec" 
    ],

    [
      "#F1F6F0",
      "#526A78",
      "#E0E3D8",
      "#D8CE95",
      "#8A8750",
      "#073322" 
    ],

    [
      "#E01D17",
      "#E0434A",
      "#B22722",
      "#FC635D",
      "#ECCFC1",
      "#FFF5EC" 

    ],

    [
      "#BEAA87",
      "#5C685A",
      "#01171E",
      "#CFCECC",
      "#8F6932",
      "#5686A1"
    ],

    [
      "#D99C01",
      "#EAEAEA",
      "#DFDCD7",
      "#B3AFAC",
      "#AF9980"
    ],

    [
      "#B1AD95",
      "#3B3E46",
      "#CBC4B3",
      "#707059",
      "#A39577",
      "#1B1519",
      "#3B5998"
    ],

    [
      "#45455C",
      "#83ACE6",
      "#CD9FD4",
      "#F6C6F6",
      "#FDE3FF"
    ]
]
var colors = palettes[Math.floor(Math.random()*palettes.length)];

function getRandomColor() {
  return colors[Math.floor(Math.random()*colors.length)];
}

(function(){
  
  var init = function(){
    var s = Snap("#svg");

    var vpWidth = $(window).outerWidth();
    var vpHeight = $(window).outerHeight() * 0.9;

    /*
     * Initial two triangles configuration object
     */
    var initialTriangles = [
      {
        points: [       // First triangle
          [0,0],        // First point
          [vpWidth, 0], // Second point
          [0, vpHeight] // Third point
        ],
        attr: {
          fill: getRandomColor()
        }
      },
      {
        points: [               // Second triangle
          [vpWidth,0],          // First point
          [vpWidth, vpHeight],  // Second point
          [0,vpHeight]          // Third point
        ],
        attr: {
          fill: getRandomColor()
        }
      },

    ];

    /*
     * Function that takes three points (points) and a point (x,y) inside the triangle
     * Responsible for determining the new three triangles that are going
     * to be generated
     *
     * Parameters:
     * `points` is the points of the triangle that was clicked
     * `x` is the x position of the mouse
     * `y` is the y position of the mouse
     */
    var splitTriangle = function (points, x, y) {

      var triangles = [
        // First triangle
        {

          points: [[x,y],[points[0][0],points[0][1]],[points[1][0],points[1][1]]],
          attr: {
            fill: getRandomColor()
          }
        },
        // Second triangle
        {
          points: [[x,y],[points[0][0],points[0][1]],[points[2][0],points[2][1]]],
          attr: {
            fill: getRandomColor()
          }
        },
        // Third triangle
        {
          points: [[x,y],[points[1][0],points[1][1]],[points[2][0],points[2][1]]],
          attr: {
            fill: getRandomColor()
          }
        }
      ]
      makeTriangles(triangles)
    }

    /*
     * Makes ONE triangle
     */
    var makeTriangle = function (points, attr) {
      attr.stroke = "none"
      var path = s.path("M " + points[0][0] + " " + points[0][1] + " L " + points[1][0] + " " + points[1][1] + " L " + points[2][0] + " " + points[2][1] + " L " + points[0][0] + " " + points[0][1]).attr(attr);
      
      /*
       * Whenever I click on this path (triangle) do something...
       * in this case is splitTriangle
       */
      path.click(function(e, x, y){
        splitTriangle(points, x, y);
      })

      return path;
    }

    /*
     * 
     */
    var makeTriangles = function(triangles) {
      for (var i in triangles) {
        t = triangles[i];
        triangles[i].path = makeTriangle(t.points, t.attr);
      }
    }

    makeTriangles(initialTriangles);

  }

  window.onload = init
})()