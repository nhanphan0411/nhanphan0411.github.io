let txt;
let allTxt;
let textPace = 3;
let spacing = 16;
let bgSpacingRow = 10;
let bgSpacingCol = 6;
let counter = 0;
let currentBlock;
let xPos = 600 / 2;
let yPos = 400 / 2;
let cnv;
let isMobileDevice = false;
let bgImg1, bgImg2, bgImg3;

function preload() {
  txt = loadStrings("assets/portrait/skinnydipping.txt");
  bg = loadStrings("assets/portrait/bg.txt");
  bg4 = loadStrings("assets/portrait/bg4.txt")
  bg5 = loadStrings("assets/portrait/bg5.txt");

  bgImg1 = loadImage("assets/portrait/bg1.png");
  bgImg2 = loadImage("assets/portrait/bg2.png");
  bgImg3 = loadImage("assets/portrait/bg3.png");
}

function setup() {
  /* Storing user's device details in a variable*/
  let details = navigator.userAgent;

  /* Creating a regular expression 
  containing some mobile devices keywords 
  to search it in details string*/
  let regexp = /android|iphone|kindle|ipad/i;

  /* Using test() method to search regexp in details
  it returns boolean value*/
  isMobileDevice = regexp.test(details);

  if (isMobileDevice) {
    cnv = createCanvas(455 * 0.75, 440 * 0.75);
    imageMode(CENTER);
  } else {
    cnv = createCanvas(455, 440);
  }

  cnv.parent("#portrait-display");
  currentBlock = txt.slice(0, 3);
  cursor(TEXT)
  pixelDensity(1);
}

function draw() {
  clear();
  // if (isMobileDevice) {
  //   background(255, 236, 236, 255);
  // }
  drawBg();

  // rectMode(CENTER);
  push();
  translate(xPos, yPos)
  let i = 0;
  while (i < textPace) {
    textFont("Times New Roman")
    textSize(14);
    fill(0);
    text(currentBlock[i], 0, 0 + i * spacing, 300, 50);
    i += 1;
  }
  pop();

  if (!isMobileDevice) {
    textFont("Times New Roman")
    textSize(14);
    fill(0);
    text("Skinny Dipping", mouseX, mouseY);
  }
}

function touchStarted() {
  if (isMobileDevice) {
    if (touches[0].x < width & touches[0].x > 0 & touches[0].y < height & touches[0].y > 0) {
      nextBlock()
    }
  }
}

function mousePressed() {
  if (!isMobileDevice) {
    if (mouseX < width & mouseX > 0 & mouseY < height & mouseY > 0) {
      nextBlock();
    }
  }
}

function nextBlock(count, poem) {
  // return next block of poems and increase counter
  counter += textPace;
  if (counter > txt.length) {
    counter = 0;
  }
  currentBlock = txt.slice(counter, counter + textPace)
  xPos = random(50, width - 150);
  yPos = random(50, height - 150);
}

function drawBg() {
  if (!isMobileDevice){
    if ((counter / 3) < 5) {
      image(bgImg1, 0, 0);
    } else if (((counter / 3) >= 10) & ((counter / 3) < 14)) {
      image(bgImg2, 0, 0);
    } else {
      image(bgImg3, 0, 0);
    }
  } else {
    if ((counter / 3) < 5) {
      image(bgImg1, width/2, height/2);
    } else if (((counter / 3) >= 10) & ((counter / 3) < 14)) {
      image(bgImg2, width/2, height/2);
    } else {
      image(bgImg3, width/2, height/2);
    }
  }
}
