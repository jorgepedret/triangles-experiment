var palettes = [

    [
      "#e8f4f8",
      "#99cfe0",
      "#7FC5E7",
      "#3D6777",
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
      "#ECCFC1"
    ],

    [
      "#BEAA87",
      "#5C685A",
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
    ],

    [
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
     "#A97845",
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
]
var colors = palettes[Math.floor(Math.random()*palettes.length)];

function getRandomColor() {
  return colors[Math.floor(Math.random()*colors.length)];
}

(function(){
  
  var init = function(){
    var s = Snap("#svg");

    var vpWidth = $(window).outerWidth();
    var vpHeight = $(window).outerHeight() - 30;

    s.attr({ width: vpWidth + "px", height: vpHeight + "px" })

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

  var prepareImage = function(){
    var target = $("#svg")[0];
    
    // Takes an SVG element as target
    function svg_to_png_data(target) {
      // Flatten CSS styles into the SVG
      for (i = 0; i < target.childNodes.length; i++) {
        child = target.childNodes[i];
        child.style.cssText = window.getComputedStyle(child).cssText;
      }
      // Construct an SVG image
      svg_data = '<svg xmlns="http://www.w3.org/2000/svg" width="' + target.offsetWidth +
                 '" height="' + target.offsetHeight + '">' + target.innerHTML + '</svg>';
      var img = new Image();
      img.src = "data:image/svg+xml," + encodeURIComponent(svg_data);

      // Draw the SVG image to a canvas
      var mycanvas = document.createElement('canvas');
      mycanvas.width = target.offsetWidth;
      mycanvas.height = target.offsetHeight;
      
      var ctx = mycanvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      // Return the canvas's data
      return mycanvas.toDataURL("image/png");
    }
    data = svg_to_png_data(target);
    $(this).attr({ href: data, download: "triangles.png" })
  }
  $(".js-dowload").on("click", prepareImage);
  window.onload = init
})()