//jshint esversion:6

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const shipSprite = new Image();
shipSprite.src = "images/ship64.png";

const alienImage = new Image();
alienImage.src = "images/alien.png";

const ship = {
  x: canvas.width / 2 - 32,
  y: canvas.height - 70
};

const lasers = [];

let counter = 0;
let frameRate = 60/4;
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

const brick = {
  colCount: 8,
  rowCount: 4,
  h: 12,
  w: 35,
  p: 12,
  offSetTop: 12,
  offSetLeft: 18,
  moveCount: 0,
  dir: "r",
  dropSpeed: 4
};

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

let bricks = [];
for (let c = 0; c < brick.colCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brick.rowCount; r++) {
    bricks[c][r] = {
      x: 0,
      y: 0,
      color: "white",
      status: 2
    };
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
//         alien.offSetTop += brick.dropSpeed;
//       }
//     }
//   }
// }

function moveBricks() {
  brick.moveCount += 1;
  if (brick.moveCount % 10 === 0) {
    if (brick.dir === 'r') {
      brick.offSetLeft += 4;
      if (brick.offSetLeft === 26) {
        brick.dir = 'l';
        brick.offSetTop += brick.dropSpeed;
      }
    } else if (brick.dir === 'l') {
      brick.offSetLeft -= 4;
      if (brick.offSetLeft === 6) {
        brick.dir = 'r';
        brick.offSetTop += brick.dropSpeed;
      }
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

function drawBricks() {
  for (let c = 0; c < brick.colCount; c++) {
    for (let r = 0; r < brick.rowCount; r++) {
      let brickX = (c * (brick.w + brick.p) + brick.offSetLeft);
      let brickY = (r * (brick.h + brick.p) + brick.offSetTop);
      if (bricks[c][r].status >= 1) {
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brick.w, brick.h);
        ctx.fillStyle = bricks[c][r].color;
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

// const lShield = makeNewShield(46, 490);
// const mShield = makeNewShield(164, 490);
// const rShield = makeNewShield(282, 490);
//
// function drawShield(shield) {
//   for (let c = 0; c < shield[0][0].colNumber; c++) {
//     for (let r = 0; r < shield[0][0].rowNumber; r++) {
//       let s = shield[c][r];
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



function drawFrame(frame, canvasX, canvasY) {
    ctx.drawImage(alienImage, frame*w, 0, w, h, canvasX, canvasY, scaledW, scaledH);
}

const alien = {
  colCount: 8,
  rowCount: 4,
  h: 12,
  w: 35,
  pTop: 18,
  pSides: 6,
  offSetTop: 12,
  offSetLeft: 18,
  moveCount: 0,
  dir: "r",
  dropSpeed: 4
};

let aliens = [];
for (let c = 0; c < alien.colCount; c++) {
  aliens[c] = [];
  for (let r = 0; r < alien.rowCount; r++) {
    aliens[c][r] = {
      x: 0,
      y: 0,
      status: 2
    };
  }
}

function drawAliens() {
  for (let c = 0; c < alien.colCount; c++) {
    for (let r = 0; r < alien.rowCount; r++) {
      let alienX = (c * (alien.w + alien.pSides) + alien.offSetLeft);
      let alienY = (r * (alien.h + alien.pTop) + alien.offSetTop);
      if (aliens[c][r].status >= 1) {
        aliens[c][r].x = alienX;
        aliens[c][r].y = alienY;
        drawFrame(frame, alienX, alienY);
      }
    }
  }
}

function collisionDetection() {
  //brick collisions
  for (let c = 0; c < brick.colCount; c++) {
    for (let r = 0; r < brick.rowCount; r++) {
      let b = bricks[c][r];
      for (let i = 0; i < lasers.length; i++) {
        if (b.status > 0 && lasers[i].y >= b.y && lasers[i].y <= b.y + brick.h && lasers[i].x+4 >= b.x && lasers[i].x <= b.x + brick.w) {
          if (b.status === 2) {
            lasers.splice(i, 1);
            b.status--;
            b.color = "red";
            // console.log(b);
          } else if (b.status === 1) {
            lasers.splice(i, 1);
            b.status--;
          }
        }
      }
    }
  }
  // console.log('running collision detection');
  // for (let c = 0; c < lShield.colCount; c++) {
  //   for (let r = 0; r < lShield.rowCount; r++) {
  //     let s = lShield[c][r];
  //     console.log('three'); //not showing up
  //     for (let j = 0; j < lasers.length; j++) {
  //       if (s.status > 0 && lasers[j].x + lasers[j].width >= s.x && lasers[j].x <= s.x + s.w && lasers[j].y >= s.y && lasers[j].y <= s.y + s.h) {
  //         console.log('got through');
  //         //remove laser and shield component
  //         lasers.splice(j, 1);
  //         s.status--;
  //       }
  //     }
  //   }
  // }
  //shield collisions --is the laser moving before it can complete the loop?
  // for (let j = 0; j < lasers.length; j++) {
  //
  //   if (lasers[j].x + lasers[j].w >= lShield[0][0].x && lasers[j].x <= lShield[0][0].x + lShield[0][0].totW) {
  //     for
  // console.log('In box');
  // for (let c = 0; c < lShield.length; c++) {
  //   for (let r = 0; r < lShield.length; r++) {
  //     let s = lShield[c][r];
  //     console.log('s.x: ' + s.x);
  //     console.log(lasers[j].y);
  //     console.log('s.y + s.h:' + (s.y+s.h));
  //     console.log(s.status > 0); //good
  //     console.log(lasers[j].x + lasers[j].width >= s.x); //check
  //     console.log(lasers[j].x <= s.x + s.w); //good --changed s.totW to s.w
  //     console.log(lasers[j].y >= s.y);
  //     console.log(lasers[j].y <= s.y + s.h); //check
  //     if (s.status > 0 && lasers[j].x + lasers[j].width >= s.x && lasers[j].x <= s.x + s.totW && lasers[j].y >= s.y && lasers[j].y <= s.y + s.h) {
  //       //remove laser and shield component
  //       lasers.splice(j, 1);
  //       s.status--;
  //     }
  //   }
  // }
  // }
  // }
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
  if (counter%frameRate === 0) {
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
  moveBricks();
  drawBricks();
  // drawAliens();
  requestAnimationFrame(draw);
}

draw();
