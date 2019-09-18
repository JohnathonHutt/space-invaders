//jshint esversion:6

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const shipSprite = new Image();
shipSprite.src = "images/ship64.png";

const alienImage = new Image();
alienImage.src = "images/alien.png";

const alienRedImage = new Image();
alienRedImage.src = "images/alienRedWithExplosion.png";

const ship = {
  x: canvas.width / 2 - 32,
  y: canvas.height - 70
};

const lasers = [];
let aliens = [];

let counter = 0;
let frameRate = 60 / 4;
let frame = 1;

const scale = 1;
const w = 32;
const h = 32;
const scaledW = scale * w;
const scaledH = scale * h;

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

let rPressed = false;
let lPressed = false;

// function ShieldObjGenerator() {
//   this.h = 10;
//   this.w = 12;
//   this.x = 0;
//   this.y = 0;
//   this.colNumber = 3;
//   this.rowNumber = 6;
//   this.color = "white";
//   this.status = 1;
//   this.totW = this.w * this.rowNumber;
//   this.totH = this.h * this.colNumber;
//   //call on top
// }
//
// function makeNewShield(canvasX, canvasY) {
//   let shObj = new ShieldObjGenerator();
//   let shield = [];
//   for (let c = 0; c < shObj.colNumber; c++) {
//     shield[c] = [];
//     for (let r = 0; r < shObj.rowNumber; r++) {
//       shield[c][r] = new ShieldObjGenerator();
//       shield[c][r].x = r * shObj.w + canvasX;
//       shield[c][r].y = c * shObj.h + canvasY;
//     }
//   }
//   return shield;
// }
//
// function drawShield(shield) {
//   for (let c = 0; c < shield[0][0].colNumber; c++) {
//     for (let r = 0; r < shield[0][0].rowNumber; r++) {
//       let s = shield[c][r];
//       console.log(s);
//       if (s.status > 0) {
//         ctx.beginPath();
//         ctx.rect(s.x, s.y, s.w, s.h);
//         ctx.fillStyle = s.color;
//         ctx.fill();
//         ctx.closePath();
//       }
//     }
//   }
// }


function keyDownHandler(e) {
  switch (e.keyCode) {
    case 39:
      rPressed = true;
      break;
    case 37:
      lPressed = true;
      break;
    case 38:
      newLaser();
      break;
    case 32:
      newLaser();
      break;
    default:
      console.log(e.keyCode);
  }
}

function keyUpHandler(e) {
  switch (e.keyCode) {
    case 39:
      rPressed = false;
      break;
    case 37:
      lPressed = false;
      break;
    default:
      console.log(e.keyCode);
  }
}

function checkR() {
  if (rPressed) {
    if (ship.x + 64 >= canvas.width) {
      ship.x = canvas.width - 64;
    } else {
      ship.x += 4;
    }
  }
}

function checkL() {
  if (lPressed) {
    if (ship.x <= 0) {
      ship.x = 0;
    } else {
      ship.x -= 4;
    }
  }
}

function drawShip() {
  ctx.drawImage(shipSprite, ship.x, ship.y);
}

function newLaser() {
  lasers.unshift({
    x: ship.x + 30,
    y: ship.y,
    w: 4,
    h: 8
  });
}

function moveLasers() {
  for (let i = 0; i < lasers.length; i++) {
    if (lasers[i].y < 0) {
      lasers.splice(i, 1);
    } else {
      lasers[i].y -= 4;
    }
  }
}

// function moveBricks() {
//   alien.moveCount += 1;
//   if (alien.moveCount % 10 === 0) {
//     if (alien.dir === 'r') {
//       alien.offSetLeft += 4;
//       if (alien.offSetLeft === 26) {
//         alien.dir = 'l';
//         alien.offSetTop += alien.dropSpeed;
//       }
//     } else if (alien.dir === 'l') {
//       alien.offSetLeft -= 4;
//       if (alien.offSetLeft === 6) {
//         alien.dir = 'r';
//         alien.offSetTop += alien.dropSpeed;
//       }
//     }
//   }
// }

