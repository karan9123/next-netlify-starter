import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Home() {
  return (
    <div className="container">
      <head>
    <title>CSCI-610: Assn 5 - Tessellation</title>
    
    <!-- vertex Shader -->
    <script id="vertex-shader" type="x-shader/x-vertex">
        #version 300 es
        in vec4 aVertexPosition;
        in vec3 bary;
        uniform vec3 theta;
        
        out vec3 vbc;

        void main()
        {
            // Compute the sines and cosines of each rotation
            // about each axis
            vec3 angles = radians( theta );
            vec3 c = cos( angles );
            vec3 s = sin( angles );

            // rotation matrices
            mat4 rx = mat4 ( 1.0,  0.0,  0.0,  0.0,
                             0.0,  c.x,  s.x,  0.0,
                             0.0, -s.x,  c.x,  0.0,
                             0.0,  0.0,  0.0,  1.0 );

            mat4 ry = mat4 ( c.y,  0.0, -s.y,  0.0,
                             0.0,  1.0,  0.0,  0.0,
                             s.y,  0.0,  c.y,  0.0,
                             0.0,  0.0,  0.0,  1.0 );

            mat4 rz = mat4 ( c.z,  s.z,  0.0,  0.0,
                            -s.z,  c.z,  0.0,  0.0,
                             0.0,  0.0,  1.0,  0.0,
                             0.0,  0.0,  0.0,  1.0 );

            gl_Position = rz * ry * rx * aVertexPosition;
            vbc = bary;
        }
    </script>

     <!-- fragment Shader -->
     <script id="fragment-shader" type="x-shader/x-fragment">
         #version 300 es
         precision mediump float;
         
         in vec3 vbc;

         // Color that is the result of this shader
         out vec4 fragColor;

         void main(void) {
             
             fragColor = vec4 (0.5, 0.5, 0.5, 1.0 );
           // if on the edge, draw black, otherwsie, draw grey
           if (vbc.x < 0.01 || vbc.y < 0.01 || vbc.z < 0.01) {
             fragColor = vec4 (1.0, 1.0, 1.0, 1.0);
           }
         }

     </script>
     
     <!-- include the shape creation functions -->
    <script type="text/javascript" src="./cgIShape.js"></script>
    
    <!-- include the main tesselation functions -->
    <script type="text/javascript" src="./tessMain.js"></script>
    
    <!-- keyboard functions -->
    <script type="text/javascript">
    
    function gotKey (event) {
        
        var key = event.key;
        
        //  incremental rotation
        if (key == 'x')
            angles[0] -= angleInc;
        else if (key == 'y')
            angles[1] -= angleInc;
        else if (key == 'z')
            angles[2] -= angleInc;
        else if (key == 'X')
            angles[0] += angleInc;
        else if (key == 'Y')
            angles[1] += angleInc;
        else if (key == 'Z')
            angles[2] += angleInc;

        // shape selection
        else if (key == '1' || key == 'c') {
            curShape = CUBE;
        }
        else if (key == '2' || key == 'C') {
            curShape = CYLINDER;
        }
        else if (key == '3' || key == 'n') {
            curShape = CONE;
        }
        else if (key == '4' || key == 's') {
            curShape = SPHERE
        }

        // tessellation control
        else if (key == '+') {
            division1 = division1 + 1;
        }
        else if (key == '=') {
            division2 = division2 + 1;
        }
        else if (key == '-') {
            if (division1 > 1) {
                division1 = division1 - 1;
            }
        }
        else if (key == '_') {
            if (division2 > 1) {
                division2 = division2 - 1;
            }
        }

        // reset
        else if (key == 'r' || key=='R') {
            angles[0] = anglesReset[0];
            angles[1] = anglesReset[1];
            angles[2] = anglesReset[2];
        }
        
        // create a new shape and do a redo a draw
        createNewShape();
        draw();
    }
    
    </script>

  <script type="text/javascript">
    // Call init once the webpage has loaded
    window.onload = init;
  </script>
</head>

<body>
  <h1>CSCI-610: Assn 5 - Tessellation</h1>
  <table>
      <tr>
          <td><canvas id="webgl-canvas" width="500" height="500">
            Your browser does not support the HTML5 canvas element.
          </canvas></td>
          
          <td>
              <h3>Controls</h3>
              
              <table border="1">
              <tbody>
              <tr>
              <td>x, y, z</td>
              <td>Rotate the current shape forward about the x, y, or z axis</td>
              </tr>
              <tr>
              <td>X, Y, Z</td>
              <td>Rotate the current shape backward about the x, y, or z axis</td>
              </tr>
              <tr>
              <td>1, c</td>
              <td>Select the cube as the current shape (using current tessellation settings)</td>
              </tr>
              <tr>
              <td>2, C</td>
              <td>Select the cylinder as the current shape (using current tessellation settings)</td>
              </tr>
              <tr>
              <td>3, n</td>
              <td>Select the cone as the current shape (using current tessellation settings)</td>
              </tr>
              <tr>
              <td>4, s</td>
              <td>Select the sphere as the current shape (using current tessellation settings)</td>
              </tr>
              <tr>
              <td>+, -</td>
              <td>Increment/decrement the primary subdivision of the current shape by 1</td>
              </tr>
              <tr>
              <td>=, _</td>
              <td>Increment/decrement the secondary subdivision of the current shape by 1</td>
              </tr>
              <tr>
              <td>r, R</td>
              <td>Reset the figure to its original orientation</td>
              </tr>
              </tbody>
              </table>
              
          </td>
      </tr>
  </table>
  
  

</body>
    </div>
  )
}
