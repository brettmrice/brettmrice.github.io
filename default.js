value = 0;
mode_1 = 255;
mode_2 = 0;
count = 0;
s_old = 61;
sec_hand_count = 0;
correct_s = 0;

x_pos = [];
y_pos = [];
gal_width = [];
num_gal_rings = [];
gal_count = 0;


function setup() {
  createCanvas(windowWidth, windowHeight);
  max_x_img = windowWidth;
  max_y_img = windowHeight;
  mil = millis(); // for draw_galaxy_ripples
  noStroke();
  noFill();
  background(0);
  gal_num = round(max(windowWidth, windowHeight)*.23);
}

function draw() {
  if(value == 1) {
    draw_clock();
  } else {
    if (gal_count == gal_num) {
      noLoop();
    }
    draw_galaxy_ripples();
  }
}

function draw_galaxy_ripples() {
  gal_width = random(4, 60);
  x_pos = round(random(-gal_width*.9,
    max_x_img+(gal_width*.9)));
  y_pos = round(random(-gal_width*.9,
    max_y_img+(gal_width*.9)));
  num_gal_rings = round(random(2, 4));
  for(j = 0; j < gal_width; j++) {
    ring_opac = sin(pow(PI, num_gal_rings)/(j));
    stroke(255, (randomGaussian()*100) * ring_opac);
    ellipse(x_pos, y_pos, j, j);
  }
  fill(0, 200, 0);
  ellipse(x_pos, y_pos, gal_width*.05, gal_width*.05);
  noFill();
  gal_count++;
}

function draw_clock() {
  stroke(mode_2);
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
}

function draw_clock_background() {
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
  frm_cnt = 0;
  sec_hand_count = 0;
}

function draw_second() {
  translate(windowWidth/2, windowHeight/2);
  rotate(PI);
  if(s == s_old) {
    mil_int = (millis() - mil)/1000;
  } else {
    mil = millis();
    mil_int = 0;
    s_old = s;
  }
  if (sec_hand_count == 0) {
    sec_org = s;
    sec_hand_count = 1;
  }
  rot_amt_s = ((TWO_PI/60)*(s+mil_int));
  if (frm_cnt <= 240) {
    if (s < sec_org) {
      rot_amt_s = ((TWO_PI/60)*((s+60)+mil_int));
    }
    rot_amt_st_s = map(frm_cnt, 0, 240, 0, rot_amt_s);
    rotate(rot_amt_st_s);
    stroke(mode_1);
    strokeWeight(3);
    rect(0, 0, 0, min(windowWidth, windowHeight)/2.3);
    //rotate(-rot_amt_st_s);
    rotate(-rot_amt_st_s);
  } else {
    rotate(rot_amt_s);
    stroke(mode_1);
    strokeWeight(3);
    rect(0, 0, 0, min(windowWidth, windowHeight)/2.3);
    rotate(-rot_amt_s);
  }
/*
  // draw second hand to fade in
  if (sec_hand_count < 300) {
    stroke_alpha = map(sec_hand_count, 0, 300, 0, 255);
    stroke(mode_1, stroke_alpha);
    sec_hand_count++;
  } else {
    stroke(mode_1);
  }*/
  //strokeWeight(3);
  //rect(0, 0, 0, min(windowWidth, windowHeight)/2.3);
/*
  // draw second hand to grow
  if (sec_hand_count < 300) {
    stroke(mode_1);
    strokeWeight(3);
    rect(0, 0, 0, map(sec_hand_count, 0, 300, 0, min(windowWidth, windowHeight)/2.3));
    sec_hand_count++;
  } else {
    stroke(mode_1);
    strokeWeight(3);
    rect(0, 0, 0, min(windowWidth, windowHeight)/2.3);
  }
*/
  //stroke(mode_1);
  //strokeWeight(3);
  //rect(0, 0, 0, min(windowWidth, windowHeight)/2.3);
  //rotate(-(((TWO_PI/60)*(s+mil_int))));
  rotate(-PI);
  translate(-windowWidth/2, -windowHeight/2);
  //stroke(mode_1);
}

function draw_minute() {
  translate(windowWidth/2, windowHeight/2);
  rotate(PI);
  rot_amt_m = (TWO_PI/60)*(m+((s+mil_int)/60));
  if (frm_cnt < 240) {
    rot_amt_st_m = map(frm_cnt, 0, 240, 0, rot_amt_m);
    rotate(rot_amt_st_m);
    strokeWeight(11);
    rect(0, 0, 0, min(windowWidth, windowHeight)/2.3);
    rotate(-rot_amt_st_m);
  } else {
    rotate(rot_amt_m);
    strokeWeight(11);
    rect(0, 0, 0, min(windowWidth, windowHeight)/2.3);
    rotate(-rot_amt_m);
  }
  rotate(-PI);
  translate(-windowWidth/2, -windowHeight/2);
}

function draw_hour() {
  translate(windowWidth/2, windowHeight/2);
  rotate(PI);
  if (h > 12) {
    h = h - 12;
  }
  rot_amt_h = ((TWO_PI/12)*(h+((m+((s+mil_int)/60))/60)));
  if (frm_cnt <= 240) {
    rot_amt_st_h = map(frm_cnt, 0, 240, 0, rot_amt_h);
    rotate(rot_amt_st_h);
    strokeWeight(24);
    rect(0, 0, 0, min(windowWidth, windowHeight)/2.7);
    rotate(-rot_amt_st_h);
    frm_cnt++;
  } else {
    rotate(rot_amt_h);
    strokeWeight(24);
    rect(0, 0, 0, min(windowWidth, windowHeight)/2.7);
    rotate(-rot_amt_h);
  }
  rotate(-PI);
  translate(-windowWidth/2, -windowHeight/2);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (value == 1) {
    draw_clock_background();
  } else {
    max_x_img = windowWidth;
    max_y_img = windowHeight;
    background(0);
    gal_count = 0;
    loop();
    draw_galaxy_ripples();
  }
}
/*
function mouseClicked() {
  if(mouseButton == LEFT) {
    if(count == 0) { // draw dark clock
      value = 1; // draw clock
      count += 1;
      mode_1 = 255;
      mode_2 = 0;
      draw_clock_background()
      loop();
      sec_hand_count = 0;
    } else if(count == 1) { // draw bright clock
      value = 1; // draw clock
      count += 1;
      mode_1 = 0;
      mode_2 = 255;
      draw_clock_background()
      loop();
      sec_hand_count = 0;
    } else if(count == 2) { // clear all drawings
      value = 0;
      count = 0;
      mode_1 = 255;
      mode_2 = 0;
      strokeWeight(1);
      noStroke();
      noFill();
      clear();
      background(0);
      gal_count = 0;
      loop();
    }
  }
}
*/
function touchStarted() {
  //if(mouseButton == LEFT) {
    if(count == 0) { // draw dark clock
      value = 1; // draw clock
      count += 1;
      mode_1 = 255;
      mode_2 = 0;
      draw_clock_background()
      loop();
      sec_hand_count = 0;
    } else if(count == 1) { // draw bright clock
      value = 1; // draw clock
      count += 1;
      mode_1 = 0;
      mode_2 = 255;
      draw_clock_background()
      loop();
      sec_hand_count = 0;
    } else if(count == 2) { // clear all drawings
      value = 0;
      count = 0;
      mode_1 = 255;
      mode_2 = 0;
      strokeWeight(1);
      noStroke();
      noFill();
      clear();
      background(0);
      gal_count = 0;
      loop();
    }
  //}
  return false;
}
