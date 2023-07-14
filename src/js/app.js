const imageSizes = {
  width: 800,
  height: 600,
};

function init() {
  /**
   * DOM
   */

  const images = document.querySelectorAll("img");
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = imageSizes.width;
  canvas.height = imageSizes.height;
  /**
   * VARS
   */

  const rows = 8;
  const cols = 8;
  const wx = canvas.width / cols;
  const wy = canvas.height / rows;
  let interval = 0;
  let coverImg,
    canvasImg,
    index = 0;

  /**
   * UTILs
   */

  function switchImages() {
    coverImg = images[index];
    canvasImg = images[index + 1];

    index === images.length - 2 ? (index = 0) : index++;
  }
  switchImages();

  function draw(t) {
    //     control the shrinking speed of each cell
    let bx = t * 0.3;
    let by = t * 0.2;
    // change image if required
    ctx.drawImage(canvasImg, 0, 0);
    if (wx - bx > 0) {
      // perform effect transition
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          // crop portion from cover and paste to the canvas
          //           source-img position-dimension        canvas position-dimension
          // drawImage(image, sx, sy, sWidth, sHeight,  dx, dy, dWidth, dHeight)
          ctx.drawImage(
            coverImg,
            i * wx,
            j * wy,
            wx - bx,
            wy - by,
            i * wx,
            j * wy,
            wx - bx,
            wy - by
          );
        }
      }
    } else {
      // change images and reset start pos
      interval = 0;
      switchImages();
    }
  }

  /**
   * Gameloop
   */

  function render() {
    interval += 1;
    draw(interval);
    requestAnimationFrame(render);
  }
  render();
}

document.addEventListener("DOMContentLoaded", init);
