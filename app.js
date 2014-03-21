function getRandomColor() {
    // var letters = '0123456789ABCDEF'.split('');
    // var color = '#';
    // for (var i = 0; i < 6; i++ ) {
    //   color += letters[Math.round(Math.random() * 15)];
    // }
    var colors = [
        "#31608E",
        "#F2F2F0",
        "#0F1813",
        "#183B59",
        "#6F6460",
        "#F1EEE7",
        "#CDD8DE",
        "#1E363B",
        "#0F3321",
        "#936A2B",
        "#4D6B6D",
        "#687576",
        "#AAA99B",
        "#ACBAB3",
        "#8AC8FD",
        "#BD8322",
        "#FFFFFF",
        "#94473E",
        "#849295",
        "#3C455A",
        "#171916",
        "#D4D6D8",
        "#425072",
        "#65635A",
        "#A5AABB",
        "#8D8A76",
        "#B5B7BE",
        "#A1683F",
        "#E66C65",
        "#DF8E03",
        "#A5E7DE",
        "#E1CEC7",
        "#563B11",
        "#F2BD30",
        "#43564E",
        "#761B01",
        "#C55A2C",
        "#A8590A",
        "#C8A082",
        "#485D3F",
        "#F8EFE7",
        "#A6702B",
        "#5F0C03",
        "#F4EA7C",
        "#FFF870",
        "#BDAE95",
        "#003C45",
        "#D4444F",
        "#23282E"
    ]
    return colors[Math.floor(Math.random()*colors.length)];
    // return color;
}

(function(){
  
  var init = function(){
    var s = Snap("#svg");

    var vpWidth = $(window).outerWidth();
    var vpHeight = $(window).outerHeight();

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
      }
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