//figure out how to make them look for each other
//or just get them to not bunch up
// function moveAliens() {
//   //for 2D artray - has issues
//   alien.moveCount += 1;
//   if (alien.moveCount % 10 === 0) {
//     //move every 10 frames
//     for (let i = 0; i < aliens.length; i++) {
//       //check if last alien in row is near the edge - switch directions
//       if (aliens[i][aliens[i].length - 1].x + 36 >= canvas.width || aliens[i][0].x - 4 <= 0) {
//         for (let j = 0; j < aliens[i].length; j++) {
//           (aliens[i][j].dir === 'r') ? aliens[i][j].dir = 'l': aliens[i][j].dir = 'r';
//           //add appropriate x +/- and add dropspeed to y
//           (aliens[i][j].dir === 'r') ? aliens[i][j].x += aliens[i][j].speedX: aliens[i][j].x -= aliens[i][j].speedX;
//         }
//       } else {
//         for (let k = 0; k < aliens[i].length; k++) {
//           (aliens[i][k].dir === 'r') ? aliens[i][k].x += aliens[i][k].speedX: aliens[i][k].x -= aliens[i][k].speedX;
//         }
//       }
//     }
//   }
// }

// function moveAliens() {
//   alien.moveCount += 1;
//   if (alien.moveCount % 10 === 0) {
//     //move every 10 frames
//     for (let i = 0; i < aliens.length; i++) {
//       //check if last alien in row is near the edge - switch directions
//       if (aliens[i].x + 36 >= canvas.width || aliens[i].x - 4 <= 0) {
//         for (let j = 0; j < aliens.length; j++) {
//           (aliens[j].dir === 'r') ? aliens[j].dir = 'l': aliens[j].dir = 'r';
//           //add appropriate x +/- and add dropspeed to y
//           (aliens[j].dir === 'r') ? aliens[j].x += aliens[j].speedX: aliens[j].x -= aliens[j].speedX;
//         }
//         break;
//       } else {
//         for (let k = 0; k < aliens[i].length; k++) {
//           (aliens[k].dir === 'r') ? aliens[k].x += aliens[i][k].speedX: aliens[i][k].x -= aliens[i][k].speedX;
//         }
//       }
//     }
//   }
// }

function moveAliens() {
  let nearAnEdge = false;
  for (let i = 0; i < aliens.length; i++) {
    //iterate through aliens array check if any are near edge
    if (aliens[i].x + 36 >= canvas.width || aliens[i].x - 4 <= 0) {
      nearAnEdge = true;
      break;
    }
  }
  //if near edge switch dir + move, else just move
  if (nearAnEdge) {
    for (let j = 0; j < aliens.length; j++) {
      (aliens[j].dir === 'r') ? aliens[j].dir = 'l': aliens[j].dir = 'r';
      //add appropriate x +/- and add dropspeed to y
      (aliens[j].dir === 'r') ? aliens[j].x += aliens[j].speedX: aliens[j].x -= aliens[j].speedX;
      aliens[j].y += aliens[j].speedY;
    }
  } else {
    for (let k = 0; k < aliens.length; k++) {
      (aliens[k].dir === 'r') ? aliens[k].x += aliens[k].speedX: aliens[k].x -= aliens[k].speedX;
    }
  }
}



function drawLasers() {
  moveLasers();
  for (let i = 0; i < lasers.length; i++) {
    ctx.beginPath();
    ctx.rect(lasers[i].x, lasers[i].y, lasers[i].w, lasers[i].h);
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.closePath();
  }
}


function drawAlien(frame, canvasX, canvasY) {
  ctx.drawImage(alienImage, frame * w, 0, w, h, canvasX, canvasY, scaledW, scaledH);
}

function drawRedAlien(frame, canvasX, canvasY) {
  ctx.drawImage(alienRedImage, frame * w, 0, w, h, canvasX, canvasY, scaledW, scaledH);
}

function drawExplosion(frame, canvasX, canvasY) {
  //need to work in timing
  ctx.drawImage(alienRedImage, frame * w, 32, w, h, canvasX, canvasY, scaledW, scaledH);
}

const alien = {
  colCount: 8,
  rowCount: 4,
  totAliens: 8 * 4,
  h: 12,
  w: 32,
  pTop: 18,
  pSides: 6,
  offSetTop: 12,
  offSetLeft: 18,
  // moveCount: 0,
};


// for (let c = 0; c < alien.colCount; c++) {
//   aliens[c] = [];
//   for (let r = 0; r < alien.rowCount; r++) {
//     aliens[c][r] = {
//       x: 0,
//       y: 0,
//       status: 2
//     };
//   }
// }

// function populateAlienArr() {
//   for (let c = 0; c < alien.colCount; c++) {
//     aliens[c] = [];
//     for (let r = 0; r < alien.rowCount; r++) {
//       let alienX = (c * (alien.w + alien.pSides) + alien.offSetLeft);
//       let alienY = (r * (alien.h + alien.pTop) + alien.offSetTop);
//       aliens[c].push({
//         x: alienX,
//         y: alienY,
//         dir: 'r',
//         speedY: 4,
//         speedX: 4,
//         status: 2
//       });
//     }
//   }
// }

