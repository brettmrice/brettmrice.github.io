value = 0;
mode_1 = 255;
mode_2 = 0;
count = 0;
s_old = 61;

//seed = 0;
x_pos = [];
y_pos = [];
gal_width = [];
num_gal_rings = [];
gal_num = 5;

function setup() {
  createCanvas(windowWidth, windowHeight);
  max_x_img = windowWidth;
  max_y_img = windowHeight;
  mil = millis();
  background(0);
}

function draw() {
  if(value == 1) {
    draw_clock();
  } else {
    //clear();
    draw_galaxy_ripples();
  }
}

function draw_galaxy_ripples() {
  if(mil/1000 > 1) {
    background(0, 1);
    for(i = 0; i < gal_num; i++) {
      gal_width[i] = random(windowWidth*.1, windowWidth*.3);
      x_pos[i] = round(random(gal_width[i]*1.1/2,
        max_x_img-(gal_width[i]*1.1/2)));
      y_pos[i] = round(random(gal_width[i]*1.1/2,
        max_y_img-(gal_width[i]*1.1/2)));
      num_gal_rings[i] = round(random(2, 4));
    }
    for(i = 0; i < gal_num; i++) {
      for(j = 0; j < gal_width[i]; j++) {
        ring_opac = sin(pow(PI, num_gal_rings[i])/(j));
        stroke(255, (randomGaussian()*100) * ring_opac);
        ellipse(x_pos[i], y_pos[i], j, j);
      }
    }
  }
}

function draw_clock() {
  stroke(mode_2);
  //if(s != s_old) {
  fill(mode_2);
  noStroke();
  ellipse(windowWidth/2, windowHeight/2,
    min(windowWidth, windowHeight)*(2/2.1),
    min(windowWidth, windowHeight)*(2/2.1));

  h = hour(); m = minute(); s = second();
  draw_second();
  draw_minute();
  draw_hour();

  fill(mode_1);
  ellipse(windowWidth/2, windowHeight/2, 20, 20);
  //}
  //s_old = s;
  //m_old = m;
}

function draw_second() {
  translate(windowWidth/2, windowHeight/2);
  if(s == s_old) {
    mil_int = (millis() - mil)/1000;
  } else {
    mil = millis();
    mil_int = 0;
    s_old = s;
  }
  rotate(((TWO_PI/60)*(s+mil_int))+PI);
  stroke(mode_1);
  strokeWeight(3);
  rect(0, 0, 0, min(windowWidth, windowHeight)/2.3);
  rotate(-(((TWO_PI/60)*(s+mil_int))+PI));
  translate(-windowWidth/2, -windowHeight/2);
}

function draw_minute() {
  translate(windowWidth/2, windowHeight/2);
  rotate(((TWO_PI/60)*(m+((s+mil_int)/60)))+PI);
  strokeWeight(11);
  rect(0, 0, 0, min(windowWidth, windowHeight)/2.3);
  rotate(-(((TWO_PI/60)*(m+((s+mil_int)/60)))+PI));
  translate(-windowWidth/2, -windowHeight/2);
}

function draw_hour() {
  translate(windowWidth/2, windowHeight/2);
  rotate(((TWO_PI/12)*(h+((m+((s+mil_int)/60))/60)))+PI);
  strokeWeight(24);
  rect(0, 0, 0, min(windowWidth, windowHeight)/2.7);
  rotate(-(((TWO_PI/12)*(h+((m+((s+mil_int)/60))/60)))+PI));
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
    if(count == 0) { // draw dark clock
      value = 1; // draw clock
      count += 1;
    } else if(count == 1) { // draw bright clock
      value = 1; // draw clock
      //count += 1;
      mode_1 = 0;
      mode_2 = 255;
    } else if(count == 2) { // clear all drawings
      value = 0;
      //count = 0;
      mode_1 = 255;
      mode_2 = 0;
      background(0);
    }
    if(count < 2) {
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
      count += 1;
      }
  }
}
