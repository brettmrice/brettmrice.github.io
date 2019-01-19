value = 0;
mode_1 = 255;
mode_2 = 0;
count = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //noCursor();
}

function draw() {
  if(value == 255) {

    h = hour(); m = minute(); s = second();

    stroke(mode_2);
    if(s != s_old) {
      fill(mode_2);
      noStroke();
      ellipse(windowWidth/2, windowHeight/2,
        min(windowWidth, windowHeight)*(2/2.1),
        min(windowWidth, windowHeight)*(2/2.1));
      draw_second();
      draw_minute();
      draw_hour();
      fill(mode_1);
      ellipse(windowWidth/2, windowHeight/2, 20, 20);
    }

    s_old = s;

  } else {
    clear();
  }
  //fill()
  //quad()
}

function draw_second() {
  translate(windowWidth/2, windowHeight/2);
  rotate(((TWO_PI/60)*s)+PI);
  stroke(mode_1);
  strokeWeight(3);
  rect(0, 0, 0, min(windowWidth, windowHeight)/2.3);
  rotate((-(TWO_PI/60)*s)+PI);
  translate(-windowWidth/2, -windowHeight/2);
}

function draw_minute() {
  translate(windowWidth/2, windowHeight/2);
  rotate(((TWO_PI/60)*(m+(s/60)))+PI);
  strokeWeight(11);
  rect(0, 0, 0, min(windowWidth, windowHeight)/2.3);
  rotate(-(((TWO_PI/60)*(m+(s/60)))+PI));
  translate(-windowWidth/2, -windowHeight/2);
}

function draw_hour() {
  translate(windowWidth/2, windowHeight/2);
  rotate(((TWO_PI/12)*(h+((m+(s/60))/60)))+PI);
  strokeWeight(24);
  rect(0, 0, 0, min(windowWidth, windowHeight)/2.7);
  rotate(-(((TWO_PI/12)*(h+((m+(s/60))/60)))+PI));
  translate(-windowWidth/2, -windowHeight/2);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  translate(windowWidth/2, windowHeight/2);
  stroke(mode_1);
  fill(mode_1);
  background(mode_2);
  for(i = 0; i < 60; i++) {
    if(i != 0) {
      rotate((TWO_PI/60)+PI);
    }
    if(i%5 == 0) {
      strokeWeight(18);
      rect(0, 0, 0, max(windowWidth, windowHeight));
    } else {
      strokeWeight(2);
      rect(0, 0, 0, max(windowWidth, windowHeight));
    }
  }
  s_old = 61;
  translate(-windowWidth/2, -windowHeight/2);
  fill(mode_2);
  noStroke();
  ellipse(windowWidth/2, windowHeight/2,
    min(windowWidth, windowHeight)*(2/2.1),
    min(windowWidth, windowHeight)*(2/2.1));
}

function mouseClicked() {
  if(mouseButton == LEFT) {
    if(count == 0) {
      value = 255;
      count += 1;
    } else if(count == 1) {
      value = 255;
      count += 1;
      mode_1 = 0;
      mode_2 = 255;
    } else if(count == 2) {
      value = 0;
      count = 0;
      mode_1 = 255;
      mode_2 = 0;
    }
    translate(windowWidth/2, windowHeight/2);
    stroke(mode_1);
    fill(mode_1);
    background(mode_2);
    for(i = 0; i < 60; i++) {
      if(i != 0) {
        rotate((TWO_PI/60)+PI);
      }
      if(i%5 == 0) {
        strokeWeight(18);
        rect(0, 0, 0, max(windowWidth, windowHeight));
      } else {
        strokeWeight(2);
        rect(0, 0, 0, max(windowWidth, windowHeight));
      }
    }
    s_old = 61;
    translate(-windowWidth/2, -windowHeight/2);
    fill(mode_2);
    noStroke();
    ellipse(windowWidth/2, windowHeight/2,
      min(windowWidth, windowHeight)*(2/2.1),
      min(windowWidth, windowHeight)*(2/2.1));
  }
}