function populateAlienArr() {
  //1D array version
  //accesses global aliens array
  let alienX = alien.offSetLeft;
  let alienY = alien.offSetTop;
  for (let i = 0; i < alien.totAliens; i++) {
    aliens.push({
      x: alienX,
      y: alienY,
      status: 2,
      speedX: 1,
      speedY: 4,
      dir: 'r',
    });
    if ((i + 1) % alien.colCount === 0) {
      alienX = alien.offSetLeft;
      alienY += (alien.h + alien.pTop);
    } else {
      alienX += (alien.w + alien.pSides);
    }
  }
}

populateAlienArr();

function drawAliens() {
  //for 1D array version
  for (let i = 0; i < aliens.length; i++) {
    if (aliens[i].status === 2) {
      drawAlien(frame, aliens[i].x, aliens[i].y);
    } else if (aliens[i].status === 1) {
      drawRedAlien(frame, aliens[i].x, aliens[i].y);
    }
  }
}

// function drawAliens() {
//   for (let i = 0; i < aliens.length; i++) {
//     for (let j = 0; j < aliens[0].length; j++) {
//       drawFrame(frame, aliens[i][j].x, aliens[i][j].y);
//     }
//   }
// }

// function drawAliens() {
//   for (let c = 0; c < alien.colCount; c++) {
//     for (let r = 0; r < alien.rowCount; r++) {
//       let alienX = (c * (alien.w + alien.pSides) + alien.offSetLeft);
//       let alienY = (r * (alien.h + alien.pTop) + alien.offSetTop);
//       if (aliens[c][r].status >= 1) {
//         aliens[c][r].x = alienX;
//         aliens[c][r].y = alienY;
//         drawFrame(frame, alienX, alienY);
//       }
//     }
//   }
// }

// function collisionDetection() {
//   //brick collisions
//   for (let c = 0; c < brick.colCount; c++) {
//     for (let r = 0; r < brick.rowCount; r++) {
//       let b = bricks[c][r];
//       for (let i = 0; i < lasers.length; i++) {
//         if (b.status > 0 && lasers[i].y >= b.y && lasers[i].y <= b.y + brick.h && lasers[i].x+4 >= b.x && lasers[i].x <= b.x + brick.w) {
//           if (b.status === 2) {
//             lasers.splice(i, 1);
//             b.status--;
//             b.color = "red";
//             // console.log(b);
//           } else if (b.status === 1) {
//             lasers.splice(i, 1);
//             b.status--;
//           }
//         }
//       }
//     }
//   }
// }

function collisionDetection() {
  for (let i = 0; i < lasers.length; i++) {
    let l = lasers[i];
    //only check if lasers are >= height of lowest enemy
    if (l.y <= aliens[aliens.length-1].y) {
      console.log('At height');
      for (let j = 0; j < aliens.length; j++) {
        if (aliens[j].status > 0 && lasers[i].y >= aliens[j].y && lasers[i].y <= aliens[j].y + alien.h && lasers[i].x+4 >= aliens[j].x && lasers[i].x <= aliens[j].x + alien.w) {
          console.log('It collided');
          if (aliens[j].status === 2) {
            lasers.splice(i, 1);
            aliens[j].status--;
            //change animation/color
            break;
          } else if (aliens[j].status === 1) {
            lasers.splice(i, 1);
            aliens[j].status--;
            break;
          }
        }
      }
    }
  }
}

// function checkShieldCollision(shield, laser) {
//   //used in check collision detection
//   for (let c = 0; c < shield.length; c++) {
//     for (let r = 0; r < shield.length; r++) {
//       let s = shield[c][r];
//       console.log(s);
//       if (s.status > 0 && laser.x + laser.width >= s.x && laser.x <= s.x + s.totW && laser.y >= s.y && laser.y <= s.y + s.h) {
//         //remove laser and shield component
//         lasers.splice(i, 1);
//         s.status--;
//       }
//     }
//   }
// }

function draw() {
  counter += 1;
  if (counter % frameRate === 0) {
    if (frame === 9) {
      frame = 0;
    } else {
      frame += 1;
    }
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawShip();
  // drawShield(lShield);
  // drawShield(mShield);
  // drawShield(rShield);
  checkL();
  checkR();
  drawLasers();
  collisionDetection();
  // moveBricks();
  moveAliens();
  drawAliens();
  requestAnimationFrame(draw);
}

draw();
