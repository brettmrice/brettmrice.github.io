var value = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //frameRate(10);
}

function draw() {
  if(value == 255) {
    //background(value);
    fill(0);
    noStroke();
    ellipse(windowWidth/2, windowHeight/2, min(windowWidth, windowHeight)*(2/2.1), min(windowWidth, windowHeight)*(2/2.1));

    h = hour();
    m = minute();
    s = second();

    stroke(0);
    draw_second();
    draw_minute();
    draw_hour();

    stroke(255);
    ellipse(windowWidth/2, windowHeight/2, 20, 20);
  } else {
    clear();
  }
}

function draw_second() {
  translate(windowWidth/2, windowHeight/2);
  rotate(((TWO_PI/60)*s)+PI);
  stroke(255);
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
  for(i = 0; i < 60; i++) {
    if(i != 0) {
      rotate((TWO_PI/60)+PI);
    }
    if(i%5 == 0) {
      stroke(0);
      strokeWeight(18);
      rect(0, 0, 0, max(windowWidth, windowHeight));
    } else {
      strokeWeight(2);
      rect(0, 0, 0, max(windowWidth, windowHeight));
    }
  }
}

function mousePressed() {
  if (value == 0) {
    value = 255;

    translate(windowWidth/2, windowHeight/2);
    stroke(255);
    fill(255);
    background(0);
    for(i = 0; i < 60; i++) {
      if(i != 0) {
        rotate((TWO_PI/60)+PI);
      }
      if(i%5 == 0) {
        strokeWeight(18);
        //rect(0, 9+min(windowWidth, windowHeight)/2.1, 0, max(windowWidth, windowHeight));
        rect(0, 0, 0, max(windowWidth, windowHeight));
      } else {
        strokeWeight(2);
        //rect(0, min(windowWidth, windowHeight)/2.1, 0, max(windowWidth, windowHeight));
        rect(0, 0, 0, max(windowWidth, windowHeight));
      }
    }
  } else {
    value = 0;
  }
}
